const express = require('express');
const router = express.Router();


const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const SECRET = 'henmarnel';
const pool = require('../dao/conexao');

const validator = require('../private/js/validator.js')


router.use(express.json());
router.use(express.urlencoded({
    extended: true
}))







function existUser(name){
  
  return pool.query(`SELECT *  FROM bd_ifchess WHERE name = '${name}'`)
  .then(function(result){
    if (result.rowCount == 0){
      console.log("user not exist")
      
      return false;
    }        

    console.log("user exist");
    return true;
   
 })
 .catch(function(erro){
   
     console.log(erro.stack)
     //res.render('lista');
 })
    
}



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

    
  const validation_stats = validator.valid_info_resgister(req.body);

 console.log("registrando usuario...")

  
  
 if (validation_stats === false){
  console.log("ERRO NO CADASTRO");
  return res.status(201).send({
    mensagem: "erro inesperado tente novamente" 
  });
}else{

  existUser(req.body.username).then(function(rel){
      if(rel){
        return  res.status(200).send({
          mensagem: 'Nome de usuario/email usado por outra pessoa'
          })
      }else{
          
    console.log("adicionando...")
    pool.query(`INSERT INTO bd_ifchess VALUES('${req.body.username}', '${req.body.email}', '${crypto.createHash('sha256').update(req.body.password).digest('hex')}')`)

    const token = jwt.sign({userId: 1},SECRET ,{ expiresIn: 300});

    return res.json({ auth: true , token});

      }
   }).catch(function(){
    return res.status(201).send({
      mensagem: "houve um erro inesperado tente novamente :(" 
    });
   });

 
  var a = existUser(req.body.username);
  console.log("R  == "+existUser(req.body.username));
 
  
  //  return res.status(401).end();
}

  
});


/*
router.patch('/', (req, res, next) => {
    res.status(200).sed({

    })
})
*/


//

module.exports = router;
