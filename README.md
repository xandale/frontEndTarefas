
---

## 🚀 Funcionalidades da Aplicação

- **Cadastro de Usuário**
  - Formulário com validação.
  - Envia dados ao backend para criação de conta.

- **Login**
  - Autenticação com e-mail e senha.
  - Armazena token JWT no `localStorage` para acesso a rotas protegidas.

- **Gestão de Tarefas**
  - Criar, editar e excluir tarefas.
  - Filtrar tarefas por status e prioridade.
  - Listar tarefas do usuário autenticado.

- **Navegação**
  - Transições entre páginas: Home, Login e Cadastro.

- **Rotas Protegidas**
  - Acesso a páginas privadas apenas com token JWT válido (ex: `/tarefas`).

---


## ▶️ Como Rodar a Aplicação


    - Clone o repositório:
    ```bash
    git clone https://seu-repositorio.git
    cd seu-repositorio
    Instale as dependências do frontend:

    bash
    Copiar
    Editar
    npm install
    Inicie o servidor frontend:

    Copiar
    Editar
    npm start
    Instale o Cypress 
    abra o cypress npx cypress open
    execute npx cypress run
## ✅ Funcionalidades Testadas

---

### 1️⃣ **Cadastro de Usuário** (`formulario.cy.js`)

- Preenchimento dos campos:
  - Nome
  - Email
  - Senha
- Envio do formulário e validação da resposta de sucesso.
- Verificação da mensagem:  
  **"Cadastro realizado com sucesso"**.

---

### 2️⃣ **Login de Usuário** (`login.cy.js`)

#### 🔐 **Login com credenciais válidas:**
- Preenchimento dos campos:
  - Email
  - Senha
- Submissão do formulário.
- Verificação do redirecionamento para a página de tarefas:  
`/tarefas`.
- Validação da mensagem de boas-vindas personalizada.

#### ❌ **Login com credenciais inválidas:**
- Preenchimento com dados incorretos.
- Verificação da mensagem de erro:  
**"Credenciais inválidas"**.

---

### 3️⃣ **Navegação Entre Páginas** (`navegacao.cy.js`)

- Acesso à página inicial:  
`/`.
- Clique no link ou botão **"Login"** e verificação da URL:  
`/login`.
- Navegação da página de Login para a página de Cadastro:  
`/cadastro`.

---

### 4️⃣ **Validação de Elementos na Página Inicial** (`elementos.cy.js`)

- Verificação da presença do título principal:  
**"Bem-vindo ao Enovacar"**.
- Validação dos botões principais visíveis na tela:
  - **"Login"**
  - **"Cadastrar"**
