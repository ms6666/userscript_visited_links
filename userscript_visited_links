// ==UserScript==
// @name         Universal Visited Link Sync & Highlighter
// @namespace    GlobalHistory
// @version      8.1
// @description  Locally marks external and internal links visited on ANY website.
// @author       ms6666
// @license      MIT
// @match        *://*/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
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

    function saveUrl(url) {
        if (!url || url.startsWith('javascript:') || url.startsWith('chrome:') || url.startsWith('about:')) return;
        const cleaned = cleanUrl(url);
        GM_setValue('v_' + cleaned, 1);
    }

    function isVisited(url) {
        const cleaned = cleanUrl(url);
        return GM_getValue('v_' + cleaned, 0) === 1 || GM_getValue('v_' + url, 0) === 1;
    }

    // 1. Immediately save every page currently being viewed
    saveUrl(window.location.href);

    // 2. Inject CSS styling for all websites
    function injectCSS() {
        if (document.getElementById('universal-visited-style')) return;
        const style = document.createElement('style');
        style.id = 'universal-visited-style';
        style.textContent = `
            a.custom-visited,
            a.custom-visited *,
            .entry.custom-visited,
            .entry.custom-visited * {
                color: #F44336 !important;
                opacity: 1 !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    }

    // 3. Compare links on the current page
    function markVisitedLinks() {
        const unvisitedLinks = document.querySelectorAll('a[href]:not(.custom-visited)');
        if (unvisitedLinks.length === 0) return;

        unvisitedLinks.forEach(a => {
            if (isVisited(a.href)) {
                a.classList.add('custom-visited');
                const entry = a.closest('.entry, article, [data-entryid]');
                if (entry) entry.classList.add('custom-visited');
            }
        });
    }

    function handleLinkInteraction(e) {
        const link = e.target.closest('a[href]');
        if (link) {
            saveUrl(link.href);
            markVisitedLinks();
        }
    }

    // Capture interactions directly
    window.addEventListener('click', handleLinkInteraction, true);
    window.addEventListener('auxclick', handleLinkInteraction, true);
    window.addEventListener('contextmenu', handleLinkInteraction, true);

    // Synchronization on tab switch & focus
    window.addEventListener('focus', markVisitedLinks);
    window.addEventListener('visibilitychange', () => {
        if (!document.hidden) markVisitedLinks();
    });

    document.addEventListener('DOMContentLoaded', () => {
        injectCSS();
        markVisitedLinks();
        const observer = new MutationObserver(markVisitedLinks);
        observer.observe(document.body, { childList: true, subtree: true });
    });

    setInterval(() => {
        injectCSS();
        markVisitedLinks();
    }, 1000);
})();
