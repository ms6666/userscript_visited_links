# Universal Visited Link Sync & Highlighter

![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Supported-green.svg)
![License](https://img.shields.io/badge/License-MIT-blue.svg)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg)

A lightweight, high-performance Userscript that persistently highlights visited links in custom red (`#F44336`) across **all websites**. It bypasses Chrome's native 90-day history limit and domain-isolation restrictions (Same-Origin Policy) by leveraging Tampermonkey's local Key-Value storage.

---

## ✨ Features

* **🌐 Universal Cross-Domain Sync:** Links visited anywhere on the web (e.g., news portals, search engines) are instantly highlighted when encountered on aggregated platforms like Feedly, Reddit, or forums.
* **⚡ High-Capacity $O(1)$ Storage Engine:** Stores each URL as an individual key (`v_URL`). Capable of handling **200,000+ entries** with instant lookups and zero browser lag.
* **🎨 Distinct Styling:** Visually transforms visited links and parent containers into `#F44336` for maximum scannability.
* **🔄 Live Update Without Page Refresh:** Automatically updates link colors as you scroll, open links in background tabs, or switch tab focus.
* **♾️ Permanent History:** Your visited status never expires or gets auto-deleted after 90 days.
* **🔒 100% Private & Local:** All data stays strictly inside your local browser extension storage (`GM_setValue`). No analytics, no tracking, and no external requests.

---

## 🚀 Installation

1. Install the **[Tampermonkey](https://www.tampermonkey.net/)** extension for your browser.
2. Open the Tampermonkey Dashboard and click **Create a new script**.
3. Replace the template code with the contents of [`script.js`](./script.js).
4. Save the script (`Ctrl + S` / `Cmd + S`).

---

## 🛠️ How It Works

1. **URL Normalization:** Cleans incoming URLs by standardizing parameters and stripping trailing slashes to ensure accurate matching.
2. **Key-Value Engine:** Utilizes Tampermonkey's extension-level storage (`GM_setValue`/`GM_getValue`) to allow fast $O(1)$ key lookups across all domains.
3. **DOM Mutation Observer:** Continuously monitors dynamically loaded elements (AJAX/Single-Page Applications) and applies `.custom-visited` CSS classes in real time.

---

## 📥 Legacy History Import

You can pre-load your existing Chrome browsing history into the script:

1. Export your Chrome history as a `.json` file using any history export extension.
2. Run the companion **History Importer Userscript** to write your history into Tampermonkey in batched chunks.
3. Once complete, disable the importer. All historical links will immediately render in `#F44336`.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for details.


Userscript for Tampermonkey
With this script the Links in Google Chrome gets marked on every site for every site, across domains.

Since the Chrome-Flags didn't work anymore
PartitionVisitedLinkDatabase
PartitionVisitedLinkDatabaseWithSelfLinks
