const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'vos12345',
  database: 'bancoElementalia' 
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar:", err);
  } else {
    console.log("Conexão estabelecida com sucesso!");

    // Enviando o comando para criar o banco
    connection.query("CREATE DATABASE IF NOT EXISTS bancoElementalia", (err, result) => {
      if (err) {
        console.log("Erro ao criar o banco: ", err);
      } else {
        console.log("Banco de dados pronto para o Elementalia!");
        
        const sqlTabela = `
        CREATE TABLE IF NOT EXISTS personagens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(50),
        elemento VARCHAR(50),
        vidamax INT,
        folegomax INT,
        forca INT,
        agilidade INT,
        constituicao INT,
        inteligencia INT,
        carisma INT,
        mente INT
      )`;

      connection.query(sqlTabela, (err, result) => {
          if (err) {
            console.log("Erro ao criar a tabela:", err);
          } else {
            console.log("Tabela 'personagens' pronta para o jogo!");
          }
        }); // Fecha o query da tabela
      } 
    }); // Fecha o query do banco
  }
});