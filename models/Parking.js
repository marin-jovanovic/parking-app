const db = require('../database')

module.exports = class Parking{

    constructor(kapacitet, brojslobmjesta, cijenaposatu, tvrtka, lokacija){
        this.kapacitet = kapacitet;
        this.brojslobmjesta = brojslobmjesta;
        this.cijenaposatu = cijenaposatu;
        this.tvrtka = tvrtka;
        this.lokacija = lokacija;
    }
    
}