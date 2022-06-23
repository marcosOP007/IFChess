const express = require('express');
const router = express.Router();



const pool = require('../dao/conexao');


router.get('/', (req, res, next ) => {
    console.log("client conectado ROTA: [SETTINGS]");

    res.sendFile('settings.html', { root: './src/views' });
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


router.post('/create-table-default',function(req, res){

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
                    res.send({
                        mensagem: 'sucesso ao criar a tabela :)',
                        
                    })
                  })
                  .catch(function(erro){
                      console.log(erro.stack)

                      res.send({
                        mensagem: 'erro ao criar a tabela :(',
                        erro: erro.stack,
                    })
                  })
    
  });
  
  router.post('/delet-table-default',function(req, res){
    pool.query(`DROP TABLE public.bd_ifchess;`)
                   .then(function(resultado){
                      let estudante = resultado.rows[0]
                      //console.log(estudante)
                      //res.render('index_new',{estudante,id})

                      res.send({
                        mensagem: 'sucesso ao deletar a tabela :)',
                        
                    })
                  })
                  .catch(function(erro){
                   
                      console.log(erro.stack)

                      res.send({
                        mensagem: 'erro ao deletar tabela :(',
                        erro: erro.stack,
                    })
                      //res.render('lista');
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