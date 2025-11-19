# Auto Click Element (Extensão para Microsoft Edge)

Este repositório contém uma **extensão de navegador para Microsoft Edge** que automatiza cliques em elementos específicos de páginas web, com foco na funcionalidade de convidar seguidores em grupos do Facebook.

## Conteúdo do Repositório

*   **`extension/`**: Contém os arquivos da extensão para Microsoft Edge.

## Funcionalidade da Extensão

A extensão é projetada para injetar botões diretamente no diálogo "Convide seguidores para esse grupo" do Facebook. Ela detecta a presença deste diálogo e, ao clicar em "Iniciar Cliques Inteligentes", automatiza o clique em todas as caixas de seleção de convite desmarcadas e, em seguida, no botão "Enviar convites".

### Como Instalar e Usar

1.  **Baixe ou clone este repositório:**
    ```bash
    git clone https://github.com/SEU_USUARIO/Auto-Click-Element.git
    cd Auto-Click-Element
    ```

2.  **Carregue a Extensão no Edge:**
    *   Abra o Microsoft Edge.
    *   Digite `edge://extensions` na barra de endereços e pressione Enter.
    *   Ative o **"Modo de desenvolvedor"** (geralmente um switch no canto inferior esquerdo ou superior direito).
    *   Clique no botão **"Carregar descompactada"**.
    *   Navegue e selecione a pasta `c:\Auto Click Element\extension` (ou a pasta `extension` dentro do diretório onde você clonou o repositório).

3.  **Use a Extensão:**
    *   Vá para a página do grupo do Facebook onde você deseja convidar amigos (ex: `https://www.facebook.com/groups/Brasileirissimos.oficial`).
    *   Abra o diálogo **"Convide seguidores para esse grupo"**.
    *   Aguarde alguns segundos. Um botão **"Iniciar Cliques Inteligentes"** deve aparecer dentro do próprio diálogo do Facebook.
    *   **Opcional, mas recomendado para iniciar o padrão:** Clique manualmente em *uma* caixa de seleção de convite no diálogo. Isso ajuda a extensão a inferir o padrão visual.
    *   Clique no botão **"Iniciar Cliques Inteligentes"** injetado no diálogo.

    A extensão começará a clicar em todas as caixas de seleção desmarcadas e, ao final, tentará clicar no botão "Enviar convites". Acompanhe o console do navegador (F12 > Console) para ver o feedback da extensão.

### Empacotando para Distribuição (Opcional)

Se você deseja criar um arquivo `.crx` para distribuir a extensão:

1.  Na página `edge://extensions` (com o Modo de desenvolvedor ativado), clique em **"Empacotar extensão"**.
2.  Selecione a pasta `c:\Auto Click Element\extension` como o "diretório raiz da extensão".
3.  Deixe o campo "Chave privada" vazio (para a primeira vez). O Edge irá gerar um arquivo `.pem` para você.
4.  Clique em "Empacotar". Os arquivos `.crx` e `.pem` serão criados na pasta *pai* da sua extensão (neste caso, `c:\Auto Click Element`). **Guarde o arquivo `.pem` em segurança.**

## Resolução de Problemas Comuns

*   **Extensão não carrega/Erro de Ícone:** Verifique se os arquivos de ícone (`icon16.png`, `icon48.png`, `icon128.png`) estão presentes na pasta `extension/icons/`.
*   **Cliques não funcionam:** O Facebook frequentemente altera sua interface. Pode ser necessário ajustar o `CHECKBOX_SELECTOR`, `UNCHECKED_POSITION`, `CHECKED_POSITION` ou o XPath do botão "Enviar convites" no `content.js` para corresponder às novas mudanças no HTML e CSS da página.