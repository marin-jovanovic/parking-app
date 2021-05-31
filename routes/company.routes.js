var express = require('express');
var router = express.Router();
const ParkingPodatci = require('../tools/ParkingPodatci');
const KorisnikPodatci = require('../tools/KorisnikPodatci');
const Parking = require('../models/Parking');
const Tvrtka = require('../models/Tvrtka');
const Lokacija = require('../models/Lokacija');
const { body, validationResult } = require('express-validator');

router.get('/', prikaziStranicuTvrtke);


function prikaziStranicuTvrtke(req, res, next) {
    
    res.render('company/mainSiteCompany', {
        title: 'Company',
        user: req.session.user
    });

}

router.get('/ukloniparking/:parking', ukloniParking);

router.get('/natrag', vratiNatragTvrtka);

async function vratiNatragTvrtka(req, res, next){
    let parkinzi = await ParkingPodatci.dohvatiParkingeZaTvrtku(req.session.user.korisnickoIme);
    res.render('company/mainSiteCompany', {
        title: 'Company',
        user: req.session.user,
        parkinzi: parkinzi
    });
    return;
}

async function ukloniParking(req, res, next) {
    console.log("IME USERA "+ req.session.user.korisnickoIme);
    console.log("PARKING " + req.params.parking);
    let uklonjenParking = await ParkingPodatci.ukloniParking(req.params.parking);
    let parkinzi = await ParkingPodatci.dohvatiParkingeZaTvrtku(req.session.user.korisnickoIme);
    res.render('company/mainSiteCompany', {
      title: 'company',
      user: req.session.user,
      parkinzi: parkinzi
  })
}

router.post('/tvrtkapodatci',  [
    body('companyname').trim().not().isEmpty().escape().withMessage("Puno ime tvrtke ne smije biti prazno!"),
    body('address').trim().not().isEmpty().escape().withMessage("Adresa ne smije biti prazna!"),
    body('email').isEmail().escape().withMessage("Email mora bit pravi email!"),
    body('password1').trim().isLength({min: 6, max:15}).escape().withMessage("Lozinka mora biti izmedu 6 i 15 znakova!") ,
    body('oib').trim().isLength({min:11, max:11}).escape().withMessage("oib mora bit dugacak 11 znakova!")
], postOsobniPodatci);

router.post('/dodaj_parkiralisnu_p', dodajParking);

async function dodajParking(req, res, next) {

    if(!req.body.sirina || !req.body.duzina){
        let parkinzi = await ParkingPodatci.dohvatiParkingeZaTvrtku(req.session.user.korisnickoIme);
        res.render('company/mainSiteCompany', {
            title: 'Company',
            user: req.session.user,
            parkinzi: parkinzi,
            err1: "Morate oznaciti lokaciju parkinga markerom!"
        });
        return;
    }

    if(isNaN(req.body.pp_count)){
        let parkinzi = await ParkingPodatci.dohvatiParkingeZaTvrtku(req.session.user.korisnickoIme);
        res.render('company/mainSiteCompany', {
            title: 'Company',
            user: req.session.user,
            parkinzi: parkinzi,
            err1: "Nepravilno zadan broj parkirnih mjesta!"
        });
        return;
    }

    if(isNaN(req.body.cijenaposatu)){
        let parkinzi = await ParkingPodatci.dohvatiParkingeZaTvrtku(req.session.user.korisnickoIme);
        res.render('company/mainSiteCompany', {
            title: 'Company',
            user: req.session.user,
            parkinzi: parkinzi,
            err1: "Nepravilno zadana cijena parkinga!"
        });
        return;
    }
    
    lokacija = new Lokacija(req.body.address, req.body.sirina, req.body.duzina);
    parking = new Parking(req.body.pp_count, req.body.pp_count, req.body.cijenaposatu, req.session.user, lokacija);

    result = await ParkingPodatci.dodajParking(parking);

    console.log(result);
    let parkinzi = await ParkingPodatci.dohvatiParkingeZaTvrtku(req.session.user.korisnickoIme);
    res.render('company/dodanparking', {
        title: 'Company',
        user: req.session.user,
        parkinzi: parkinzi
    });

}

async function postOsobniPodatci(req, res, next) {

    const errors = validationResult(req);
    let parkinzi = await ParkingPodatci.dohvatiParkingeZaTvrtku(req.session.user.korisnickoIme);
    if (errors.isEmpty()) {
        let tvrtka = new Tvrtka(req.session.user.korisnickoIme, req.body.password1, req.body.oib, req.body.email, req.body.companyname, req.body.address, 1);
        console.log("AAA" + tvrtka.imeTvrtka);
        if(req.body.password1 != req.body.password2){
            console.log("LOZINKE SE NE POKLAPAJU!!!")
            res.render('company/mainSiteCompany', {
                title: 'user',
                user: req.session.user,
                err: 'Lozinke se ne podudaraju',
                parkinzi: parkinzi
            });
            return;
        }
        await KorisnikPodatci.azurirajTvrtku(tvrtka);
        let novaTvrtka = await KorisnikPodatci.dohvatiTvrtkuPrekoUsernamea(req.session.user.korisnickoIme);
        req.session.user = novaTvrtka;
        console.log(req.session.user)
        res.render('company/mainSiteCompany', {
            title: 'company',
            user: req.session.user,
            parkinzi: parkinzi
        });
        return;
    }else{
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
        console.log(extractedErrors);
                res.render('company/mainSiteCompany', {
                    title: 'User',
                    errors1: extractedErrors,
                    user: req.session.user,
                    parkinzi: parkinzi
                });
    }
}

module.exports = router;