import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Bem-vindo ao servidor Express!");
});

app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`);
});
