require("dotenv").config();
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
)

sequelize.authenticate().then((function() {
    console.log("Conectado ao banco de dados!!!");
})).catch(function(erro){
    console.log("erro ao tentar conectar ao banco" + erro);
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}