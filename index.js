const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/saudacao', (req, res) => {
  
   const nome = req.query.nome;
   
   if(!nome){
    return res.status(400).json({ error: 'Nome é obrigatório' });
   }

    res.json({ message: `Olá, ${nome}!` });
});


app.post("/imc", (req, res) => {
  const { nome, idade ,altura, peso } = req.body;
  
  if(!nome || !idade || !altura || !peso){
    return res.status(400).json({ 
        erro: "Dados incompletos"
    });
  }

  const imc = peso / (altura * altura);

  res.json({ 
    nome,
    imc: imc.toFixed(2)
  });
});


// 🔹 Nova rota - Média do aluno
app.post("/media", (req, res) => {
  const { nome, nota1, nota2 } = req.body;

  if (!nome || nota1 === undefined || nota2 === undefined) {
    return res.status(400).json({
      erro: "Dados incompletos"
    });
  }

  const media = (nota1 + nota2) / 2;
  const status = media >= 7 ? "Aprovado" : "Reprovado";

  res.json({
    nome,
    media: media.toFixed(2),
    status
  });
}); 
// 🔹 Nova Rota - Alistamento
app.post("/alistamento", (req, res) => {
  const { nome, idade, sexo } = req.body;

  if (!nome || !idade || !sexo) {
    return res.status(400).json({
      erro: "Dados incompletos"
    });
  }

  if (sexo.toLowerCase() === "masculino") {

    if (idade < 18) {
      res.json({
        nome,
        mensagem: "Ainda vai se alistar aos 18 anos."
      });

    } else if (idade === 18) {
      res.json({
        nome,
        mensagem: "Deve se alistar este ano!"
      });

    } else {
      res.json({
        nome,
        mensagem: "Já passou da idade de alistamento obrigatório."
      });
    }

  } else {
    res.json({
      nome,
      mensagem: "Alistamento militar não é obrigatório para este sexo."
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});