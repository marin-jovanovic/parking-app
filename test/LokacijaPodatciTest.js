const assert = require('chai').assert;
const LokacijaPodatci = require('../tools/LokacijaPodatci');
const Lokacija = require('../models/Lokacija')

describe('LokacijaPodatci', async function(){
    it('Trebao bi vratiti 36', async function(){
        lokacijaBezId = new Lokacija('trg bana josipa jelacica', 45.813264153294114, 15.977233094526218);
        const lokacija= await LokacijaPodatci.dohvatiIdLokacije(lokacijaBezId);
        assert.equal(lokacija[0].idlokacija, 36);
    });
});