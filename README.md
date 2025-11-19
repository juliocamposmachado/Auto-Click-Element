# Auto Click Element

Este repositório contém uma extensão de navegador para Microsoft Edge e um script Python que automatizam cliques em elementos específicos de páginas web, com foco na funcionalidade de convidar seguidores em grupos do Facebook.

## Conteúdo do Repositório

*   **`extension/`**: Contém os arquivos da extensão para Microsoft Edge.
*   **`clicker.py`**: Um script Python que utiliza Selenium para automação de navegador.
*   **`requirements.txt`**: Lista as dependências Python para `clicker.py`.

## 1. Extensão do Microsoft Edge (Recomendado para Facebook)

### Funcionalidade

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

## 2. Script Python com Selenium (`clicker.py`)

Este script usa Selenium para automatizar cliques em caixas de seleção e no botão "Enviar convites" no Facebook. É uma alternativa para quando a extensão direta não é viável ou para outros propósitos de automação de navegador.

### Pré-requisitos

*   Python 3.x
*   Microsoft Edge WebDriver (`msedgedriver.exe`)

### Configuração e Execução

1.  **Baixe o Microsoft Edge WebDriver:**
    *   Acesse `https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/`.
    *   Baixe o `msedgedriver.exe` que corresponde à **versão exata** do seu navegador Microsoft Edge e ao seu sistema operacional.
    *   Coloque o arquivo `msedgedriver.exe` na pasta `c:\Auto Click Element` (ou em um diretório que esteja no `PATH` do seu sistema).

2.  **Crie e ative um ambiente virtual (recomendado):**
    ```bash
    cd "c:\Auto Click Element"
    python -m venv .venv
    # No Windows:
    .\.venv\Scripts\activate
    # No macOS/Linux:
    source ./.venv/bin/activate
    ```

3.  **Instale as dependências:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Configure o `clicker.py`:**
    *   Abra `clicker.py` em um editor de texto.
    *   Localize a linha `driver.get("https://www.facebook.com/groups/Brasileirissimos.oficial")` e certifique-se de que o URL corresponde à página do grupo que você quer automatizar.
    *   **Configuração de Perfil (para manter o login):** Se você quer que o Edge abra com seu perfil já logado, você precisará ajustar as linhas:
        ```python
        user_data_dir = "C:\\Users\\<SEU_USUARIO_WINDOWS>\\AppData\\Local\\Microsoft\\Edge\\User Data"
        profile_directory = "Default" # Ou 'Profile 1', etc., dependendo do seu perfil
        ```
        Substitua `<SEU_USUARIO_WINDOWS>` pelo seu nome de usuário do Windows. Para encontrar o `Caminho do perfil` exato, digite `edge://version` no Edge.

5.  **Execute o Script:**
    ```bash
    python clicker.py
    ```

    O navegador Edge será aberto e o script tentará clicar nas caixas de seleção e, em seguida, no botão "Enviar convites".

## Resolução de Problemas Comuns

*   **Extensão não carrega/Erro de Ícone:** Verifique se os arquivos de ícone (`icon16.png`, `icon48.png`, `icon128.png`) estão presentes na pasta `extension/icons/`.
*   **Cliques não funcionam:** O Facebook frequentemente altera sua interface. Pode ser necessário ajustar o `CHECKBOX_SELECTOR`, `UNCHECKED_POSITION`, `CHECKED_POSITION` ou o XPath do botão "Enviar convites" no `content.js` (e `clicker.py` para o script Python) para corresponder às novas mudanças no HTML e CSS da página.
*   **`WebDriverException: Message: 'msedgedriver' executable needs to be in PATH.`**: Certifique-se de que o `msedgedriver.exe` está na mesma pasta do seu script Python ou que seu diretório foi adicionado corretamente ao `PATH` do sistema.