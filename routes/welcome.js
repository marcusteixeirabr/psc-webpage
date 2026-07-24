// ============================================================
// routes/welcome.js — rotas da página inicial e sobre
// Equivalente ao WelcomeController.java
//
// Em Java:  @Controller + @GetMapping em métodos de uma classe
// Em JS:    router.get() — funções registradas num objeto Router
// ============================================================

const express = require("express");
const router = express.Router(); // cria um mini-roteador
// equivalente a @RequestMapping

// GET /
// Equivalente a @GetMapping("/") public String welcome(Model model)
router.get("/", (req, res) => {
  // res.render('welcome') diz ao Express:
  //   "renderize views/welcome.ejs e envie o HTML para o browser"
  // Equivalente ao return "welcome" do Controller Java
  res.render("welcome");
});

// GET /sobre
router.get("/sobre", (req, res) => {
  res.render("sobre");
});

module.exports = router;
