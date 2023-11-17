import { conectString } from "./Connect/connect.js";

import express from "express";
import cors from "cors";

import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://api-rest-theta.vercel.app"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const port = process.env.PORT || 5001;

console.log("Rodando");

const pool = conectString();

app.post("/api/registerMusic", async (req, res) => {
  const client = await pool.connect();
  const { nome, banda, duracao, img } = req.body;
  const dadosQuery = `INSERT INTO music VALUES ('${uuidv4()}', '${nome}' , '${banda}' , '${duracao}' , '${img}');`;
  try {
    const result = await client.query(dadosQuery);
    return res.json({ result, erro: false });
  } catch {
    return res.json({ message: "Erro ao realizar busca", erro: true });
  }
});

app.get("/api/getterMusic", async (req, res) => {
  const client = await pool.connect();
  const dadosQuery = `SELECT * FROM music;`;
  try {
    const result = (await client.query(dadosQuery)).rows;
    return res.json({ result, erro: false });
  } catch {
    return res.json({ message: "Erro ao realizar busca", erro: true });
  }
});

app.get("/", async (req, res) => {
  return res.json({
    message: "A API está rodando",
    author: "David Raphael Gustavo Neves",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
