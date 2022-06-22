 // https://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/
// https://www.youtube.com/watch?v=A-c643zCW7E

/*               Requisição dos modulos          */ 

const express = require("express");
const app = express();



const pool = require('./dao/conexao');

const crypto = require('crypto');

const c = require('./app');

const jwt = require("jsonwebtoken");

const SECRET = 'henmarnel';

const validator = require('./private/js/validator.js')


app.use('/bscss', express.static('./node_modules/bootstrap/dist/css'));
app.use('/bsjs', express.static('./node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static('./node_modules/jquery/dist'));
app.use('/popperjs', express.static('./node_modules/@popperjs/core/dist/umd'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));




app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////          ROTAS DE CRIAÇÂO DA TABELA     ///////////////////////////////////////////////////////////


/* comando de criaçãoda tabela 


CREATE TABLE public.bd_ifchess
(
    name character varying(50) COLLATE pg_catalog."default" NOT NULL,
    password character varying(64) COLLATE pg_catalog."default" NOT NULL,
    settings json NOT NULL,
    CONSTRAINT bd_ifchess_pkey PRIMARY KEY (name)
)

TABLESPACE pg_default;

ALTER TABLE public.bd_ifchess
    OWNER to postgres;

*/


/* comando de delt da tabela
    DROP TABLE public.bd_ifchess;
*/


///// comando de criptografia |sha256|  crypto.createHash('sha256').update('abc').digest('hex');




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




app.get('/settings',function(req,res){
  res.sendFile(__dirname + '/views/settings.html')
})

app.post('/create-table-default',function(req, res){

  pool.query(`CREATE TABLE public.bd_ifchess
  (
      name character varying(50) COLLATE pg_catalog."default" NOT NULL,
      email character varying(50) COLLATE pg_catalog."default" NOT NULL,
      password character varying(64) COLLATE pg_catalog."default" NOT NULL,
      settings json,
      CONSTRAINT bd_ifchess_pkey PRIMARY KEY (name)
  )
  
  TABLESPACE pg_default;
  
  ALTER TABLE public.bd_ifchess
      OWNER to postgres;`)
                 .then(function(resultado){
                   
                })
                .catch(function(erro){
                    console.log(erro.stack)
                })
  
});

app.post('/delet-table-default',function(req, res){
  pool.query(`DROP TABLE public.bd_ifchess;`)
                 .then(function(resultado){
                    let estudante = resultado.rows[0]
                    //console.log(estudante)
                    res.render('index_new',{estudante,id})
                })
                .catch(function(erro){
                    console.log(erro.stack)
                    //res.render('lista');
    })
});
//t
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



app.listen(3000,function(){
    console.log('Servidor rodando na porta 3000');
});




app.get('/inicio',function(req, res){
    res.sendFile(__dirname + '/views/index.html')
});


/*               Rota da verificação  do usuário          */ 

app.get('/login',function(req, res){
    res.sendFile(__dirname + '/views/t.html')
});


app.get('/login2', function(req, res){
  res.sendFile(__dirname + '/views/login.html')
})

app.post('/login2', function(req, res){
  if(validatePassword(req.body.email, req.body.password)){
  }else{

  }
})


app.post('/logout', function(req, res) {
  res.json({ auth: false, token: null });
})



app.post('/login', (req,res) => {
  /*
  const response = {
    first_name:req.body.first_name,
    last_name:req.body.last_name  
  }; 
*/
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

    
})


app.post('/cadastro-album',function(req, resp){
  //teste
});