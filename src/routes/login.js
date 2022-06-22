const express = require('express');
const router = express.Router();


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