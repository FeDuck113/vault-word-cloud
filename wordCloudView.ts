import { ItemView, WorkspaceLeaf, TextComponent, setIcon } from "obsidian";
import { getWordFrequencies } from "./utils";
import * as d3 from "d3";
import { schemeCategory10 } from "d3-scale-chromatic";
import cloud from "d3-cloud";
import { FolderSuggest } from "./FolderSuggest";
import { WordCloudSettings } from "./settings";

export const VIEW_TYPE_WORDCLOUD = "wordcloud-view";

interface Word {
  text: string;
  size: number;
  count: number;
  x?: number;
  y?: number;
  rotate?: number;
}

const dir_head = "Select directions"
const ignor_dir_head = "Ignor directions";

export class WordCloudView extends ItemView {
    private settings: WordCloudSettings;
    private saveSettings: () => Promise<void>;

    constructor(leaf: WorkspaceLeaf, settings: WordCloudSettings, saveSettings: () => Promise<void>) {
        super(leaf);
        this.settings = settings;
        this.saveSettings = saveSettings;
    }

    getViewType() {
        return VIEW_TYPE_WORDCLOUD;
    }

    getDisplayText() {
        return "Word Cloud";
    }

    async onOpen() {
        const container = this.containerEl.children[1] as HTMLElement;
        container.empty();

        container.createEl("h2", { text: "Анализ заметок..." });


        const settingsPanel = container.createDiv();
        settingsPanel.addClass("wordcloud-settings");
        settingsPanel.style.display = "none";

        const sideButtonsBlock = container.createDiv();
        sideButtonsBlock.addClass("side-buttons-block");

        const openSettingsButton = sideButtonsBlock.createEl("button");
        openSettingsButton.addClass("side-buttons");
        openSettingsButton.addClass("icon-button");
        setIcon(openSettingsButton, "gear");
        openSettingsButton.onclick = () => {
            settingsPanel.style.display = "block";
        }

        const refreshButton = sideButtonsBlock.createEl("button");
        refreshButton.addClass("side-buttons");
        refreshButton.addClass("icon-button");
        setIcon(refreshButton, "refresh-cw");
        refreshButton.onclick = () => {
            this.renderWordCloud(container);
            this.renderWordList(container);
        };


        const titleRow = settingsPanel.createDiv();
        titleRow.style.display = "flex";
        titleRow.style.justifyContent = "space-between";
        titleRow.style.alignItems = "center";

        const title = titleRow.createEl("h2", { text: "Settings" });
        title.style.display = "inline-block";
        const closeButton = titleRow.createEl("button");
        closeButton.addClass("icon-button");
        setIcon(closeButton, "cross");
        closeButton.onclick = () => {
            settingsPanel.style.display = "none";
        }

        const checkboxBlock = settingsPanel.createDiv();
        checkboxBlock.addClass("dirs-block");
        const checkboxLabel = checkboxBlock.createEl("label");
        const checkbox = checkboxLabel.createEl("input", { type: "checkbox" }) as HTMLInputElement;
        checkbox.checked = this.settings.usePrepositions;
        checkboxLabel.appendText(" Учитывать предлоги");
        checkbox.addEventListener("change", async () => {
            this.settings.usePrepositions = checkbox.checked;
            await this.saveSettings();
            await this.renderWordCloud(container);
            await this.renderWordList(container);
        });

        const dirsBlock = settingsPanel.createDiv();
        dirsBlock.addClass("dirs-block");
        this.renderDirectoryControls(dirsBlock, dir_head);

        const ignor_dirsBlock = settingsPanel.createDiv();
        ignor_dirsBlock.addClass("dirs-block");
        this.renderDirectoryControls(ignor_dirsBlock, ignor_dir_head, true);

        const svgContainer = container.createDiv();
        svgContainer.id = "wordcloud-svg-container";
        svgContainer.setCssStyles({
            width: "100%",
            height: "600px",
            border: "1px solid var(--background-modifier-border)",
            marginTop: "10px",
            position: "relative"
        });

        await this.renderWordCloud(container);
        await this.renderWordList(container);
    }

