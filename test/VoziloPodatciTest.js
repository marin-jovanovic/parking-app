const assert = require('chai').assert;
const VoziloPodatci = require('../tools/VoziloPodatci');
const KorisnikPodatci = require('../tools/KorisnikPodatci');
const Vozilo = require('../models/Vozilo')
const chai = require('chai')
const expect = chai.expect
chai.use(require('chai-as-promised'))

describe('VoziloPodatci', async function(){
    it('Trebao bi vratiti test, auto1, auto2', async function(){
        vozac = await KorisnikPodatci.dohvatiVozacaPrekoUsernamea('testuser')
        const vozila = await VoziloPodatci.dohvatiVozila(vozac);
        assert.equal(vozila[0].registracija, 'test');
        assert.equal(vozila[1].registracija, 'auto1');
        assert.equal(vozila[2].registracija, 'auto2');
    });

    it('Trebao bi vratiti 4, 3, noviauto', async function(){
        vozac = await KorisnikPodatci.dohvatiVozacaPrekoUsernamea('testuser')
        vozilo = new Vozilo('noviauto', vozac);
        await VoziloPodatci.dodajVozilo(vozilo, vozac);
        let vozila = await VoziloPodatci.dohvatiVozila(vozac);
        assert.equal(vozila.length, 4);
        await VoziloPodatci.ukloniVozilo(vozac, 'noviauto');
        vozila = await VoziloPodatci.dohvatiVozila(vozac);
        assert.equal(vozila.length, 3);
    });

    it('Trebao bi biti error', async function(){
        vozac = await KorisnikPodatci.dohvatiVozacaPrekoUsernamea('testuser')
        vozilo = new Vozilo('   ', vozac);
        await expect(VoziloPodatci.dodajVozilo(vozilo, vozac)).to.be.rejectedWith(Error)
    });

});