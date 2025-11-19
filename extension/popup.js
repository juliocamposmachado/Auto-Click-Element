document.addEventListener('DOMContentLoaded', function() {
    const startIntelligentClickerButton = document.getElementById('startIntelligentClicker');
    const statusDiv = document.getElementById('status');

    function setStatus(message, type = 'success') {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = 'status';
        }, 3000);
    }

    startIntelligentClickerButton.addEventListener('click', async () => {
        setStatus('Ativando cliques inteligentes...', 'success');
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: startIntelligentClicking // Chamando a nova função no content script
            });

            // O feedback final virá do content script, mas podemos dar um inicial aqui
            setStatus('Cliques inteligentes iniciados (verifique o console). Por favor, marque manualmente uma caixa de seleção para iniciar o padrão.', 'success');

        } catch (error) {
            setStatus(`❌ Erro ao iniciar cliques inteligentes: ${error.message}`, 'error');
        }
    });
});