    private renderDirectoryControls(container: HTMLElement, headText: string, isIgnore: boolean = false) {
        container.empty();
        const main_container = this.containerEl.children[1] as HTMLElement;

        container.createEl("h3", { text: headText });

        const inputWrapper = container.createDiv();
        inputWrapper.style.display = "flex";
        inputWrapper.style.alignItems = "center";
        inputWrapper.style.marginBottom = "5px";

        const input = new TextComponent(inputWrapper);
        input.setPlaceholder("Введите путь к папке…");
        input.inputEl.style.flex = "1";
        input.inputEl.style.marginRight = "5px";

        new FolderSuggest(this.app, input.inputEl);


        const addButton = container.createEl("button", { text: "Add" });

        addButton.onclick = () => {
            const path = input.getValue().trim();
            if (path) {
                if (isIgnore) {
                    console.log(this.settings.directories, this.settings.ignore_directories);
                    this.settings.ignore_directories.push(path);
                }
                else {
                    console.log(this.settings.directories, this.settings.ignore_directories);
                    this.settings.directories.push(path);
                }
                this.renderWordCloud(main_container);
                this.renderWordList(main_container);
                this.saveSettings();
                input.setValue("");
                this.renderDirectoryControls(container, headText, isIgnore);
            }
        };

        input.inputEl.addEventListener("keydown", (evt: KeyboardEvent) => {
        if (evt.key === "Enter") {
            const path = input.getValue().trim();
            if (path) {
                if (isIgnore) {
                    this.settings.ignore_directories.push(path);
                }
                else {
                    this.settings.directories.push(path);
                }
                this.renderWordCloud(main_container);
                this.renderWordList(main_container);
                this.saveSettings();
                input.setValue("");
                this.renderDirectoryControls(container, headText, isIgnore);
            }
        }
        });


        const list = container.createDiv();
        list.addClass("dirs-list");
        if (isIgnore) {
            this.settings.ignore_directories.forEach((dir, idx) => {
                const row = list.createDiv();
                row.addClass("dirs-item");
                row.setText(dir);

                const removeBtn = row.createEl("span", { text: "✕" });
                removeBtn.style.marginLeft = "8px";
                removeBtn.style.cursor = "pointer";
                removeBtn.onclick = () => {
                    this.settings.ignore_directories.splice(idx, 1);
                    this.renderWordCloud(main_container);
                    this.renderWordList(main_container);
                    this.saveSettings();
                    this.renderDirectoryControls(container, ignor_dir_head, true);
                };
            });
        }
        else {
            this.settings.directories.forEach((dir, idx) => {
                const row = list.createDiv();
                row.addClass("dirs-item");
                row.setText(dir);

                const removeBtn = row.createEl("span", { text: "✕" });
                removeBtn.style.marginLeft = "8px";
                removeBtn.style.cursor = "pointer";
                removeBtn.onclick = () => {
                    this.settings.directories.splice(idx, 1);
                    this.renderWordCloud(main_container);
                    this.renderWordList(main_container);
                    this.saveSettings();
                    this.renderDirectoryControls(container, dir_head);
                };
            });
        }
    }


    async renderWordCloud(container: HTMLElement) {
        const svgContainer = container.querySelector("#wordcloud-svg-container") as HTMLElement;
        svgContainer.empty();

        const freq = await getWordFrequencies(this.app, this.settings.usePrepositions, this.settings.directories, this.settings.ignore_directories, this.settings.minWordLength);

        const sorted = Array.from(freq.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, this.settings.maxWordsCloud || 100);

        const words = sorted.map(([word, count]) => ({
            text: word,
            size: 10 + count * 2,
            count: count
        }));

        const width = svgContainer.clientWidth || 800;
        const height = svgContainer.clientHeight || 600;

        const tooltip = d3.select(svgContainer)
                .append("div")
                .attr("class", "tooltipturip")
                .style("position", "absolute")
                .style("background", "rgba(150, 150, 150, 0.8)")
                .style("color", "white")
                .style("padding", "5px 10px")
                .style("border-radius", "4px")
                .style("pointer-events", "none")
                .style("opacity", 0)
                .style("right", "auto");

        const layout = cloud()
            .size([width, height])
            .words(words)
            .padding(5)
            .rotate(() => 0)
            .font("sans-serif")
            .fontSize(d => d.size || 10)
            .on("end", draw);

        layout.start();

        function draw(words: Word[]) {
            const svg = d3.select(svgContainer)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

            svg.selectAll("text")
                .data(words)
                .enter().append("text")
                .style("font-size", (d: Word) => d.size + "px")
                .style("font-family", "sans-serif")
                .style("fill", () => schemeCategory10[Math.floor(Math.random() * 10)])
                .attr("text-anchor", "middle")
                .attr("transform", (d: Word) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
                .text((d: Word) => d.text)
                .on("mouseover", async function(this: SVGTextElement, d: Word, i: number) {
                    //@ts-ignore
                    tooltip.style("opacity", 1).html(`${i.text}: ${i.count}`).style("left", `${d.offsetX + (i.width - i.width % 2) / 2}px`).style("top", `${d.offsetY + (i.height - i.height % 2) / 2}px`);
                })
                .on("mouseout", function () {
                    tooltip.style("opacity", "0");
                })
                .on("click", async function(this: SVGTextElement, d: Word, i: number) {
                    //@ts-ignore
                    const searchPlugin = app.internalPlugins.getPluginById("global-search");
                    const search = searchPlugin && searchPlugin.instance;

                    search.openGlobalSearch(this.textContent);
                });
        }
    }



    async renderWordList(container: HTMLElement) {
        const oldList = container.querySelector("ul");
        if (oldList) oldList.remove();

        const freq = await getWordFrequencies(this.app, this.settings.usePrepositions, this.settings.directories, this.settings.ignore_directories, this.settings.minWordLength);

        const sorted = Array.from(freq.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, this.settings.maxWordsList || 10);

        const list = container.createEl("ul");
        for (let [word, count] of sorted) {
            const li = list.createEl("li", { text: `${word}: ${count}` });

            li.style.cursor = "pointer";
            li.addEventListener("click", () => {
                //@ts-ignore
                const searchPlugin = app.internalPlugins.getPluginById("global-search");
                const search = searchPlugin && searchPlugin.instance;

                search.openGlobalSearch(word);
            });
        }
    }

    async onClose() {
        //
    }
}
