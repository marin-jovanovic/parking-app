const db = require('../database')
const Vozac = require('../models/Vozac')
const Tvrtka = require('../models/Tvrtka')


function test() {
    return "lala1";
}

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
            console.log(podatci[0].korisnickoimevozac+ " AAAAAAAAAAAAAAA")

           vozac = new Vozac(podatci[0].korisnickoimevozac, podatci[0].oibvozac, podatci[0].brojkredkartice, podatci[0].emailvozac, 
            podatci[0].imevozac, podatci[0].prezimevozac, podatci[0].lozinkavozac, podatci[0].razinaovlasti)
        }
        console.log(vozac);
        return vozac;
    }

    static async dohvatiTvrtkuPrekoUsernamea(username) {

        let podatci = await dbDohvatiTvrtku(username)
        let tvrtka;
        if( podatci.length > 0 ) {
            console.log(podatci[0].korisnickoimetvrtka+ " AAAAAAAAAAAAAAA")

           tvrtka = new Tvrtka(podatci[0].korisnickoimetvrtke, podatci[0].lozinkatvrtka, podatci[0].oibtvrtka, podatci[0].emailtvrtka,
            podatci[0].imetvrtka, podatci[0].adresatvrtka, 1);
        }
        console.log(tvrtka);
        return tvrtka;
    } 

    static  provjeriLozinku(password1, password2) {
        return password2 ? password2 == password1 : false
    }

   
}




prebrojiEmail = async (email) => {
    const sql = `SELECT COUNT(*) FROM tvrtka, vozac WHERE tvrtka.emailtvrtka = '${email}'
    OR  vozac.emailVozac = '${email}'`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

prebrojiKorisnike = async (korisnickoIme) => {
    const sql = `SELECT COUNT(*) FROM tvrtka, vozac WHERE tvrtka.korisnickoimetvrtke = '${korisnickoIme}'
    OR  vozac.korisnickoimeVozac = '${korisnickoIme}'`;
    try {
        const result = await db.query(sql, []);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbDohvatiVozaca = async (username) => {
    const sql = `SELECT * from vozac WHERE korisnickoimeVozac = '${username}' or emailVozac = '${username}'`;
    try {
        const result = await db.query(sql, []);
        console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbDohvatiTvrtku = async (username) => {
    console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    const sql = `SELECT * from tvrtka WHERE korisnickoimeTvrtke = '${username}' or emailTvrtka = '${username}'`;
    console.log(sql);
    try {
        const result = await db.query(sql, []);
        console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};