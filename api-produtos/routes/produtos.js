const express = require("express");
const router = express.Router();
const Produto = require("../models/Produtos");

router.get("/", async (req, res) => {
    const produtos = await Produto.findAll();
    res.json(produtos);
});

router.get("/:id", async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ mensagem: "Produto não encontrado" });
    res.json(produto);
});

router.post("/", async (req, res) => {
    const { nome, preco, descricao } = req.body;
    const novo = await Produto.create({ nome, preco, descricao });
    res.status(201).json(novo);
});

router.put("/:id", async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ mensagem: "Produto não encontrado" });

    const { nome, preco, descricao } = req.body;
    await produto.update({ nome, preco, descricao });

    res.json(produto);
});

router.delete("/:id", async (req, res) => {
    const produto = await Produto.findByPk(req.params.id);
    if (!produto) return res.status(404).json({ mensagem: "Produto não encontrado" });

    await produto.destroy();
    res.json({ mensagem: "Deletou o produto" });
});

module.exports = router;
