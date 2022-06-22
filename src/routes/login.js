const express = require('express');
const router = express.Router();


const pool = require('../dao/conexao');



function existUser(name){
 
    pool.query(`SELECT email  FROM bd_ifchess 
      WHERE email = '${name}'`)
    .then(function(resultado){
      if (resultado.rowCount == 0){
        console.log("user not exist")
        return true;
      }          
      console.log("user exist")
        return false;
   })
   .catch(function(erro){
       console.log(erro.stack)
       //res.render('lista');
   })
      
  }
  //existUser('marcos');
  
  function validatePassword(email, password){
    pool.query(`SELECT * FROM bd_ifchess 
      WHERE email = '${email}' AND password = '${crypto.createHash('sha256').update(password).digest('hex')}'`)
    .then(function(resultado){
      if (resultado.rowCount == 0){
        console.log("user not exist")
        return false;
      }          
      console.log("user exist")
        return true;
   })
   .catch(function(erro){
       console.log(erro.stack)
       //res.render('lista');
   })
  }











router.get('/', (req, res, next ) => {
    
    console.log("client conectado ROTA: [LOGIN]");

    res.sendFile('login.html', { root: './src/views' });

    /*
    res.status(200).send({
        mensagem: 'Usando o GET dentro da rota login'
    })
    */
});
//teste2

router.post('/', (req, res, next ) => {
    /*
if(validatePassword(req.body.email, req.body.password)){
}else{

}
 */
    res.status(200).send({
        mensagem: 'Usando o POST dentro da rota login'
    })
}); 

router.patch('/', (req, res, next) => {
    res.status(200).sed({

    })
})



//

module.exports = router;