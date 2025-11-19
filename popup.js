document.addEventListener('DOMContentLoaded', function() {
    const clickBtn = document.getElementById('clickElement');
    const findBtn = document.getElementById('findElement');
    const autoBtn = document.getElementById('autoMode');
    const statusDiv = document.getElementById('status');

    function setStatus(message, type = 'success') {
        statusDiv.textContent = message;
        statusDiv.className = `status ${type}`;
        setTimeout(() => {
            statusDiv.textContent = '';
            statusDiv.className = 'status';
        }, 3000);
    }

    clickBtn.addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: clickElement
            });

            if (results[0].result) {
                setStatus('✅ Elemento clicado com sucesso!');
            } else {
                setStatus('❌ Elemento não encontrado', 'error');
            }
        } catch (error) {
            setStatus('❌ Erro: ' + error.message, 'error');
        }
    });

    findBtn.addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: findElement
            });

            setStatus(results[0].result);
        } catch (error) {
            setStatus('❌ Erro: ' + error.message, 'error');
        }
    });

    autoBtn.addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            const results = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: enableAutoMode
            });

            setStatus(results[0].result);
        } catch (error) {
            setStatus('❌ Erro: ' + error.message, 'error');
        }
    });
});

// Funções que serão executadas na página
function clickElement() {
    // CORREÇÃO: Usando o seletor de classe correto: i.x1b0d499.x1d69dk1
    const CHECKBOX_SELECTOR = 'i.x1b0d499.x1d69dk1';
    const UNCHECKED_POSITION = '0px -1025px'; // Posição de background para caixa desmarcada

    let targetElement = document.querySelector(CHECKBOX_SELECTOR);

    if (targetElement && targetElement.style.backgroundPosition === UNCHECKED_POSITION) {
        targetElement.click();
        return true;
    }
    return false;
}

function findElement() {
    // CORREÇÃO: Usando o seletor de classe correto: i.x1b0d499.x1d69dk1
    const CHECKBOX_SELECTOR = 'i.x1b0d499.x1d69dk1';
    const UNCHECKED_POSITION = '0px -1025px';
    const CHECKED_POSITION = '0px -330px'; // Posição de background para caixa marcada (observado no HTML do usuário)

    const element = document.querySelector(CHECKBOX_SELECTOR);
    if (element) {
        let status = 'desconhecido';
        if (element.style.backgroundPosition === UNCHECKED_POSITION) {
            status = 'desmarcado';
        } else if (element.style.backgroundPosition === CHECKED_POSITION) {
            status = 'marcado';
        }
        return `✅ Elemento encontrado: ${element.tagName} com classes "${element.className}" (Estado: ${status})`;
    } else {
        // Procura por elementos que contenham parte da classe principal
        const allElements = Array.from(document.querySelectorAll('i.x1b0d499')); 
        if (allElements.length > 0) {
            return `🔍 Elemento não encontrado com o seletor exato, mas há ${allElements.length} elementos com a classe 'x1b0d499'. Tente ajustar o seletor.`;
        }
        return '❌ Elemento não encontrado na página';
    }
}

function enableAutoMode() {
    let attempts = 0;
    const maxAttempts = 60; // Aumentado para 60 segundos para dar mais tempo para carregar
    const CHECKBOX_SELECTOR = 'i.x1b0d499.x1d69dk1';
    const UNCHECKED_POSITION = '0px -1025px';
    const INVITE_BUTTON_TEXT = 'Enviar convites';

    const interval = setInterval(() => {
        attempts++;
        let clickedCount = 0;
        let foundUnchecked = false;

        let potentialCheckboxes = document.querySelectorAll(CHECKBOX_SELECTOR);

        potentialCheckboxes.forEach(iElement => {
            let isCloseButton = iElement.closest('[aria-label="Fechar"]');
            if (isCloseButton) {
                return; // Este 'return' sai apenas do callback do forEach
            }

            if (iElement.style.backgroundPosition === UNCHECKED_POSITION) {
                foundUnchecked = true;
                iElement.click();
                clickedCount++;
                console.log('✅ Elemento clicado automaticamente!');
            }
        });

        if (clickedCount === 0 && !foundUnchecked) { // Se nenhum clique e nenhuma desmarcada encontrada, tudo clicado ou nada a clicar
            console.log(`Nenhuma caixa de seleção desmarcada encontrada. Tentando clicar no botão '${INVITE_BUTTON_TEXT}'.`);
            clearInterval(interval); // Parar o intervalo
            // Agora tentar clicar no botão 'Enviar convites'
            let inviteButton = document.evaluate(
                `//span[text()='${INVITE_BUTTON_TEXT}']/ancestor::div[@role='button']`,
                document,
                null,
                XPathResult.FIRST_ORDERED_NODE_TYPE,
                null
            ).singleNodeValue;
            if (inviteButton) {
                inviteButton.click();
                console.log('✅ Modo automático: Botão \'Enviar convites\' clicado!');
            } else {
                console.log(`❌ Modo automático: Botão '${INVITE_BUTTON_TEXT}' não encontrado.`);
            }
        } else if (attempts >= maxAttempts) {
            clearInterval(interval); // Parar o intervalo
            console.log(`❌ Modo automático: Elemento não encontrado após ${maxAttempts} segundos ou nenhum clicável.`);
        }
        // Apenas registrar o status se o intervalo ainda estiver em execução
        if (attempts < maxAttempts && (clickedCount > 0 || foundUnchecked)) {
             console.log(`⏳ Modo automático: Tentativa ${attempts}/${maxAttempts}. Clicados: ${clickedCount}.`);
        }
    }, 1000); // Tentar a cada 1 segundo

    // Este é o retorno síncrono para quem chamou executeScript em popup.js
    return '🔍 Modo automático ativado - procurando elemento...';
}