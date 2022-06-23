const express = require('express');
const router = express.Router();


const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const SECRET = 'henmarnel';




router.get('/', (req, res, next ) => {
    console.log("client conectado ROTA: [REGISTER]");

    res.sendFile('register.html', { root: './src/views' });
   // res.sendFile('.../views/t.html')

   /*
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota login'
    })
    */
});




router.post('/', (req, res, next ) => {
    res.status(200).send({
        mensagem: 'Usando o POST dentro da rota login'
    })
});


/*
router.patch('/', (req, res, next) => {
    res.status(200).sed({

    })
})
*/


//

module.exports = router;




/*

app.post('/login', (req,res) => {
  /*
  const response = {
    first_name:req.body.first_name,
    last_name:req.body.last_name  
  }; 
*/
/*
  const validation_stats = validator.valid_info_resgister(req.body);

 console.log("enviado com sucesso")

  
  if (validation_stats === false){
    console.log("ERRO NO CADASTRO");
    return res.status(201).send({
      mensagem: "erro inesperado tente novamente" 
    });
  }else{

    if(existUser(req.body.username)){

    }else{
      
      pool.query(`INSERT INTO bd_ifchess VALUES('${req.body.username}', '${req.body.email}', '${crypto.createHash('sha256').update(req.body.password).digest('hex')}')`)

      const token = jwt.sign({userId: 1},SECRET ,{ expiresIn: 300});

      return res.json({ auth: true , token});

    }
  
    
      return res.status(401).end();
  }

    
})*/