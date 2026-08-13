# FL Street Radar — site de divulgação

Landing page em **HTML + CSS + JavaScript puro**, sem build, sem dependências
externas, construída a partir do guia `App_Perfin/Site app Claude.pdf`. O nome
da empresa foi trocado de **Perfin** para **FL Street** em todo o conteúdo,
mantendo a estrutura, as seções e os textos do PDF original.

Abra `index.html` diretamente no navegador — não precisa de servidor.

## Estrutura

```
Site_FLStreet/
├── index.html      todo o conteúdo e a estrutura das seções
├── css/styles.css   tokens de cor/tipografia e todo o layout
├── js/main.js        menu mobile, scrollspy, abas do showcase, formulário
└── assets/           (vazio — a página não usa nenhuma imagem externa)
```

Não há imagens: o mockup dos três telefones (feed, detalhe, watchlist) é
construído inteiramente em HTML/CSS, reaproveitando o mesmo conteúdo fictício
do aplicativo Android (`App_Perfin/PerfinRadar`) para manter a consistência
entre os dois produtos.

## Seções da página

1. **Header** — logo, navegação (Produto, Telas, Score, Para quem), CTA.
2. **Hero** — chamada principal + mockup do feed.
3. **O problema** — "Informação não falta. Falta hierarquia."
4. **O que o Radar faz** — as quatro funções (captura, priorização,
   interpretação, acompanhamento).
5. **O aplicativo** — showcase com abas trocando entre as três telas.
6. **O diferencial / Score** — explicação do Score de Impacto FL Street.
7. **Fontes monitoradas** — Bloomberg, CVM, B3, Banco Central, Federal Reserve.
8. **Para quem o Radar foi desenhado** — Gestor, Analista, Comitê e RI.
9. **CTA final** — formulário de solicitação de acesso.
10. **Footer** — disclaimer legal.

## Sobre o formulário de acesso

O formulário em `#acesso` é **só de front-end**: ele valida os campos no
navegador e mostra uma mensagem de confirmação, mas não envia dados a
nenhum servidor. Antes de publicar, troque o `preventDefault()` em
`js/main.js` por uma chamada real (endpoint próprio, serviço de formulários,
etc.) — ver o comentário no topo daquele trecho do arquivo.

## Paleta

Cores e tipografia são próprias deste site (não reaproveitam os tokens de
marca da Perfin, que são proprietários daquela empresa), mas seguem a mesma
linguagem visual do guia em PDF: navy escuro, verde de destaque, fundo bege
claro, cantos retos. Os tokens estão no topo de `css/styles.css`.

## Publicação

O arquivo é estático — pode ser publicado em qualquer hospedagem de arquivos
estáticos (GitHub Pages, Netlify, Vercel, S3, etc.) sem nenhuma etapa de
build. Basta subir a pasta inteira.
