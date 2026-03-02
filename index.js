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
    return res.status(400).json(
      { 
        erro: "Dados incompletos"
      });
  }
  const imc = peso / (altura * altura);
  res.json
  ({ 
    nome,
    imc: imc.toFixed(2)
  });

});


app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
