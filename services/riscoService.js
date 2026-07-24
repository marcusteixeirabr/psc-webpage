// ============================================================
// services/riscoService.js — camada de serviço
// Equivalente ao RiscoService.java
//
// COMPARAÇÃO DIRETA COM JAVA:
//   Java:  classe + @Service + métodos tipados + DTOs + enums
//   JS:    objetos literais + funções — sem cerimônia
//
// A LÓGICA É IDÊNTICA. O que muda é só a sintaxe.
// ============================================================

// ── EQUIVALENTE AOS ENUMS DO JAVA ────────────────────────────
// Em Java: public enum GrauRisco { ALTO(...), PADRAO(...), BAIXO(...) }
// Em JS: objeto com propriedades — sem tipagem, mas funciona igual.
// Object.freeze() impede alterações acidentais — nossa proteção
// já que não temos o compilador do Java nos guardando.

const GrauRisco = Object.freeze({
  ALTO: {
    label: "Alto Risco",
    descricao:
      "Navio com mais de 20 anos. Sujeito a inspeção expandida obrigatória.",
    classeCss: "risco-alto",
  },
  PADRAO: {
    label: "Risco Padrão",
    descricao:
      "Navio entre 10 e 20 anos. Inspeção padrão conforme regime CIALA.",
    classeCss: "risco-padrao",
  },
  BAIXO: {
    label: "Baixo Risco",
    descricao:
      "Navio com menos de 10 anos. Elegível para inspeção simplificada.",
    classeCss: "risco-baixo",
  },
});

const Prioridade = Object.freeze({
  P1: {
    label: "Prioridade I",
    descricao: "Inspeção altamente recomendada. Intervalo máximo excedido.",
    classeCss: "prioridade-1",
  },
  P2: {
    label: "Prioridade II",
    descricao: "Inspeção recomendada. Navio se aproxima do intervalo máximo.",
    classeCss: "prioridade-2",
  },
  P0: {
    label: "Sem Prioridade",
    descricao:
      "Navio inspecionado recentemente. Dentro do intervalo permitido.",
    classeCss: "prioridade-0",
  },
});

const TipoNavio = Object.freeze({
  GRANELEIRO: "Graneleiro (Bulk Carrier)",
  PETROLEIRO: "Petroleiro (Oil Tanker)",
  QUIMICO: "Químico / Produto (Chemical Tanker)",
  PORTA_CONTEINERES: "Porta-Contêineres (Container Ship)",
  CARGA_GERAL: "Carga Geral (General Cargo)",
  ROLL_ON_OFF: "Ro-Ro / Roll-on Roll-off",
  PASSAGEIROS: "Navio de Passageiros",
  FRIGORIFICO: "Frigorífico (Reefer)",
  REBOCADOR: "Rebocador (Tug)",
  DRAGA: "Draga (Dredger)",
  OUTROS: "Outros",
});

// ── FUNÇÕES DE CÁLCULO ────────────────────────────────────────
// Em Java eram métodos privados dentro da classe RiscoService.
// Em JS são funções normais — podemos exportar só o que precisamos.

/**
 * Calcula o grau de risco baseado na idade do navio.
 * Lógica idêntica ao GrauRisco.calcular(idadeAnos) do Java.
 */
function calcularGrauRisco(idadeAnos) {
  if (idadeAnos > 20) return GrauRisco.ALTO;
  if (idadeAnos >= 10) return GrauRisco.PADRAO;
  return GrauRisco.BAIXO;
}

/**
 * Calcula a prioridade baseada no grau de risco e meses
 * desde a última inspeção.
 * Lógica idêntica ao método privado calcularPrioridade() do Java.
 */
function calcularPrioridade(grauRisco, meses) {
  if (grauRisco === GrauRisco.ALTO) {
    if (meses <= 2) return Prioridade.P0;
    if (meses <= 4) return Prioridade.P2;
    return Prioridade.P1;
  }
  if (grauRisco === GrauRisco.PADRAO) {
    if (meses <= 5) return Prioridade.P0;
    if (meses <= 10) return Prioridade.P2;
    return Prioridade.P1;
  }
  // BAIXO
  if (meses <= 9) return Prioridade.P0;
  if (meses <= 18) return Prioridade.P2;
  return Prioridade.P1;
}

/**
 * Função principal — equivalente ao método calcular() do RiscoService.java.
 * Recebe os dados do formulário e devolve tudo calculado.
 *
 * Em Java retornávamos um NavioResultado (DTO tipado).
 * Em JS retornamos um objeto literal — sem classe, sem construtor,
 * sem getters. Só dados.
 */
function calcular(form) {
  const anoAtual = new Date().getFullYear();
  const idadeAnos = Math.max(0, anoAtual - parseInt(form.anoConstrucao));

  // calcula meses desde a última inspeção
  const dataInspecao = new Date(form.ultimaInspecao);
  const hoje = new Date();
  const mesesDesdeInspecao = Math.floor(
    (hoje - dataInspecao) / (1000 * 60 * 60 * 24 * 30.44),
  );

  const grauRisco = calcularGrauRisco(idadeAnos);
  const prioridade = calcularPrioridade(grauRisco, mesesDesdeInspecao);

  // Em Java: new NavioResultado(nome, tipo, ano, ...)
  // Em JS: objeto literal — sem classe, direto ao ponto
  return {
    nome: form.nome,
    tipo: form.tipo,
    tipoLabel: TipoNavio[form.tipo] || form.tipo,
    anoConstrucao: parseInt(form.anoConstrucao),
    ultimaInspecao: dataInspecao.toLocaleDateString("pt-BR"),
    idadeAnos,
    mesesDesdeInspecao: Math.max(0, mesesDesdeInspecao),
    grauRisco,
    prioridade,
  };
}

// ── VALIDAÇÃO ─────────────────────────────────────────────────
// Em Java o Bean Validation (@NotBlank, @NotNull) era automático.
// Em JS fazemos manual — mais trabalho, mais controle.

function validar(form) {
  const erros = {};

  if (!form.nome || form.nome.trim().length < 2) {
    erros.nome = "O nome do navio é obrigatório (mínimo 2 caracteres).";
  }
  if (!form.tipo) {
    erros.tipo = "Selecione o tipo do navio.";
  }
  if (
    !form.anoConstrucao ||
    isNaN(form.anoConstrucao) ||
    form.anoConstrucao < 1900 ||
    form.anoConstrucao > 2100
  ) {
    erros.anoConstrucao = "Informe um ano de construção válido.";
  }
  if (!form.ultimaInspecao) {
    erros.ultimaInspecao = "A data da última inspeção é obrigatória.";
  } else if (new Date(form.ultimaInspecao) > new Date()) {
    erros.ultimaInspecao = "A data da inspeção não pode ser futura.";
  }

  return erros; // objeto vazio = sem erros
}

// ── EXPORTS ───────────────────────────────────────────────────
// Em Java o Spring detectava os @Service automaticamente.
// Em JS exportamos explicitamente o que outros módulos podem usar.
// module.exports é o equivalente ao "public" do Java.

module.exports = { calcular, validar, TipoNavio };
