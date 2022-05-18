const pool = require('./conexao');


async function connect(){

    await pool.connect();
    console.log("Connected to the bank...");
    await pool.end();

}

connect()