import { ItemView, WorkspaceLeaf } from "obsidian";
import { getWordFrequencies } from "./utils";

export const VIEW_TYPE_WORDCLOUD = "wordcloud-view";

export class WordCloudView extends ItemView {
    private usePrepositions: boolean = true;

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
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

        const checkboxLabel = container.createEl("label");
        const checkbox = checkboxLabel.createEl("input", { type: "checkbox" });
        checkbox.checked = this.usePrepositions;
        checkboxLabel.appendText(" Учитывать предлоги");

        checkbox.addEventListener("change", async () => {
            this.usePrepositions = checkbox.checked;
            await this.renderWordList(container); // перерисовываем список
        });

        // Рисуем первый раз
        await this.renderWordList(container);
    }

    async renderWordList(container: HTMLElement) {
        const oldList = container.querySelector("ul");
        if (oldList) oldList.remove();

        const freq = await getWordFrequencies(this.app, this.usePrepositions);

        const sorted = Array.from(freq.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 50);

        const list = container.createEl("ul");
        for (let [word, count] of sorted) {
            const li = list.createEl("li", { text: `${word}: ${count}` });
            // По клику можно будет добавить поиск — сделаем позже
        }
    }

    async onClose() {
        // cleanup if needed
    }
}
