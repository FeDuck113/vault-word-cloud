import { App, Plugin, PluginManifest, WorkspaceLeaf } from "obsidian";
import { WordCloudView, VIEW_TYPE_WORDCLOUD } from "./wordCloudView";

export default class WordCloudPlugin extends Plugin {
    async onload() {
        console.log("WordCloud Plugin loaded!");

        this.registerView(
            VIEW_TYPE_WORDCLOUD,
            (leaf) => new WordCloudView(leaf)
        );

        this.addRibbonIcon("cloud", "Сделать Word Cloud", async () => {
            this.activateView();
        });
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
}