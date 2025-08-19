import { App, PluginSettingTab, Setting } from "obsidian";
import WordCloudPlugin from "./main";


export interface WordCloudSettings {
    usePrepositions: boolean;
    minWordLength: number;
    maxWordsCloud: number;
    maxWordsList: number;
    directories: string[];
    ignore_directories: string[];
}

export const DEFAULT_SETTINGS: WordCloudSettings = {
    usePrepositions: false,
    minWordLength: 2,
    maxWordsCloud: 100,
    maxWordsList: 10,
    directories: [],
    ignore_directories: [],
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
            .setName("Учитывать предлоги")
            .setDesc("Включить или отключить учет предлогов при анализе текста.")
            .addToggle((toggle) =>
                toggle
                    .setValue(this.plugin.settings.usePrepositions)
                    .onChange(async (value) => {
                        this.plugin.settings.usePrepositions = value;
                        await this.plugin.saveSettings();
                    })
            );

        new Setting(containerEl)
            .setName("Минимальная длина слова")
            .setDesc("Меньше это значения слова не будут учитываться. Оптимальное значение - 2")
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
            .setName("Maximum word in the cloud")
            .setDesc("Specify the maximum number of words to display in the cloud")
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
            .setName("Maximum word in the list")
            .setDesc("Specify the maximum number of words to display in the list")
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


        new Setting(containerEl)
            .setName("Источники заметок")
            .setDesc("Директории из которых берутся заметки (Каждая директория на новой строке)")
            .addTextArea(text => {
                text
                    .setPlaceholder("Каждая директория на новой строке")
                    .setValue(this.plugin.settings.directories.join("\n"))
                    .onChange(async (value) => {
                        this.plugin.settings.directories = value
                            .split("\n")
                            .map(s => s.trim())
                            .filter(s => s.length > 0);
                        await this.plugin.saveSettings();
                    });
            });
        new Setting(containerEl)
            .setName("Игнорировать директории")
            .setDesc("Директории из которых не будут браться заметки (Каждая директория на новой строке)")
            .addTextArea(text => {
                text
                    .setPlaceholder("Каждая директория на новой строке")
                    .setValue(this.plugin.settings.ignore_directories.join("\n"))
                    .onChange(async (value) => {
                        this.plugin.settings.ignore_directories = value
                            .split("\n")
                            .map(s => s.trim())
                            .filter(s => s.length > 0);
                        await this.plugin.saveSettings();
                    });
            });
    }
}