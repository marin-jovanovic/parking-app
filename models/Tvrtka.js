const db = require('../database')
const Korisnik = require('./Korisnik')

module.exports = class Tvrtka extends Korisnik{
    
    //konstruktor vozaca
    constructor(korisnickoImeTvrtke, lozinkaTvrtka, OIBTvrtka, emailTvrtka, imeTvrtka, adresaTvrtka, razinaOvlasti = 1) {
        super(korisnickoImeTvrtke, OIBTvrtka, emailTvrtka, lozinkaTvrtka, razinaOvlasti)
        this.imeTvrtka = imeTvrtka;
        this.adresaTvrtka = adresaTvrtka;
    }

    async registracija(){
        const sql = `insert into tvrtka values('${this.korisnickoIme}', '${this.lozinkaKorisnik}', '${this.OIBkorisnik}', '${this.emailKorisnik}', '${this.imeTvrtka}' , '${this.adresaTvrtka}')`
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


