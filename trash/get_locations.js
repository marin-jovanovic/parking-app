// returna listu iz baze [user lat, user lngt], oba broja su float
// test function, napravi da cita iz baze kasnije

 function get_locations() {
    return [
        { lat: 45.413, lng: 15.077, NumEmpty: 1 },
        { lat: 45.513, lng: 15.177, NumEmpty: 2 },
        { lat: 45.613, lng: 15.277, NumEmpty: 3 },
        { lat: 45.713, lng: 15.377, NumEmpty: 4 },
        { lat: 45.813, lng: 15.5577, NumEmpty: 5 },
        { lat: 45.813, lng: 15.6477, NumEmpty: 6 },
        { lat: 45.813, lng: 15.6777, NumEmpty: 7 },
        { lat: 45.813, lng: 15.8477, NumEmpty: 8 },
        { lat: 45.813, lng: 15.44477, NumEmpty: 9 },
        { lat: 45.813, lng: 15.4277, NumEmpty: 10 },
        { lat: 45.813, lng: 15.977, NumEmpty: 11 },
        { lat: 45.813, lng: 16.477, NumEmpty: 12 },
        { lat: 45.813, lng: 15.377, NumEmpty: 13 },
        { lat: 45.813, lng: 15.277, NumEmpty: 14 },
        { lat: 45.833, lng: 16.477, NumEmpty: 15 },
        { lat: 45.7913, lng: 15.967, NumEmpty: 16 },
        { lat: 45.913, lng: 15.577, NumEmpty: 17 }
    ]
} 



// async function getLocations(){
//         let location = await dbDohvatiLokaciju(); 
//         console.log(location);
// }

    




// dbDohvatiLokaciju = async () => {
//     console.log("UNUTAR DB DOHVATI LOKACIJU!")
//     const sql = `SELECT * from lokacija`;
//     try {
//         const result = await db.query(sql, []);
//         console.log("RESULT "+ result.rows);
//         return result.rows;
//     } catch (err) {
//         console.log(err);
//         throw err
//     }
// };




