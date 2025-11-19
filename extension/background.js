// background.js

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // Certifica-se de que a página carregou completamente e que é uma URL do grupo do Facebook
    if (changeInfo.status === 'complete' && tab.url && tab.url.includes("https://www.facebook.com/groups/")) {
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ['content.js']
        }).then(() => console.log("content.js injetado.")).catch(err => console.error("Erro ao injetar content.js: ", err));
    }
});