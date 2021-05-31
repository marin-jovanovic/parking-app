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

const sql_create_table_vozac = `CREATE TABLE VOZAC(
  korisnickoImeVozac VARCHAR(20) NOT NULL,
  OIBvozac CHAR(11) NOT NULL,
  brojKredKartice VARCHAR(20) NOT NULL,
  emailVozac VARCHAR(30) NOT NULL,
  imeVozac VARCHAR(25) NOT NULL,
  prezimeVozac VARCHAR(30) NOT NULL,
  lozinkaVozac VARCHAR(20) NOT NULL,
  razinaOvlasti INT NOT NULL,
  PRIMARY KEY (korisnickoImeVozac)
)`;

const sql_create_table_tvrtka = `CREATE TABLE TVRTKA(
  korisnickoImeTvrtke VARCHAR(30) NOT NULL,
  lozinkaTvrtka VARCHAR(20) NOT NULL,
  OIBTvrtka CHAR(11) NOT NULL,
  emailTvrtka VARCHAR(50) NOT NULL,
  ImeTvrtka VARCHAR(50) NOT NULL,
  adresaTvrtka VARCHAR(50) NOT NULL,
  PRIMARY KEY (korisnickoImeTvrtke)
)`;

const sql_create_table_vozilo = `CREATE TABLE VOZILO(
  registracija VARCHAR(15) NOT NULL,
  korisnickoImeVozac VARCHAR(20) NOT NULL,
  PRIMARY KEY (registracija, korisnickoImeVozac),
  FOREIGN KEY (korisnickoImeVozac) REFERENCES VOZAC(korisnickoImeVozac) ON UPDATE CASCADE ON DELETE CASCADE
)`;

const sql_create_table_lokacija = `CREATE TABLE LOKACIJA(
  AdresaLokacija VARCHAR(50) NOT NULL,
  GeoSirina NUMERIC NOT NULL,
  GeoDuzina NUMERIC NOT NULL,
  IDLokacija SERIAL NOT NULL,
  PRIMARY KEY (IDLokacija)
)`;

const sql_create_table_parking = `CREATE TABLE PARKING(
  IDparking SERIAL NOT NULL,
  kapacitet INT NOT NULL,
  brojSlobMjesta INT NOT NULL,
  cijenaPoSatu NUMERIC NOT NULL,
  korisnickoImeTvrtke VARCHAR(30) NOT NULL,
  IDLokacija INT NOT NULL,
  PRIMARY KEY (IDparking),
  FOREIGN KEY (korisnickoImeTvrtke) REFERENCES TVRTKA(korisnickoImeTvrtke) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (IDLokacija) REFERENCES LOKACIJA(IDLokacija) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT chkKapacitet CHECK (kapacitet > 0),
  CONSTRAINT chkBrojSlobMjesta CHECK (brojSlobMjesta > 0),
  CONSTRAINT chkCijenaPoSAtu CHECK (cijenaPoSatu > 0)
)`;

const sql_create_table_rezervacija = `CREATE TABLE REZERVACIJA(
  pocetakRezervacije TIMESTAMP NOT NULL,
  krajRezervacije TIMESTAMP NOT NULL,
  IDrezervacija SERIAL NOT NULL,
  IDgrupe INT NOT NULL,
  IDparking INT NOT NULL,
  registracija VARCHAR(15) NOT NULL,
  korisnickoImeVozac VARCHAR(20) NOT NULL,
  PRIMARY KEY (IDrezervacija),
  FOREIGN KEY (IDparking) REFERENCES PARKING(IDparking) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (registracija, korisnickoImeVozac) REFERENCES VOZILO(registracija, korisnickoImeVozac) ON UPDATE CASCADE ON DELETE CASCADE
)`;

const sql_create_sessions = `CREATE TABLE session (
  sid varchar NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);`

const sql_create_session_index1 = `ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE`
const sql_create_session_index2 = `CREATE INDEX IDX_session_expire ON session(expire)`

let tables = [
    sql_create_table_vozac,
    sql_create_table_tvrtka,
    sql_create_table_vozilo,
    sql_create_table_lokacija,
    sql_create_table_parking,
    sql_create_table_rezervacija,
    sql_create_sessions
];

let table_names = [
    "vozac",
    "tvrtka",
    "vozilo",
    "lokacija",
    "parking",
    "rezervacija",
    "sessions"
];

// drop table lokacija, parking, rezervacija, session, tvrtka, vozac, vozilo CASCADE


( async () => {
    for (let i = 0; i < tables.length; i++) {
        console.log("Creating table " + table_names[i]+ ".");
        
        // await pool.query(sql_create_session_index1, [])
        // await pool.query(sql_create_session_index2, [])
        try {
            await pool.query(tables[i], [])
            console.log("Table " + table_names[i] + " created.");
            if (table_names[i] == "sessions") {
              await pool.query(sql_create_session_index1, [])
              await pool.query(sql_create_session_index2, [])
            }
        }
        catch(err) {
            console.log("Error creating table " + table_names[i])
            return console.log(err.message);
        }
    }
}) ()
