const db = require('../database')
const Korisnik = require('./Korisnik')

//razred Vozac prikazuje korisnika aplikacije koji trazi parking
module.exports = class Vozac extends Korisnik{
    
    //konstruktor vozaca
    constructor(korisnickoIme, OIBkorisnik, brojKredKartice, emailKorisnik, imeKorisnik, prezimeKorisnik, lozinkaKorisnik, razinaOvlasti = 1) {
        super(korisnickoIme, OIBkorisnik, emailKorisnik, lozinkaKorisnik, razinaOvlasti)
        this.brojKredKartice = brojKredKartice;
        this.imeVozac = imeKorisnik;
        this.prezimeVozac = prezimeKorisnik;
    }

    async registracija(){
        const sql = `insert into vozac values('${this.korisnickoIme}', '${this.OIBkorisnik}', '${this.brojKredKartice}', '${this.emailKorisnik}', '${this.imeVozac}', '${this.prezimeVozac}', '${this.lozinkaKorisnik}', 1)`
        console.log(sql)
        try {
            const result = await db.query(sql, []);
            return result > 0;
        } catch (err) {
            console.log(err);
            throw err
        }
    } 

    
}  


