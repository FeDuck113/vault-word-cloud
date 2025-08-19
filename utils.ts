import { App, TFile } from "obsidian";
import { PREPOSITIONS } from "./prepositions";

export async function getWordFrequencies(app: App, usePrepositions: boolean, directories: string[], ignore_directories: string[], minWordLength: number): Promise<Map<string, number>> {
    let files = app.vault.getMarkdownFiles();
    if (directories.length > 0) {
        files = files.filter((file) =>
            directories.some((dir) => file.path.startsWith(dir + "/") || file.path === dir)
        );
    }
    if (ignore_directories.length > 0) {
        files = files.filter((file) =>
            !ignore_directories.some((ignoreDir) => file.path.startsWith(ignoreDir + "/") || file.path === ignoreDir)
        );
    }

    const freq = new Map<string, number>();

    for (let file of files) {
        const raw = await app.vault.read(file);

        const clean = raw
            .replace(/^---[\s\S]*?---\s*/m, "")   // YAML frontmatter
            .replace(/```[\s\S]*?```/g, "")       // code blocks
            .replace(/`[^`]*`/g, "")              // inline code
            .replace(/\[\[.*?]]/g, "")            // wikilinks
            .replace(/!\[.*?]\(.*?\)/g, "")       // images
            .replace(/\[.*?]\(.*?\)/g, "")        // links
            .replace(/<[^>]+>/g, " ")             // html
            .toLowerCase()
            .normalize("NFKC");

        const words = clean.match(/\p{L}+(?:-\p{L}+)?/gu) || [];
        
        for (let w of words) {
            if (w.length < minWordLength) continue;
            if (!usePrepositions && PREPOSITIONS.has(w)) continue;
            freq.set(w, (freq.get(w) || 0) + 1);
        }
    }

    return freq;
}
