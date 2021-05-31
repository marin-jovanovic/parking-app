const assert = require('chai').assert;
const ParkingPodatci = require('../tools/ParkingPodatci');

describe('LokacijaPodatci', async function(){
    it('Postoje dva parkinga sa istom lokacijom (moze se dogodit da neka tvrtka slucajno doda), pa se vraca samo jedna', async function(){
        //jelacic koordinate, ima dvije lokacije
        let parking = await ParkingPodatci.dohvatiParkingZaKoordinate(45.813264153294114, 15.977233094526218);
        assert.equal(parking.idlokacija, 36);
    });
});