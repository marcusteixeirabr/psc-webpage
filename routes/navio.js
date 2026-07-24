// ============================================================
// routes/navio.js — rotas de identificação de navio
// Equivalente ao NavioController.java
//
// COMPARAÇÃO DIRETA:
//   Java:  @GetMapping + @PostMapping em métodos de uma classe
//   JS:    router.get() + router.post() — bem mais enxuto
// ============================================================

const express = require("express");
const router = express.Router();

// importa o service — equivalente à injeção @Autowired do Java
// mas aqui é explícito: você vê exatamente de onde vem
const { calcular, validar, TipoNavio } = require("../services/riscoService");

// ── GET /navios/identificar ───────────────────────────────────
// Equivalente a:
//   @GetMapping("/identificar")
//   public String exibirFormulario(Model model) { ... }
router.get("/identificar", (req, res) => {
  res.render("navio-form", {
    // dados enviados para o template EJS
    // equivalente ao model.addAttribute() do Spring
    erros: {}, // sem erros no primeiro carregamento
    form: {}, // form vazio
    tiposNavio: TipoNavio, // popula o <select>
  });
});

// ── POST /navios/identificar ──────────────────────────────────
// Equivalente a:
//   @PostMapping("/identificar")
//   public String processarFormulario(@Valid NavioForm form, ...)
router.post("/identificar", (req, res) => {
  const form = req.body; // dados do formulário
  // equivalente ao @ModelAttribute NavioForm

  // valida — equivalente ao @Valid + BindingResult do Java
  const erros = validar(form);

  // se houver erros, volta o formulário com as mensagens
  // equivalente ao if (bindingResult.hasErrors()) return "navio-form"
  if (Object.keys(erros).length > 0) {
    return res.render("navio-form", {
      erros,
      form, // mantém os dados digitados no form
      tiposNavio: TipoNavio,
    });
  }

  // sem erros: calcula e renderiza o resultado
  // equivalente ao model.addAttribute("resultado", resultado)
  const resultado = calcular(form);
  res.render("navio-resultado", { resultado });
});

module.exports = router;
