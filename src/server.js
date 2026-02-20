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
  const { 
    nome, 
    elemento, 
    vidaMax, 
    vidaAtual, 
    folMax, 
    folAtual, 
    forca, 
    agilidade, 
    constituicao, 
    inteligencia, 
    carisma, 
    mente 
  } = req.body;

  const sql = "INSERT INTO personagens (nome, elemento, vidamax, vidaatual, folegomax, folegoatual, forca, agilidade, constituicao, inteligencia, carisma, mente) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  const valores = [
    nome, 
    elemento, 
    vidaMax, 
    vidaAtual, 
    folMax, 
    folAtual, 
    forca, 
    agilidade, 
    constituicao, 
    inteligencia, 
    carisma, 
    mente 
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

app.get("/mostrar-personagens", (req, res) => {

  const sql = "SELECT * FROM personagens"

  connection.query(sql, (err, results) => {
    if (err) {
        console.log("Erro ao buscar:", err);
        res.send("Erro ao exibir personagens");
    } else {
        // 'results' aqui é a lista de personagens que veio do MySQL!
        console.log(results); 
        res.json(results); 
    }
  });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000 ");
});