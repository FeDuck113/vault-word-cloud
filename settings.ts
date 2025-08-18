import { App, PluginSettingTab, Setting } from "obsidian";
import WordCloudPlugin from "./main";


export interface WordCloudSettings {
    usePrepositions: boolean;
    maxWords: number;
}

export const DEFAULT_SETTINGS: WordCloudSettings = {
    usePrepositions: true,
    maxWords: 100,
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
    }
}