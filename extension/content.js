// content.js

console.log("Content script carregado para Facebook Groups.");

// Esta função será injetada e executada diretamente na página
function injectButtonsAndLogic() {
    const INVITE_DIALOG_SELECTOR = 'div[aria-label="Convide seguidores para esse grupo"][role="dialog"]';
    const INVITE_BUTTON_TEXT = 'Enviar convites';
    const CHECKBOX_SELECTOR = 'i.x1b0d499.x1d69dk1'; // Seletor do elemento visual da checkbox
    const UNCHECKED_POSITION = '0px -750px'; // Posição de background para caixa desmarcada
    const CHECKED_POSITION = '0px -330px'; // Posição de background para caixa marcada

    let intervalCheckDialog = null;
    let intervalClicking = null;

    function clickInviteButton() {
        let inviteButton = document.evaluate(
            `//span[text()='${INVITE_BUTTON_TEXT}']/ancestor::div[@role='button']`,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;

        if (inviteButton) {
            inviteButton.click();
            console.log("✅ Clicou no botão 'Enviar convites'.");
        } else {
            console.log("❌ Botão 'Enviar convites' não encontrado ou não clicável.");
        }
    }

    function startIntelligentClicking() {
        console.log("Iniciando Cliques Inteligentes...");
        let templateSelector = CHECKBOX_SELECTOR; // Para este caso, o seletor é fixo
        let attempts = 0;
        const maxAttempts = 120; // Aumentado para 2 minutos

        if (intervalClicking) clearInterval(intervalClicking);

        intervalClicking = setInterval(() => {
            attempts++;
            let clickedCount = 0;
            let foundUnchecked = false;

            let potentialCheckboxes = document.querySelectorAll(templateSelector);
            
            potentialCheckboxes.forEach(iElement => {
                let isCloseButton = iElement.closest('[aria-label="Fechar"]');
                if (isCloseButton) {
                    return; 
                }

                if (iElement.style.backgroundPosition === UNCHECKED_POSITION) {
                    foundUnchecked = true;
                    iElement.click();
                    clickedCount++;
                    console.log("✅ Clicou em uma caixa de seleção desmarcada.");
                }
            });

            if (clickedCount === 0 && !foundUnchecked) { 
                console.log(`Nenhuma caixa de seleção desmarcada encontrada. Tentando clicar no botão '${INVITE_BUTTON_TEXT}'.`);
                clearInterval(intervalClicking);
                clickInviteButton(); 
            } else if (attempts >= maxAttempts) {
                console.log(`❌ Cliques Inteligentes: Não foram encontrados novos elementos para clicar após ${maxAttempts} segundos. Finalizando.`);
                clearInterval(intervalClicking);
                clickInviteButton(); // Tenta clicar o botão de convites mesmo se não clicou mais
            } else if (foundUnchecked) {
                console.log(`🔄 Cliques Inteligentes: Encontradas e clicadas ${clickedCount} caixas de seleção desmarcadas. Tentativa ${attempts}.`);
            } else {
                console.log(`⏳ Cliques Inteligentes: Nenhuma nova caixa de seleção clicável. Tentativa ${attempts}.`);
            }

        }, 1000); // Verificar e clicar a cada 1 segundo
    }

    // Função para adicionar os botões ao diálogo
    function addButtonsToDialog(dialog) {
        if (dialog.querySelector('#autoClickerButtons')) {
            return; // Botões já adicionados
        }

        const buttonContainer = document.createElement('div');
        buttonContainer.id = 'autoClickerButtons';
        buttonContainer.style.cssText = `
            position: absolute;
            bottom: 60px; /* Ajuste a posição conforme necessário */
            left: 50%;
            transform: translateX(-50%);
            width: 90%; /* Ajuste a largura conforme necessário */
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;

        const startButton = document.createElement('button');
        startButton.textContent = 'Iniciar Cliques Inteligentes';
        startButton.style.cssText = `
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1em;
            width: 100%;
        `;
        startButton.onclick = startIntelligentClicking;

        // Adicione outros botões se desejar (ex: para parar, etc.)

        buttonContainer.appendChild(startButton);
        dialog.appendChild(buttonContainer);
        console.log("✅ Botões de controle injetados no diálogo.");
    }

    // Observar o DOM para detectar quando o diálogo de convite é aberto
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.matches(INVITE_DIALOG_SELECTOR)) {
                        console.log("Diálogo de convite detectado.");
                        addButtonsToDialog(node);
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Tentar adicionar os botões imediatamente caso o diálogo já esteja aberto na injeção do script
    let existingDialog = document.querySelector(INVITE_DIALOG_SELECTOR);
    if (existingDialog) {
        console.log("Diálogo de convite existente detectado na inicialização.");
        addButtonsToDialog(existingDialog);
    }

}

// Executa a função principal quando o content script é carregado
injectButtonsAndLogic();