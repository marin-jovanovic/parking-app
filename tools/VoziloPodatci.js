const db = require('../database')
const Vozilo = require('../models/Vozilo')
const Vozac = require('../models/Vozac')

module.exports = class VoziloPodatci{

    static async dohvatiVozila(vozac){
        if(!vozac){
            throw new Error('Vozac ne smije biti prazan!');
        }
        let result = await dbDohvatiVozilaZaVozaca(vozac);
        return result;
    }

    static async dodajVozilo(vozilo, vozac){
        if(vozilo.registracija.replace(/\s/g,"") == "" || vozilo.registracija.length === 0){
            throw new Error('Vozilo ne smije biti prazno!');
        }
        await dbDodajVozilo(vozilo, vozac);
        return;
    }

    static async ukloniVozilo(vozac, registracija){
        await dbUkloniVozilo(vozac, registracija);
        return;
    }

}


dbDohvatiVozilaZaVozaca = async (vozac) => {
    //console.log("UNUTAR DB DOHVATI VOZILA!")
    const sql = `SELECT registracija FROM vozilo WHERE korisnickoimevozac = $1`;
    const values = [vozac.korisnickoIme]
    try {
        const result = await db.query(sql, values);
        //console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbDodajVozilo = async (vozilo, vozac) => {
    //console.log("UNUTAR DB UBACI VOZILO!")
    const sql = `INSERT INTO vozilo(registracija, korisnickoimevozac) VALUES($1, $2)`;
    const values = [vozilo.registracija, vozac.korisnickoIme]
    try {
        const result = await db.query(sql, values);
        //console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        return null
    }
};

dbUkloniVozilo = async (vozac, registracija) => {
   // console.log("UNUTAR DB UKLONI VOZILO!")
    const sql = `DELETE FROM vozilo where korisnickoimevozac=$1 AND registracija = $2`;
    const values = [vozac.korisnickoIme, registracija]
    try {
        //console.log("DELETEAM " + values);
        const result = await db.query(sql, values);
        //console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        //console.log(err);
        return null
    }
};