const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const produtos = [
    { id: 1, nome: "Hollow kinght Silksong", preco: 59.90 },
    { id: 2, nome: "Dead Cells", preco: 23.90 },
    { id: 3, nome: "Blaspheomous", preco: 70.00 }
];

app.get("/produtos", (res) => {
    res.json(produtos);
})

app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = produtos.find(p => p.id === id);

    if (!produto) {
        return res.status(404).send({ erro: "Produto Indisponivel" });
    }

    res.json(produto);
})

app.post("/produtos", (req, res) => {
    const novoProduto = req.body;
    produtos.push(novoProduto);
    return res.status(201).json(novoProduto);
})

app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === id);

    if (produtoIndex === -1) {
        return res.status(404).send({ erro: "Produto não encontrado" });
    }

    produtos[produtoIndex] = { ...produtos[produtoIndex], ...req.body };
    res.json(produtos[produtoIndex]);
})

app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produtoIndex = produtos.findIndex(p => p.id === id);

    if (produtoIndex === -1) {
        return res.status(404).send({ erro: "Produto não encontrado" });
    }

    produtos.splice(produtoIndex, 1);
    return res.status(204).send();
})


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})
