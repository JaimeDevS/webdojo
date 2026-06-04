# 🧪 WebDojo - Testes Automatizados com Cypress

Este projeto contém os testes automatizados end-to-end (E2E) da
aplicação **WebDojo**, utilizando o framework **Cypress**.

------------------------------------------------------------------------

## 📦 Pré-requisitos

Antes de rodar os testes, você precisa ter instalado:

-   Node.js (\>= 16)
-   npm ou yarn

------------------------------------------------------------------------

## 🚀 Subindo a aplicação

A aplicação **WebDojo** está no mesmo repositório. Para executá-la:

``` bash
npm run dev
```

A aplicação será iniciada em:

http://localhost:3000

⚠️ Importante: Os testes dependem da aplicação rodando.

------------------------------------------------------------------------

## ▶️ Executando os testes

### Rodar todos os testes (modo headless)

``` bash
npm run test
```

Executa todos os testes com viewport desktop: - Width: 1440 - Height:
900

------------------------------------------------------------------------

### Rodar testes com interface (modo interativo)

``` bash
npm run test:ui
```

Abre o Cypress UI para execução manual e debug.

------------------------------------------------------------------------

### Rodar teste específico de login

``` bash
npm run test:login
```

Executa apenas o teste de login: cypress/e2e/login.cy.js

------------------------------------------------------------------------

### Rodar teste de login (mobile)

``` bash
npm run test:login:mobile
```

Executa o teste simulando um dispositivo mobile: - Width: 414 - Height:
896

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

``` bash
cypress/
├── e2e/
├── fixtures/
│   ├── cep.json
│   ├── consultancy.json
│   └── document.pdf
├── support/
│   ├── actions/
│   │   └── consultancy.actions.js
│   ├── commands.js
│   ├── e2e.js
│   └── utils.js
```

------------------------------------------------------------------------

## 🧠 Organização dos Testes

### e2e/

Contém os arquivos de teste (\*.cy.js)

### fixtures/

Arquivos estáticos usados nos testes (mock de dados, massa, arquivos)

### support/

-   commands.js → comandos customizados
-   actions/ → ações reutilizáveis
-   utils.js → funções auxiliares
-   e2e.js → configuração global

------------------------------------------------------------------------

## 🧩 Boas práticas

-   Separação de dados, ações e testes
-   Reutilização de código
-   Uso de fixtures
-   Testes independentes
-   Simulação de viewport real

------------------------------------------------------------------------

## ⚠️ Observações

-   Suba a aplicação antes de rodar os testes
-   Evite dependência entre testes
-   Prefira dados mockados

------------------------------------------------------------------------
