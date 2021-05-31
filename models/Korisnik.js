const db = require('../database')

module.exports = class Korisnik{


    constructor(korisnickoIme, OIBkorisnik, emailKorisnik, lozinkaKorisnik, razinaOvlasti){
        this.korisnickoIme = korisnickoIme;
        this.OIBkorisnik = OIBkorisnik;
        this.emailKorisnik = emailKorisnik;
        this.lozinkaKorisnik = lozinkaKorisnik;
        this.razinaOvlasti = razinaOvlasti;
    }
    
}

