const { Pool } = require('pg');
/* ------ TEMPLADE --------
const pool = new Pool({
    user: 'uifmsdw',
    host: 'localhost',
    database: 'bdifmsdw',
    password: 'uifmsdw',
    port: 5432
})
*/

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432
})



module.exports = pool;