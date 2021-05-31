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


( async () => {
    await pool.query("insert into vozac values ('Admin', '12345678900', '321631132231', 'admin@admin.com','Joško','Jošković','lozinka', 2),('User','33345678900','321631242231','user@user.com','Dario', 'Jošković', 'lozinka', 1),('Mišo','33355678900','321631241231', 'misokovac@gmail.com', 'Mišo', 'Kovač', 'lozinka', 1)", [])
    
    await pool.query("insert into tvrtka values ('Tvrtka', 'lozinka', '33322678900', 'tvrtka@asdasd.com', 'TVRTKA TVRTKOVIĆ', 'Zagrebačka ulica 8')", [])
}) ()
