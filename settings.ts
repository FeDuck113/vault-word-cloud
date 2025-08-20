import { App, PluginSettingTab, Setting } from "obsidian";
import WordCloudPlugin from "./main";


export interface WordCloudSettings {
    minWordLength: number;
    maxWordsCloud: number;
    maxWordsList: number;
    directories: string[];
    ignore_directories: string[];
    stopwords: string[];
    usePrepositions: boolean;
    langs: string[];
}

export const DEFAULT_SETTINGS: WordCloudSettings = {
    minWordLength: 2,
    maxWordsCloud: 100,
    maxWordsList: 10,
    directories: [],
    ignore_directories: [],
    stopwords: [],
    usePrepositions: false,
    langs: ["ru", "en", "fr", "de", "es", "it", "cz"]
};


export class WordCloudSettingTab extends PluginSettingTab {
    plugin: WordCloudPlugin;

    constructor(app: App, plugin: WordCloudPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();
        containerEl.createEl("h2", { text: "Настройки Word Cloud" });

        

        new Setting(containerEl)
            .setName("Minimum word length")
            .setDesc("Words shorter than this value will be ignored (recommended - 2)")
            .addText((text) =>
                text
                    .setPlaceholder("2")
                    .setValue(this.plugin.settings.minWordLength.toString())
                    .onChange(async (value) => {
                        const num = parseInt(value);
                        if (!isNaN(num)) {
                            this.plugin.settings.minWordLength = num;
                            await this.plugin.saveSettings();
                        }
                    })
            );
        

        new Setting(containerEl)
            .setName("Max words in cloud")
            .setDesc("Specify the maximum number of words displayed in the cloud")
            .addText((text) =>
                text
                    .setPlaceholder("100")
                    .setValue(this.plugin.settings.maxWordsCloud.toString())
                    .onChange(async (value) => {
                        const num = parseInt(value);
                        if (!isNaN(num)) {
                            this.plugin.settings.maxWordsCloud = num;
                            await this.plugin.saveSettings();
                        }
                    })
            );

        new Setting(containerEl)
            .setName("Max words in list")
            .setDesc("Specify the maximum number of words displayed in the list")
            .addText((text) =>
                text
                    .setPlaceholder("10")
                    .setValue(this.plugin.settings.maxWordsList.toString())
                    .onChange(async (value) => {
                        const num = parseInt(value);
                        if (!isNaN(num)) {
                            this.plugin.settings.maxWordsList = num;
                            await this.plugin.saveSettings();
                        }
                    })
            );


        containerEl.createEl("hr");
        new Setting(containerEl)
            .setName("Notes source folders")
            .setDesc("Only notes from these folders will be processed (one per line)")
            .addTextArea(text => {
                text
                    .setPlaceholder("One path per line")
                    .setValue(this.plugin.settings.directories.join("\n"))
                    .onChange(async (value) => {
                        this.plugin.settings.directories = value
                            .split("\n")
                            .map(s => s.trim())
                            .filter(s => s.length > 0);
                        await this.plugin.saveSettings();
                    }).inputEl.style.height = "70px";
            });
        new Setting(containerEl)
            .setName("Ignored note folders")
            .setDesc("Notes in these folders will not be analyzed (one per line)")
            .addTextArea(text => {
                text
                    .setPlaceholder("One path per line")
                    .setValue(this.plugin.settings.ignore_directories.join("\n"))
                    .onChange(async (value) => {
                        this.plugin.settings.ignore_directories = value
                            .split("\n")
                            .map(s => s.trim())
                            .filter(s => s.length > 0);
                        await this.plugin.saveSettings();
                    }).inputEl.style.height = "70px";
            });

        
        new Setting(containerEl)
            .setName("Stopwords")
            .setDesc("Add words to always ignore during text analysis (one per line)")
            .addTextArea(text => {
                text
                    .setPlaceholder("One word per line")
                    .setValue(this.plugin.settings.stopwords.join("\n"))
                    .onChange(async (value) => {
                        this.plugin.settings.stopwords = value
                            .split("\n")
                            .map(s => s.trim())
                            .filter(s => s.length > 0);
                        await this.plugin.saveSettings();
                    }).inputEl.style.height = "100px";
            });

        containerEl.createEl("hr");
        new Setting(containerEl)
            .setName("Include prepositions")
            .setDesc("Include or not prepositions into text analysis")
            .addToggle((toggle) =>
                toggle
                    .setValue(this.plugin.settings.usePrepositions)
                    .onChange(async (value) => {
                        this.plugin.settings.usePrepositions = value;
                        await this.plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName("Preposition languages")
            .setDesc("Select which languages' prepositions should be ignored during analysis (one code line). Supported languages: ru, en, fr, de, es, it, cz")
            .addTextArea(text => {
                text
                    .setPlaceholder("One code per line")
                    .setValue(this.plugin.settings.langs.join("\n"))
                    .onChange(async (value) => {
                        this.plugin.settings.langs = value
                            .split("\n")
                            .map(s => s.trim())
                            .filter(s => s.length > 0);
                        await this.plugin.saveSettings();
                    }).inputEl.style.height = "130px";
            });
    }
}