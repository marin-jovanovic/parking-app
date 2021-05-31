const db = require('../database')

module.exports = class Lokacija{

    constructor(adresalokacija, geosirina, geoduzina){
        this.adresalokacija = adresalokacija;
        this.geosirina = geosirina;
        this.geoduzina = geoduzina;
    }
    
}
