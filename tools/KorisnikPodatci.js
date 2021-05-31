const db = require('../database')
const Vozac = require('../models/Vozac')
const Tvrtka = require('../models/Tvrtka')



module.exports = class KorisnikPodatci{

    //provjerava jeli korisnicko ime zauzeto, te vraca true ako je
    static async korisnickoImeZauzeto(korisnickoIme){
        let result = await prebrojiKorisnike(korisnickoIme);
        return result[0].count > 0;
    }

    //provjerava jeli email zauzet, te vraca true ako je
    static async emailZauzet(email){
        let result = await prebrojiEmail(email);
        return result[0].count > 0;
    }

    //dohvaca podatke o korisniku preko njegovog korisnickog imena
    static async dohvatiVozacaPrekoUsernamea(username) {

        let podatci = await dbDohvatiVozaca(username)
        let vozac;
        if( podatci.length > 0 ) {

           vozac = new Vozac(podatci[0].korisnickoimevozac, podatci[0].oibvozac, podatci[0].brojkredkartice, podatci[0].emailvozac, 
            podatci[0].imevozac, podatci[0].prezimevozac, podatci[0].lozinkavozac, podatci[0].razinaovlasti)
        }
        //console.log(vozac);
        return vozac;
    }

    static async dohvatiTvrtkuPrekoUsernamea(username) {
        console.log("UNUTAR DHOVATI TVRTKu")
        let podatci = await dbDohvatiTvrtku(username)
        let tvrtka;
        if( podatci.length > 0 ) {

           tvrtka = new Tvrtka(podatci[0].korisnickoimetvrtke, podatci[0].lozinkatvrtka, podatci[0].oibtvrtka, podatci[0].emailtvrtka,
            podatci[0].imetvrtka, podatci[0].adresatvrtka, 1);
        }
        console.log(tvrtka);
        return tvrtka;
    } 

    static  provjeriLozinku(password1, password2) {
        return password2 ? password2 == password1 : false
    }

    static async azurirajVozaca(vozac){
        dbAzurirajVozaca(vozac);
    }

    static async azurirajTvrtku(tvrtka){
        dbAzurirajTvrtku(tvrtka);
    }

    static async dohvatiSveVozace(){
        return await dbDohvatiSveVozace();
    }

    static async dohvatiSveTvrtke() {
        return await dbDohvatiSveTvrtke();
    }

    static async ukloniKorisnika(korisnickoime) {
        dbUkloniKorisnika(korisnickoime);
    }

    static async ukloniTvrtku(korisnickoime) {
        dbUkloniTvrtku(korisnickoime);
    }

    static async emailZauzetPromjena(email, username){
        let result = await prebrojiEmailOsimUsera(email, username);
        return result[0].count > 0;
    }
   
}




prebrojiEmail = async (email) => {
    const sql = `SELECT COUNT(*) FROM tvrtka, vozac WHERE tvrtka.emailtvrtka = $1
    OR  vozac.emailVozac = $1`;
    const values = [email];
    try {
        const result = await db.query(sql, values);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

prebrojiEmailOsimUsera = async (email, username) => {
    const sql = `SELECT COUNT(*) FROM tvrtka, vozac WHERE (tvrtka.emailtvrtka = $1
    OR  vozac.emailVozac = $1) AND NOT tvrtka.korisnickoimetvrtke = $2 AND NOT vozac.korisnickoimevozac = $2 `;
    const values = [email, username];
    try {
        const result = await db.query(sql, values);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbAzurirajVozaca = async (vozac) => {
    const sql = `UPDATE vozac SET(oibvozac, imevozac, prezimevozac, emailvozac, brojkredkartice, lozinkavozac)
    =($1, $2, $3, $4, $5, $6)
    WHERE korisnickoimevozac = $7`;
    const values = [vozac.OIBkorisnik, vozac.imeVozac, vozac.prezimeVozac, vozac.emailKorisnik, vozac.brojKredKartice, vozac.lozinkaKorisnik, vozac.korisnickoIme];
    try {
        console.log("VALUES " + values);
        const result = await db.query(sql, values);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbAzurirajTvrtku = async (tvrtka) => {
    const sql = `UPDATE tvrtka SET(lozinkatvrtka, oibtvrtka, emailtvrtka, imetvrtka, adresatvrtka) = 
    ($1, $2, $3, $4, $5)
    WHERE korisnickoimetvrtke = $6`;
    const values = [tvrtka.lozinkaKorisnik, tvrtka.OIBkorisnik, tvrtka.emailKorisnik, tvrtka.imeTvrtka, tvrtka.adresaTvrtka, tvrtka.korisnickoIme];
    try {
        console.log("VALUES " + values);
        const result = await db.query(sql, values);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

prebrojiKorisnike = async (korisnickoIme) => {
    const sql = `SELECT COUNT(*) FROM tvrtka, vozac WHERE tvrtka.korisnickoimetvrtke = $1
    OR  vozac.korisnickoimeVozac = $1`;
    const values = [korisnickoIme];
    try {
        const result = await db.query(sql, values);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbDohvatiVozaca = async (username) => {
    const sql = `SELECT * from vozac WHERE korisnickoimeVozac = $1 or emailVozac = $1`;
    const values = [username];
    try {
        const result = await db.query(sql, values);
        //console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbDohvatiTvrtku = async (username) => {
    const sql = `SELECT * from tvrtka WHERE korisnickoimeTvrtke = $1 or emailTvrtka = $1`;
    const values = [username];
    console.log(sql);
    try {
        const result = await db.query(sql, values);
        console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbDohvatiSveVozace = async () => {
    const sql = `SELECT * FROM vozac order by prezimevozac, imevozac;`;
    try {
        const result = (await db.query(sql, [])).rows;
        return result;
    } catch(err) {
        console.log(err);
        throw err
    }
};


dbDohvatiSveTvrtke = async () => {
    const sql = `select * from tvrtka order by imetvrtka;`;
    try {
        const result = (await db.query(sql, [])).rows;
        return result;
    } catch(err) {
        console.log(err);
        throw err
    }
};

dbUkloniKorisnika = async (korisnickoime) => {
    const sql = `delete from vozac where korisnickoimevozac = $1`;
    const values = [korisnickoime];
    try {
        await db.query(sql, values);
    } catch(err) {
        console.log(err);
        throw err
    }
};

dbUkloniTvrtku = async (korisnickoime) => {
    const sql = `delete from tvrtka where korisnickoimetvrtke = $1`;
    const values = [korisnickoime];
    try {
        await db.query(sql, values);
    } catch(err) {
        console.log(err);
        throw err
    }
};

