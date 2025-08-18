import { App, PluginSettingTab, Setting } from "obsidian";
import WordCloudPlugin from "./main";


export interface WordCloudSettings {
    usePrepositions: boolean;
    maxWords: number;
    directories: string[];
    ignore_directories: string[];
}

export const DEFAULT_SETTINGS: WordCloudSettings = {
    usePrepositions: false,
    maxWords: 100,
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
            .setName("Maximum word count in the cloud")
            .setDesc("Specify the maximum number of words to display in the cloud")
            .addText((text) =>
                text
                    .setPlaceholder("For example, 100")
                    .setValue(this.plugin.settings.maxWords.toString())
                    .onChange(async (value) => {
                        const num = parseInt(value);
                        if (!isNaN(num)) {
                            this.plugin.settings.maxWords = num;
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