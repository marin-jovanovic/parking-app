const assert = require('chai').assert;
const KorisnikPodatci = require('../tools/KorisnikPodatci');

describe('KorisnikPodatci', async function(){
    it('Trebao bi vratiti test', async function(){
        const vozac = await KorisnikPodatci.dohvatiVozacaPrekoUsernamea('testuser');
        assert.equal(vozac.imeVozac, 'test');
    });

    it('Trebao bi vratiti test', async function(){
        const vozac = await KorisnikPodatci.dohvatiVozacaPrekoUsernamea('testuser');
        assert.equal(vozac.prezimeVozac, 'test');
    });
});