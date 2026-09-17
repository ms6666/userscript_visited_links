// ==UserScript==
// @name         Universal History Importer for Visited Link Sync
// @namespace    GlobalHistory
// @version      1.1
// @description  Batch imports legacy Chrome history JSON into Tampermonkey's storage without browser freezing.
// @author       ms6666
// @license      MIT
// @match        *://*/*
// @grant        GM_setValue
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    function cleanUrl(url) {
        if (!url) return '';
        try {
            const u = new URL(url);
            return (u.origin + u.pathname).replace(/\/$/, '') + u.search;
        } catch (e) {
            return url.replace(/\/$/, '');
        }
    }

    // UI-Button unten rechts erstellen
    const btn = document.createElement('button');
    btn.textContent = '📥 Chrome History Importieren';
    btn.style.cssText = 'position:fixed; bottom:20px; right:20px; z-index:999999; padding:10px 15px; background:#F44336; color:#fff; border:none; border-radius:5px; cursor:pointer; font-weight:bold; box-shadow: 0 2px 10px rgba(0,0,0,0.3); font-family: sans-serif;';
    document.body.appendChild(btn);

    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    btn.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        btn.textContent = 'Verarbeite Datei...';
        btn.disabled = true;

        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                // Kompatibel mit verschiedenen JSON-Exportformaten (String-Array oder Objekt-Array)
                const urlList = data.map(item => typeof item === 'string' ? item : (item.url || item.urlAddress)).filter(Boolean);
                
                let index = 0;
                const total = urlList.length;

                function processBatch() {
                    // Blockgröße von 500 Verarbeitungen pro Durchgang entlastet Chrome & Tampermonkey
                    const batchSize = 500;
                    const end = Math.min(index + batchSize, total);

                    for (; index < end; index++) {
                        const cleaned = cleanUrl(urlList[index]);
                        if (cleaned && !cleaned.startsWith('javascript:') && !cleaned.startsWith('chrome:') && !cleaned.startsWith('about:')) {
                            GM_setValue('v_' + cleaned, 1);
                        }
                    }

                    const percent = Math.round((index / total) * 100);
                    btn.textContent = `Import: ${percent}% (${index} / ${total})`;

                    if (index < total) {
                        // Short delay gives Tampermonkey time to flush data to disk
                        setTimeout(processBatch, 40);
                    } else {
                        btn.textContent = '✅ Import vollständig!';
                        alert(`Erfolg: ${total} URLs wurden verarbeitet! Du kannst dieses Skript jetzt deaktivieren.`);
                    }
                }

                processBatch();
            } catch (err) {
                alert('Fehler beim Lesen der JSON-Datei! Bitte überprüfe das Dateiformat.');
                btn.disabled = false;
                btn.textContent = '📥 Chrome History Importieren';
            }
        };

        reader.readAsText(file);
    });
})();
