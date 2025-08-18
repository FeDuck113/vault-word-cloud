import { App, TFolder, AbstractInputSuggest } from "obsidian";

export class FolderSuggest extends AbstractInputSuggest<TFolder> {
  private inputEl: HTMLInputElement;

  constructor(app: App, inputEl: HTMLInputElement) {
    super(app, inputEl);
    this.inputEl = inputEl;

    this.inputEl.addEventListener("focus", () => {
      this.inputEl.dispatchEvent(new Event("input"));
    });
  }

  getSuggestions(query: string): TFolder[] {
    const lower = (query ?? "").toLowerCase();
    const folders = this.app.vault
      .getAllLoadedFiles()
      .filter((f): f is TFolder => f instanceof TFolder);

    return folders
      .filter((f) => f.path.toLowerCase().includes(lower))
      .sort((a, b) => a.path.localeCompare(b.path));
  }

  renderSuggestion(folder: TFolder, el: HTMLElement) {
    el.setText(folder.path);
  }

  selectSuggestion(folder: TFolder) {
    this.inputEl.value = folder.path;
    this.inputEl.dispatchEvent(new Event("input"));
    this.close();
  }
}