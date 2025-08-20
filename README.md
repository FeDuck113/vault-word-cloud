# Vault Word Cloud

**Vault Word Cloud** is an Obsidian plugin that generates an interactive **word cloud** and **frequency list** from your notes.  
Quickly explore your vault’s vocabulary, see which words appear most often, and filter results by folders or custom stopwords.

---

## Features

- **Clickable word cloud** — click on any word to search it in your vault  
- **Frequency list view** — see exact word counts  
- **Folder filters** — analyze specific folders or the entire vault  
- **Stopword control** — include or exclude prepositions/conjunctions, add your own stopwords  
- **Instant updates** — changes are saved automatically to plugin settings  

---

## Installation

### From Obsidian Community Plugins
1. Open **Settings → Community plugins → Browse**  
2. Search for **Vault Word Cloud**  
3. Click **Install → Enable**

### Manual installation
1. Download the latest release from [Releases](https://github.com/USERNAME/REPO/releases)  
2. Extract into your `.obsidian/plugins/` folder
3. Reload Obsidian and enable **Vault Word Cloud** in **Settings → Community plugins**

---

## Usage

- Click the **Word Cloud icon** in the ribbon to open the analysis tab  
- The **right-top settings panel** lets you:  
    - Toggle *Include prepositions*  
    - Add/remove *Notes source folders*  
    - Add/remove *Ignored note folders*    

*Click any word in the cloud/list to instantly search it in Obsidian!*

Limit *max words in cloud/list* and add your own *custom stopwords* you can in plugin settings 

---

# Settings

- **Include prepositions** – Enable or disable counting prepositions during text analysis  
- **Minimum word length** – Words shorter than this value will be ignored 
- **Max words in cloud** – Maximum words displayed in the cloud  
- **Max words in list** – Maximum words displayed in the list  
- **Notes source folders** – Specify which folders to analyze (one per line)  
- **Ignored note folders** – Specify which folders to exclude (one per line)  
- **Custom stopwords** – Add words to ignore (one per line)  

---


## License

This plugin is licensed under the [GPL 3.0](LICENSE)

---

## Acknowledgments

- Built with [D3.js](https://d3js.org/) for visualization and [d3-cloud](https://github.com/jasondavies/d3-cloud) for word cloud layout.