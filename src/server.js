const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();

// Configurações para ler os dados do formulário 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vos12345',
  database: 'bancoElementalia'
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
  } else {
    console.log("Conexão estabelecida com sucesso!");

    // 1. Garantimos que o Banco existe
    connection.query("CREATE DATABASE IF NOT EXISTS bancoElementalia", (err) => {
      if (err) {
        console.log("Erro ao criar o banco:", err);
      } else {
        console.log("Banco de dados pronto!");

        // 2. Criamos a Tabela (Agora com as colunas novas)
        const sqlTabela = `
          CREATE TABLE IF NOT EXISTS personagens (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(50),
            elemento VARCHAR(50),
            vidamax INT,
            vidaatual INT,
            folegomax INT,
            folegoatual INT,
            forca INT,
            agilidade INT,
            constituicao INT,
            inteligencia INT,
            carisma INT,
            mente INT
          )`;

        connection.query(sqlTabela, (err) => {
          if (err) console.log("Erro ao criar a tabela:", err);
          else console.log("Tabela 'personagens' pronta para o jogo!");
        });
      }
    });
  }
});

// Rota para abrir o HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.post("/salvar-personagem", (req, res) => {
  const nomeDoPersonagem = req.body.nome;
  const elementoDoPersonagem = req.body.elemento;
  const vidaMaxDoPersonagem = req.body.vidaMax;
  const vidaAtualDoPersonagem = req.body.vidaAtual;
  const folMaxDoPersonagem = req.body.folMax;
  const folAtualDoPersonagem = req.body.folAtual;
  const forcaDoPersonagem = req.body.forca;
  const agilidadeDoPersonagem = req.body.agilidade;
  const constituicaoDoPersonagem = req.body.constituicao;
  const inteligenciaDoPersonagem = req.body.inteligencia;
  const carismaDoPersonagem = req.body.carisma;
  const menteDoPersonagem = req.body.mente;

  const sql = "INSERT INTO personagens (nome, elemento, vidamax, vidaatual, folegomax, folegoatual, forca, agilidade, constituicao, inteligencia, carisma, mente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const valores = [
  nomeDoPersonagem, 
  elementoDoPersonagem, 
  vidaMaxDoPersonagem, 
  vidaAtualDoPersonagem, 
  folMaxDoPersonagem, 
  folAtualDoPersonagem, 
  forcaDoPersonagem, 
  agilidadeDoPersonagem, 
  constituicaoDoPersonagem, 
  inteligenciaDoPersonagem, 
  carismaDoPersonagem, 
  menteDoPersonagem
];

  connection.query(sql, valores, (err, result) => {
    if (err) {
      console.log("Erro ao inserir:", err);
      res.send("Erro ao salvar o personagem");
    } else {
      res.send("Personagem salvo com sucesso!");
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000 ");
});