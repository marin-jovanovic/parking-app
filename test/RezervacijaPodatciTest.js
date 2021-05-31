const assert = require('chai').assert;
const RezervacijaPodatci = require('../tools/RezervacijaPodatci');
const KorisnikPodatci = require('../tools/KorisnikPodatci');


describe('RezervacijaPodatci', async function(){
    it('Trebao bi vratiti sava, tvrtka, 500, test', async function(){
        vozac = await KorisnikPodatci.dohvatiVozacaPrekoUsernamea('testuser')
        rezervacije = await RezervacijaPodatci.dohvatiRezervacije(vozac);
        assert.equal(rezervacije[0].adresalokacija, 'sava');
        assert.equal(rezervacije[0].korisnickoimetvrtke, 'tvrtka');
        assert.equal(rezervacije[0].kapacitet, 500);
        assert.equal(rezervacije[0].registracija, 'test');
    });
});