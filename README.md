# Auto Click Element (Extensão para Microsoft Edge)

<img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/e0952c3e-373b-4076-8c2b-9bc80eca7530" />

🌟 Projeto SÓ 1 – Rádio Tatuapé FM
A força que nasce de cada pessoa

A Rádio Tatuapé FM, em parceria com a Like Look Solutions, desenvolveu uma ferramenta inovadora para acelerar a divulgação do Projeto SÓ 1. Essa extensão para o navegador Microsoft Edge foi criada para facilitar o compartilhamento de convites e informações nos grupos do Facebook, permitindo que mais pessoas conheçam e participem dessa iniciativa transformadora.

🚀 Por que essa ferramenta é importante?
O Projeto SÓ 1 busca apoiar famílias em situação de vulnerabilidade, com foco especial em crianças e na qualificação profissional de adultos.

A extensão automatiza cliques em convites de seguidores nos grupos, tornando o processo mais rápido e eficiente.

Com isso, a rede de solidariedade se expande e as mensagens do projeto chegam a mais pessoas em menos tempo.

📥 Como baixar a extensão
Você pode acessar o repositório oficial e instalar a ferramenta diretamente no seu navegador: 👉 Baixar extensão Auto-Click-Element no GitHub - https://github.com/juliocamposmachado/Auto-Click-Element

💡 Um gesto que multiplica
Assim como o Projeto SÓ 1 acredita que um gesto isolado pode transformar vidas, essa ferramenta é um passo tecnológico que fortalece a união e amplia o impacto social. Cada clique automatizado representa mais pessoas convidadas, mais vozes engajadas e mais esperança compartilhada.

📌 Grupo oficial no Facebook (Divulgação): 👉 https://www.facebook.com/groups/Brasileirissimos.oficial

📌 Grupo oficial no WhatsApp (Recepção): 👉 https://chat.whatsapp.com/DdPNSUmjrThFeJnWvfCyNg?mode=hqrt1

✨ Projeto SÓ 1 – Rádio Tatuapé FM Quando um se move, muitos podem seguir.

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
    *   Navegue e **selecione a pasta `extension`** (localizada em `c:\Auto Click Element\extension` ou no diretório onde você clonou o repositório).
      
  
    <img width="1365" height="737" alt="image" src="https://github.com/user-attachments/assets/a8f3071d-e3a8-4faa-9649-77af9821aa53" />

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

🔄 Aviso Importante sobre o Carregamento da Extensão
Em alguns casos, após instalar a extensão, ela pode não aparecer imediatamente no diálogo de convites do Facebook. Isso acontece porque o navegador precisa reconhecer e inicializar os scripts da extensão dentro da página.

👉 Para resolver, basta recarregar a página algumas vezes (usando F5 ou o botão de atualizar do navegador).

Na primeira recarga, o navegador começa a carregar os arquivos da extensão.

Em recargas seguintes, o botão “Iniciar Cliques Inteligentes” deve aparecer corretamente dentro do diálogo de convites.

Se ainda não aparecer, aguarde alguns segundos e tente novamente.

Esse processo é normal e garante que a extensão seja carregada de forma completa e esteja pronta para uso.
