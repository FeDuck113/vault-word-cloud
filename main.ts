import { App, Plugin, PluginManifest, WorkspaceLeaf } from "obsidian";
import { WordCloudView, VIEW_TYPE_WORDCLOUD } from "./wordCloudView";
import { WordCloudSettings, WordCloudSettingTab, DEFAULT_SETTINGS } from "./settings";

export default class WordCloudPlugin extends Plugin {
    settings: WordCloudSettings = DEFAULT_SETTINGS;

    async onload() {
        console.log("WordCloud Plugin loaded!");

        await this.loadSettings();

        this.registerView(
            VIEW_TYPE_WORDCLOUD,
            (leaf) => new WordCloudView(leaf)
        );

        this.addRibbonIcon("cloud", "Сделать Word Cloud", async () => {
            this.activateView();
        });

        this.addSettingTab(new WordCloudSettingTab(this.app, this));
    }

    async activateView() {
        const leaf = this.app.workspace.getLeaf(true);
        await leaf.setViewState({
            type: VIEW_TYPE_WORDCLOUD,
            active: true,
        });
        this.app.workspace.revealLeaf(leaf);
    }

    onunload() {
        this.app.workspace.getLeavesOfType(VIEW_TYPE_WORDCLOUD).forEach((leaf) => leaf.detach());
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}