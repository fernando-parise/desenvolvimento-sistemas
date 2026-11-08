# Fernando Parise — Desenvolvimento de Sistemas

Site estático (HTML + CSS + JavaScript puro). Não precisa de build nem de servidor.

## Arquivos

- `index.html`: conteúdo da página
- `style.css`: visual e responsividade
- `script.js`: menu mobile, abas, terminal animado, linha do tempo da Reforma, validador de CNPJ alfanumérico e montagem da mensagem de contato
- `favicon.svg`: ícone da aba

## Antes de publicar, preencha

1. **Contatos** no topo do `script.js`:
   ```js
   var WHATSAPP = '5547999999999';            // só números, com 55 + DDD
   var EMAIL = 'contato@seudominio.com.br';
   ```
2. **CNPJ da Iron Ronin** no rodapé do `index.html` (procure `[CNPJ DA IRON RONIN]`), ou apague o trecho.
3. Revise os **casos** (seção "Diário de bordo") e confirme que nada identifica cliente.

## Publicar no GitHub Pages

1. Crie um repositório vazio no GitHub (ex.: `desenvolvimento-sistemas`).
2. Na pasta:
   ```
   git init -b main
   git add .
   git commit -m "Site desenvolvimento de sistemas"
   git remote add origin https://github.com/SEU-USUARIO/desenvolvimento-sistemas.git
   git push -u origin main
   ```
3. **Settings → Pages → Deploy from a branch**, branch `main`, pasta `/ (root)` e **Save**.
4. Fica no ar em `https://SEU-USUARIO.github.io/desenvolvimento-sistemas/`.

## Fontes do conteúdo técnico

- Cronograma da Reforma: EC 132/2023 e LC 214/2025 (versão simplificada).
- CNPJ alfanumérico: IN RFB 2.229/2024 e "Perguntas e respostas — CNPJ alfanumérico" da Receita Federal (exemplo oficial 12.ABC.345/01DE-35).
