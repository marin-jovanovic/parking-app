const db = require('../database')
const Lokacija = require('../models/Lokacija')
// const Parking = require('../models/Parking')

module.exports = class LokacijaPodatci{

    static async ispisiLokacije(){
        let result = await dbDohvatiLokaciju();
        // let lokacije = [];
        // for(let value of result){
        //     lokacije.push(new Lokacija(value.adresalokacija, 
        //         value.geosirina, value.geoduzina, value.idlokacija));
        // }
        // // console.l
        return result;
    }

    static async dodajLokaciju(lokacija){
        await dbDodajLokaciju(lokacija);
        return;
    }

    static async dohvatiIdLokacije(lokacija){
        let result = await dbDohvatiIdLokacije(lokacija);
        return result;
    }

}

dbDohvatiLokaciju = async () => {
    console.log("LokacijaPodaci/dbDohvatiLokaciju start")
    const sql = `SELECT * from lokacija`;
    try {
        const result = await db.query(sql, []);

        console.log("dbDohvatiLokaciju")
        for(let i = 0; i < result.rows.length; i++) {
            console.log(result.rows[i])
        }
        // console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        throw err
    }
};

dbDodajLokaciju = async (lokacija) => {
    console.log("LokacijaPodaci/dbDodajLokaciju start")
    
    const sql = `INSERT INTO lokacija (adresalokacija, geosirina, geoduzina) VALUES ($1, $2, $3)`;
    const values = [lokacija.adresalokacija, lokacija.geosirina, lokacija.geoduzina]
    
    try {
        const result = await db.query(sql, values);

        console.log("LokacijaPodaci/dbDodajLokaciju - result")

        for(let i = 0; i < result.rows.length; i++) {
            console.log(result.rows[i])
        }        
        
        return result.rows;
    } catch (err) {
        console.log(err);
        return false;
    }
};

dbDohvatiIdLokacije = async (lokacija) => {
    //console.log("LokacijaPodaci/dbDohvatiIdLokacije start")

    const sql = `SELECT idlokacija FROM lokacija WHERE adresalokacija=$1 AND geosirina=$2 AND geoduzina=$3 LIMIT 1`;
    const values = [lokacija.adresalokacija, lokacija.geosirina, lokacija.geoduzina]
    try {
        const result = await db.query(sql, values);


        //console.log("LokacijaPodaci/dbDohvatiIdLokacije - result")

        for(let i = 0; i < result.rows.length; i++) {
            //console.log(result.rows[i])
        }    

        // console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        return false;
    }
};

dbDohvatiLokacijuZaId = async (id) => {
    console.log("UNUTAR DOHVATI LOKACIJU ZA ID")

    const sql = `SELECT * FROM lokacija WHERE idlokacija = $1 LIMIT 1`;
    const values = [id]
    try {
        const result = await db.query(sql, values);



        for(let i = 0; i < result.rows.length; i++) {
            console.log(result.rows[i])
        }    

        // console.log("RESULT "+ result.rows);
        return result.rows;
    } catch (err) {
        console.log(err);
        return false;
    }
};