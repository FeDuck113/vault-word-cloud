import { App, TFile } from "obsidian";
import { PREPOSITIONS } from "./prepositions";

export async function getWordFrequencies(app: App, usePrepositions: boolean): Promise<Map<string, number>> {
    const files = app.vault.getMarkdownFiles();
    const freq = new Map<string, number>();

    for (let file of files) {
        const raw = await app.vault.read(file);

        // Убираем markdown-разметку и ссылки
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

        // Разделяем на слова (только a-z, а-я)
        const words = clean.match(/\p{L}+(?:-\p{L}+)?/gu) || [];
        
        for (let w of words) {
            if (w.length < 2) continue; // пропускаем короткие
            if (!usePrepositions && PREPOSITIONS.has(w)) continue;
            freq.set(w, (freq.get(w) || 0) + 1);
        }
    }

    return freq;
}
