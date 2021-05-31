const {Pool} = require('pg');

/*
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ParkirajMe',
    password: 'bazepodataka',
    port: 5432,
  });
*/
const pool = new Pool({
    user: 'zddoeynvyltvss',
    host: 'ec2-79-125-77-37.eu-west-1.compute.amazonaws.com',
    database: 'ddi5euvd0v2df5',
    password: 'c7c4a4214ffcbb3e06eadeaadca3777db0648b0915198b6322ae01619e8676da',
    port: 5432,
});

module.exports = {
    query: (text, params) => {
        const start = Date.now();
        return pool.query(text, params)
            .then(res => {
                const duration = Date.now() - start;
                //console.log('executed query', {text, params, duration, rows: res.rows});
                return res;
            });
    },
    pool: pool

}
