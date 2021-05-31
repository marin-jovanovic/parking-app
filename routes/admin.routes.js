var express = require('express');
var router = express.Router();
const podaci = require('../tools/KorisnikPodatci');
const Vozac = require('../models/Vozac')
const Tvrtka = require('../models/Tvrtka')
const { body, validationResult } = require('express-validator');


router.get('/', getAdminStranica);

function getAdminStranica(req, res, next) {

    if (req.session.user !== undefined && req.session.user.razinaOvlasti > 1) {
        res.render('admin/admin', {
            title: 'Admin',
            user: req.session.user
        });
    }
}

router.get('/test',  async function(request, response){
    console.log("user.routes.js/ router.get/test")
    p = await podaci.dohvatiSveVozace();
    console.log(p);

    response.send(p);

});

router.post('/list_users', postListaKorisnika);

async function postListaKorisnika(req, res, next) {

    const errors = validationResult(req);
    if (errors.isEmpty()) {
        console.log(req.body.toString())
        vozac = new Vozac(req.body.username, req.body.oib, req.body.kartica, req.body.email, req.body.firstname, req.body.lastname, req.body.lozinka, 1);

        let provjera = await podaci.emailZauzetPromjena(req.body.email, req.body.username);
        if(provjera){
            result = await podaci.dohvatiSveVozace();
            res.render('admin/admin_pages/user', {
                title: 'ListUsers',
                user: req.session.user,
                vozaci: result,
                err: 'Email zauzet'
            });
            return;
        }

        await podaci.azurirajVozaca(vozac)

    }else{
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
        console.log(extractedErrors);
    }

    res.redirect('list_users');
}

router.get('/list_users', getListaKorisnika);

async function getListaKorisnika(req, res, next) {
    result = await podaci.dohvatiSveVozace();
    res.render('admin/admin_pages/user', {
        title: 'ListUsers',
        vozaci: result,
        user: req.session.user,
    });
    
}

router.post('/list_companies', postListaTvrtki);

async function postListaTvrtki(req, res, next) {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        console.log(req.body.toString())
        tvrtka = new Tvrtka(req.body.username, req.body.lozinka, req.body.oib, req.body.email, req.body.name, req.body.adresa, 1);    

        let provjera = await podaci.emailZauzetPromjena(req.body.email, req.body.username);
        if(provjera){
            result = await podaci.dohvatiSveTvrtke();
            res.render('admin/admin_pages/company', {
                title: 'ListCompanies',
                user: req.session.user,
                tvrtke: result,
                err: 'Email zauzet'
            });
            return;
        }

        await podaci.azurirajTvrtku(tvrtka)

    }else{
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
        console.log(extractedErrors);
    }

    res.redirect('list_companies');
}


router.get('/list_companies', getListaTvrtki);

async function getListaTvrtki(req, res, next) {
    result = await podaci.dohvatiSveTvrtke();
    res.render('admin/admin_pages/company', {
        title: 'ListCompanies',
        tvrtke: result,
        user: req.session.user
    });

}

router.get('/uredikorisnika/:korisnickoime', urediKorisnika);

async function urediKorisnika(req, res, next) {
    const result = await podaci.dohvatiVozacaPrekoUsernamea(req.params.korisnickoime);
    res.render('admin/admin_pages/editUser', {
        title: req.params.korisnickoime,
        vozac: result,
        user: req.session.user,
    });
}

router.get('/obrisikorisnika/:korisnickoime', obrisiKorisnika);

async function obrisiKorisnika(req, res, next) {
    await podaci.ukloniKorisnika(req.params.korisnickoime);
    res.redirect('./../list_users')
}

router.get('/ureditvrtku/:imetvrtke', urediTvrtku);

async function urediTvrtku(req, res, next) {
    const result = await podaci.dohvatiTvrtkuPrekoUsernamea(req.params.imetvrtke);
    res.render('admin/admin_pages/editCompany', {
        title: req.params.imetvrtke,
        tvrtka: result,
        user: req.session.user,
    });
}

router.get('/obrisitvrtku/:imetvrtke', obrisiTvrtku);

async function obrisiTvrtku(req, res, next) {
    await podaci.ukloniTvrtku(req.params.imetvrtke);
    res.redirect('./../list_companies')
}


module.exports = router;
