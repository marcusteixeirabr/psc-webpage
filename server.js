// ============================================================
// SERVER.JS — ponto de entrada da aplicação
// Equivalente à classe main() do Java com @SpringBootApplication
//
// No Java o Spring Boot configurava tudo automaticamente.
// Aqui no Express você configura explicitamente — mais verboso
// que o JS "puro", mas muito mais claro que o Spring por baixo.
// ============================================================

const express = require("express"); // importa o Express
// equivalente ao import do Java
// require() é o sistema de módulos
// CommonJS do Node.js

const path = require("path"); // módulo nativo do Node para
// trabalhar com caminhos de pasta

const app = express(); // cria a aplicação Express
// equivalente ao SpringApplication.run()
const PORT = 3000; // nossa porta (era 8080 no Java)

// ── CONFIGURAÇÃO DO EJS ──────────────────────────────────────
// Diz ao Express para usar EJS como template engine
// Equivalente ao spring-boot-starter-thymeleaf no build.gradle
app.set("view engine", "ejs");

// Diz onde ficam os templates (nossa pasta views/)
// Equivalente ao spring.thymeleaf.prefix no application.properties
app.set("views", path.join(__dirname, "views"));

// ── ARQUIVOS ESTÁTICOS ───────────────────────────────────────
// Serve tudo dentro de /public como arquivo estático
// Equivalente à pasta src/main/resources/static/ do Spring Boot
// /public/css/global.css vira acessível em /css/global.css
app.use(express.static(path.join(__dirname, "public")));

// ── PARSING DO BODY DO FORMULÁRIO ────────────────────────────
// Habilita leitura dos dados enviados por formulários HTML (POST)
// No Spring Boot isso era automático — aqui precisa declarar
app.use(express.urlencoded({ extended: true }));

// ── ROTAS ────────────────────────────────────────────────────
// Importa e registra as rotas de cada módulo
// Equivalente ao @Controller sendo detectado pelo component scan

const welcomeRoutes = require("./routes/welcome");
const navioRoutes = require("./routes/navio");

app.use("/", welcomeRoutes); // rotas de / e /sobre
app.use("/navios", navioRoutes); // rotas de /navios/*

// Código de rota específico para teste
app.get("/teste", (req, res) => {
  res.render("teste");
});

// ── SOBE O SERVIDOR ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════╗
║   Port Inspection Node — rodando!        ║
║   http://localhost:${PORT}                  ║
╚══════════════════════════════════════════╝
    `);
});
