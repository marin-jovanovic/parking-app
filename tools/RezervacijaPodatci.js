const db = require('../database')
const Lokacija = require('../models/Lokacija')
const Parking = require('../models/Parking')
const LokacijaPodatci = require('./LokacijaPodatci')
const KorisnikPodatci = require('./KorisnikPodatci')


module.exports = class ParkingPodatci{
    //OVO NIJE ZAVRSENO
    static async dohvatiRezervacije(vozac){
        let result = await dbDohvatiRezervacije(vozac);
        return result;
    }

    static async dohvatiBrojZauzetihMjesta(rezervacija){
        let result = await dbDohvatiBrojZauzetihMjesta(rezervacija);
        return result[0].count;
    }

    static async dodajRezervaciju(rezervacija){
        await dbDodajRezervaciju(rezervacija);
        return;
    }

    static async ukloniRezervaciju(rezervacija){
        await dbUkloniRezervaciju(rezervacija);
        return;
    }



}
//OVO OCITO NIJE ZAVRSENO
dbDohvatiRezervacije = async (vozac) => {
    //console.log("UNUTAR DB DOHVATI REZERVACIJE!")
    const sql = `SELECT * FROM rezervacija NATURAL JOIN parking NATURAL JOIN lokacija WHERE korisnickoimevozac = $1`;
    const values = [vozac.korisnickoIme];
    try {
        const result = await db.query(sql, values);
        console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbDodajRezervaciju = async (rezervacija) => {
    console.log("UNUTAR DB DOHVATI REZERVACIJE!")
    const sql = `INSERT INTO rezervacija (pocetakrezervacije, krajrezervacije, idgrupe, idparking, registracija, korisnickoimevozac)
    VALUES($1, $2, $3, $4, $5, $6 )`;
    const values = [rezervacija.pocetakrezervacije, rezervacija.krajrezervacije, rezervacija.idgrupe, rezervacija.parking, rezervacija.vozilo.registracija,  rezervacija.vozac.korisnickoIme];
    try {
        const result = await db.query(sql, values);
        console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbUkloniRezervaciju = async (rezervacija) => {
    console.log("UNUTAR DB DOHVATI REZERVACIJE!")
    const sql = `DELETE FROM rezervacija WHERE idrezervacija = $1`;
    const values = [rezervacija];
    try {
        const result = await db.query(sql, values);
        console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbDohvatiBrojZauzetihMjesta = async (rezervacija) => {
    console.log("UNUTAR DB DOHVATI BROJ SLOBODNIH MJESTA!")
    const sql = `SELECT COUNT(*) FROM rezervacija WHERE 
    ((pocetakrezervacije < $1 AND krajrezervacije > $1) OR (pocetakrezervacije > $1 
    AND pocetakrezervacije < $2)) AND idparking = $3`;
    const values = [rezervacija.pocetakrezervacije, rezervacija.krajrezervacije, rezervacija.parking];
    try {
        const result = await db.query(sql, values);
        console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

