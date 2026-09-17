# Universal Visited Link Sync & History Importer

![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Supported-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

A lightweight, high-performance Userscript suite that persistently highlights visited links in custom red (`#F44336`) across **all websites** and provides a safe batch-importer for legacy browsing history.

It bypasses Chrome's native 90-day history limit and domain-isolation restrictions (Same-Origin Policy) by leveraging Tampermonkey's local Key-Value storage.

---

## 📁 Repository Structure

| File | Description |
| :--- | :--- |
| `userscript_visited_links.js` | The primary script running on all sites to track visited links and highlight them in `#F44336`. |
| `userscript_import_history.js` | A dedicated companion script to import large JSON history files in non-blocking batches. |

---

## ✨ Features

* **🌐 Universal Cross-Domain Sync:** Links visited anywhere on the web (e.g., news portals, search engines) are instantly highlighted when encountered on aggregated platforms like Feedly, Reddit, or forums.
* **⚡ High-Capacity $O(1)$ Storage Engine:** Stores each URL as an individual key (`v_URL`). Capable of handling **200,000+ entries** with instant lookups and zero browser lag.
* **🛡️ Freeze-Proof Batch Importer:** Imports thousands of historical URLs in small chunks (500 entries per batch with 40ms delays) to prevent Tampermonkey memory/IPC overhead freezes.
* **🎨 Distinct Styling:** Visually transforms visited links and parent containers into `#F44336` for maximum scannability.
* **🔄 Live DOM Updates:** Uses a `MutationObserver` to automatically highlight dynamic links on Single-Page Applications (SPAs) and infinite-scroll feeds without page reloads.
* **♾️ Permanent History:** Visited states never expire or get auto-deleted after 90 days.
* **🔒 100% Private & Local:** All data stays strictly inside your local browser extension storage (`GM_setValue`). No analytics, no tracking, and no external requests.

---

## 🚀 Installation & Setup

### 1. Install Main Highlighter (`userscript_visited_links.js`)
1. Install the **[Tampermonkey](https://www.tampermonkey.net/)** extension for your browser.
2. Open Tampermonkey Dashboard $\rightarrow$ **Create a new script**.
3. Copy the contents of `userscript_visited_links.js` and save (`Ctrl + S`).

### 2. (Optional) Import Legacy History (`userscript_import_history.js`)
If you have a JSON export of your existing browsing history:
1. Create another new script in Tampermonkey and paste the code from `userscript_import_history.js`.
2. Open any website (e.g., Feedly or Google).
3. Click the red **📥 Chrome History Importieren** button in the bottom right corner.
4. Select your history `.json` file.
5. Wait for the import progress to reach 100%.
6. Once complete, you can disable or delete `userscript_import_history.js`.

---

## 🛠️ Technical Details

* **URL Normalization:** Standardizes protocols, strips trailing slashes, and removes redundant parameters to guarantee consistent key lookups.
* **Storage Namespace:** Both scripts share the `@namespace GlobalHistory` tag to write to and read from the exact same storage keys (`v_https://example.com`).
* **Non-Blocking Execution:** The importer yields control back to the browser event loop between batches, preventing Chrome from throwing "Page Unresponsive" warnings.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.

With this script the Links in Google Chrome gets marked on every site for every site, across domains.
Since this Chrome-Flags didn't work anymore: PartitionVisitedLinkDatabase & PartitionVisitedLinkDatabaseWithSelfLinks
