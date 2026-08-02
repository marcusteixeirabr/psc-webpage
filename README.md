# 🌐 psc-webpage

> Página protótipo desenvolvida em Node.js para apresentação e gerenciamento das atividades do PSC.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando o ecossistema Javascript/Node.js moderno:

* **Backend:** Node.js com Express
* **Renderização:** Views (EJS/Pug/Handlebars)
* **Ambiente Isolado:** Docker & Docker Compose
* **Gerenciador de Pacotes:** NPM

---

## 📂 Estrutura do Projeto

A arquitetura do projeto segue o padrão MVC/Rotas isoladas para melhor escalabilidade:

```text
├── .devcontainer/        # Configuração do ambiente no VS Code
├── public/               # Arquivos estáticos (CSS, JS, Imagens)
├── routes/               # Definição das rotas da aplicação
├── services/             # Regras de negócio e integrações
├── views/                # Telas e interfaces (Frontend)
├── docker-compose.yml    # Orquestração do container Docker
├── server.js             # Ponto de entrada (Entrypoint) do servidor
└── package.json          # Dependências e scripts do projeto
```

---

## 🛠️ Como Executar o Projeto

Você pode rodar este projeto de duas maneiras: localmente com o Node.js instalado ou de forma isolada via Docker.

### Opção 1: Execução Local (NPM)

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/marcusteixeirabr/psc-webpage.git
   cd psc-webpage
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```
   _Abra [http://localhost:3000](http://localhost:3000) no seu navegador._

### Opção 2: Execução via Docker (Recomendado)

Se você possui o Docker instalado, não precisa configurar o Node.js na sua máquina:

1. **Suba o container:**
   ```bash
   docker-compose up -d
   ```

2. **Para derrubar o container:**
   ```bash
   docker-compose down
   ```

---

## 👤 Autor

* **Marcus Teixeira** - [GitHub](https://github.com/marcusteixeirabr)
