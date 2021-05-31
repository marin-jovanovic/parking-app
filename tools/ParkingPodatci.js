const db = require('../database')
const Lokacija = require('../models/Lokacija')
const Parking = require('../models/Parking')
const LokacijaPodatci = require('./LokacijaPodatci')
const KorisnikPodatci = require('./KorisnikPodatci')


module.exports = class ParkingPodatci{
    //OVO NIJE ZAVRSENO
    static async dohvatiParkinge(){
        let result = await dbDohvatiParkinge();
        let parkinzi = [];
        for(let  i = 0; i < result.length; i++){
            let lokacija = new Lokacija(result[i].adresalokacija, result[i].geosirina, result[i].geoduzina);
            console.log("adresa " + lokacija.adresalokacija);
            console.log("HHHGHGHEHD " + result[i].korisnickoimetvrtke)
            let dohvacenaTvrtka = await KorisnikPodatci.dohvatiTvrtkuPrekoUsernamea(result[i].korisnickoimetvrtke);
            let tvrtka = dohvacenaTvrtka;
            parkinzi.push(new Parking(result[i].kapacitet, result[i].brojslobmjesta, result[i].cijenaposatu, tvrtka, lokacija));
        }
        return parkinzi;
    }

    static async dodajParking(parking){
        let dodanaLokacija = await LokacijaPodatci.dodajLokaciju(parking.lokacija);
        let dohvacenId = await LokacijaPodatci.dohvatiIdLokacije(parking.lokacija);
        if(dohvacenId.length === 0){
            return false;
        }
        let idLokacije = dohvacenId[0].idlokacija;
        if(dodanaLokacija !== false){
            let result = await dbDodajParking(parking, idLokacije);
            return result;
        }else{
            return false;
        }
        
    }

    static async dohvatiParkingZaKoordinate(sirina, duzina){
        let result = await dbDohvatiParkingZaPodatke(sirina, duzina);
        return result[0];
    }

    static async ukloniParking(parking){
        await dbUkloniParking(parking);
        return;
    }

    static async dohvatiParkingeZaTvrtku(tvrtka){
        let result = await dbDohvatiParkingeZaTvrtku(tvrtka);
        return result;
    }

    static async dohvatiSveParkinge(){
        let result = await dbDohvatiSveParkinge();
        return result;
    }

}
//OVO OCITO NIJE ZAVRSENO
    dbDohvatiParkinge = async () => {
        console.log("UNUTAR DB DOHVATI LOKACIJU!")
        const sql = `SELECT * from parking LEFT OUTER JOIN lokacija ON parking.idlokacija = lokacija.idlokacija`;
        try {
            const result = await db.query(sql, []);
            console.log("RESULT "+ result.rows);
            return result.rows;
        } catch (err) {
            console.log(err);
            throw err
        }
    };

    dbDodajParking = async (parking, idLokacije) => {
        console.log("UNUTAR DB DODAJ PARKING!")
        const sql = `INSERT INTO parking (kapacitet, brojslobmjesta, cijenaposatu, korisnickoimetvrtke, idlokacija) 
        VALUES($1, $2, $3, $4, $5)`;
        const values = [parking.kapacitet, parking.brojslobmjesta, parking.cijenaposatu, parking.tvrtka.korisnickoIme, idLokacije];
        try {
            const result = await db.query(sql, values);
            console.log("RESULT "+ result.rows);
            return result.rows;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    dbDohvatiParkingZaPodatke = async (sirina, duzina) => {
        //console.log("UNUTAR DB DOHVATI PARKING ZA PODATKE!")
        const sql = `SELECT * FROM parking NATURAL JOIN lokacija WHERE 
        lokacija.geosirina=$1 AND lokacija.geoduzina=$2`;
        const values = [parseFloat(sirina), parseFloat(duzina)];
        try {
            const result = await db.query(sql, values);
            //console.log(result.rows[0]);
            //console.log(result.rows[0].idparking);
            return result.rows;
        } catch (err) {
            console.log(err);
            return err;
        }
    
};

dbUkloniParking = async (parking) => {
    console.log("UNUTAR DB UKLONI PARKING!")
    const sql = `DELETE FROM parking WHERE idparking = $1`;
    const values = [parking];
    try {
        const result = await db.query(sql, values);
        console.log(result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        return err;
    }

};

dbDohvatiParkingeZaTvrtku = async (tvrtka) => {
    console.log("UNUTAR DB DOHVATI PARKIGN ZA TVRTKU!")
    const sql = `SELECT * FROM parking natural join lokacija WHERE korisnickoimetvrtke = $1`;
    const values = [tvrtka];
    try {
        const result = await db.query(sql, values);
        console.log(result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        return err;
    }

}; 

dbDohvatiSveParkinge = async () => {
    console.log("UNUTAR DB DOHVATI SVE PARKINGE")
    const sql = `SELECT * FROM parking NATURAL JOIN lokacija`;
    const values = [];
    try {
        const result = await db.query(sql, values);
        console.log(result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        return err;
    }

}; 