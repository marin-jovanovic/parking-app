const db = require('../database')

module.exports = class Rezervacija{

    constructor(idrezervacija, idgrupe, pocetakrezervacije, krajrezervacije, vozilo, vozac, parking){
        this.idrezervacija = idrezervacija;
        this.idgrupe = idgrupe;
        this.pocetakrezervacije = pocetakrezervacije;
        this.krajrezervacije = krajrezervacije;
        this.vozilo = vozilo;
        this.vozac = vozac;
        this.parking = parking;
    }
    
}