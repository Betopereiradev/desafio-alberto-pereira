class CaixaDaLanchonete {
  constructor() {
    this.cardapio = [
      { codigo: "cafe", descricao: "Café", valor: 3.0, isExtra: false },
      {
        codigo: "chantily",
        descricao: "Chantily (extra do Café)",
        valor: 1.5,
        isExtra: true,
      },
      { codigo: "suco", descricao: "Suco Natural", valor: 6.2, isExtra: false },
      {
        codigo: "sanduiche",
        descricao: "Sanduíche",
        valor: 6.5,
        isExtra: false,
      },
      {
        codigo: "queijo",
        descricao: "Queijo (extra do Sanduíche)",
        valor: 2.0,
        isExtra: true,
      },
      { codigo: "salgado", descricao: "Salgado", valor: 7.25, isExtra: false },
      {
        codigo: "combo1",
        descricao: "1 Suco e 1 Sanduíche",
        valor: 9.5,
        isExtra: false,
      },
      {
        codigo: "combo2",
        descricao: "1 Café e 1 Sanduíche",
        valor: 7.5,
        isExtra: false,
      },
    ];
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    if (!["dinheiro", "credito", "debito"].includes(metodoDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valorTotal = 0;
    let quantidadeItens = 0;
    let possuiPrincipal = {};

    for (const itemSelecionado of itens) {
      const [codigo, quantidade] = itemSelecionado.split(",");
      const itemMenu = this.cardapio.find((item) => item.codigo === codigo);

      const itensLimpos = itens.map((item) => item.replace(/,\d+/, "")); // Remove vírgula e números

      if (!itemMenu) {
        return "Item inválido!";
      }

      if (itemMenu.codigo == "chantily") {
        if (!itensLimpos.includes("cafe"))
          return "Item extra não pode ser pedido sem o principal";
      }

      if (itemMenu.codigo == "queijo") {
        if (!itensLimpos.includes("sanduiche")) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }

      if (
        !possuiPrincipal[codigo] &&
        itemMenu.codigo !== "combo1" &&
        itemMenu.codigo !== "combo2"
      ) {
        possuiPrincipal[codigo] = true;
      }

      quantidadeItens += parseInt(quantidade, 10);
      valorTotal += itemMenu.valor * parseInt(quantidade, 10);
    }

    if (quantidadeItens === 0) {
      return "Quantidade inválida!";
    }

    if (metodoDePagamento === "dinheiro") {
      valorTotal *= 0.95; // Aplica 5% de desconto
    } else if (metodoDePagamento === "credito") {
      valorTotal *= 1.03; // Aplica 3% de acréscimo
    }

    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
