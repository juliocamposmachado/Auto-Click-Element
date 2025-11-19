chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "startClicking") {
        console.log("Received message to start clicking.");
        startClicking();
    }
});

function startClicking() {
    const INVITE_BUTTON_TEXT = 'Enviar convites';

    let intervalId = setInterval(() => {
        let clickedCount = 0;
        let foundUnchecked = false;

        // CORREÇÃO: Usando o seletor de classe correto: i.x1b0d499.x1d69dk1
        let potentialCheckboxes = document.querySelectorAll('i.x1b0d499.x1d69dk1');
        
        potentialCheckboxes.forEach(iElement => {
            let isCloseButton = iElement.closest('[aria-label="Fechar"]');
            if (isCloseButton) {
                return; 
            }

            // Mantemos '0px -1025px' como a posição de background para o estado desmarcado
            if (iElement.style.backgroundPosition === '0px -1025px') {
                foundUnchecked = true;
                iElement.click();
                clickedCount++;
                console.log("Clicou em uma caixa de seleção desmarcada.");
            }
        });

        if (clickedCount === 0 && !foundUnchecked) {
            console.log(`Nenhuma caixa de seleção desmarcada encontrada. Tentando clicar no botão '${INVITE_BUTTON_TEXT}'.`);
            clearInterval(intervalId);
            clickInviteButton();
        } else if (foundUnchecked) {
            console.log(`Encontradas e clicadas ${clickedCount} caixas de seleção desmarcadas. Continuar verificando...`);
        } else if (clickedCount === 0 && foundUnchecked === false) {
            console.log(`Nenhuma nova caixa de seleção foi clicável. Tentando clicar no botão '${INVITE_BUTTON_TEXT}'.`);
            clearInterval(intervalId);
            clickInviteButton();
        }

    }, 1500); 
}

function clickInviteButton() {
    const INVITE_BUTTON_TEXT = 'Enviar convites';
    // Procura por um botão que contém o texto 'Enviar convites'
    let inviteButton = document.evaluate(
        `//span[text()='${INVITE_BUTTON_TEXT}']/ancestor::div[@role='button']`,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;

    if (inviteButton) {
        inviteButton.click();
        console.log("Clicou no botão 'Enviar convites'.");
    } else {
        console.log("Botão 'Enviar convites' não encontrado ou não clicável.");
    }
}