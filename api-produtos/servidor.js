require("dotenv").config();
const express = require("express");
const app = express();
const produtoRoutes = require("./routes/produtos");
const db = require("./config/db");

app.use(express.json());

app.use("/produtos", produtoRoutes);

db.sequelize.sync().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("API rodando na porta " + process.env.PORT);
    });
});
