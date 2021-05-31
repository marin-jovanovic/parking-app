var express = require('express');
var router = express.Router();
const Vozac = require('../models/Vozac');
const Tvrtka = require('../models/Tvrtka');
const KorisnikPodatci = require('../tools/KorisnikPodatci');
const VoziloPodatci = require('../tools/VoziloPodatci');
const ParkingPodatci = require('../tools/ParkingPodatci');
const RezervacijaPodatci = require('../tools/RezervacijaPodatci');
const { body, validationResult } = require('express-validator');
const Vozilo = require('../models/Vozilo');
// const Funkcija = require('../trash/funkcije');
const NodeGeocoder = require('node-geocoder');
const db = require('../database');

const options = {
    provider: 'mapquest',
   
    // Optional depending on the providers
    apiKey: 'GaChD0TaZeX2GSJceNxCou3TuUSkiGeH', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
  };
  
  
   
  const geocoder = NodeGeocoder(options);
  
//   router.get('/', async function (req, res, next) {
//       let loc;
//       try{
//           loc = await geocoder.geocode('put simunova 15 zadar');
//           console.log(loc);
//       }catch(err){
//           console.log("EROR " + err)
//       }
//       res.render('home', {
//           title: 'Home',
//           loc: loc[0]
//       });
//   });
  
  
//   funkcija = async function(){
//       const sql = `select * from parking where idparking = $1`;
//       const values =['4']
//       try {
//           const result = await db.query(sql, values);
//           return result.rows;
//       } catch (err) {
//           console.log(err);
//           throw err
//       }
//   }

router.get('/', dohvatiPocetnuStranicu);

function dohvatiPocetnuStranicu(req, res, next){
        // let pageInfo = {

        // };
        // pageInfo.funkcija = Funkcija;

        res.render('home', {
            title: 'Home',
            user: undefined
        });
}

router.get('/company' , function(req, res, next) {
    res.render('company/mainSiteCompany', {
        title: 'Company',
        user: req.session.user
    });
});

// router.get('/user' , async function(req, res, next) {

  
//     res.render('user/mainSiteUser', {
//         title: 'User',
//         user: req.session.user
//         });
// });


router.get('/admin' , function(req, res, next) {
    res.render('admin/admin', {
        title: 'Admin',
        user: req.session.user
    });
});

router.post('/registeruser', [
    body('username').not().isEmpty().trim().escape().withMessage("Korisnicko ime ne smije biti prazno!"),
    body('email').isEmail().escape().withMessage("Email mora bit pravi email!"),
    body('password1').trim().isLength({min: 6, max:15}).escape().withMessage("Lozinka mora biti izmedu 6 i 15 znakova!") ,
    body('oib').trim().isLength({min:11, max:11}).escape().withMessage("oib mora bit dugacak 11 znakova!"),
    body('automobil').trim().not().isEmpty().escape().withMessage("Registracija vozila ne smije biti prazna!")
], postRegistrirajVozaca);

router.post('/registercompany',[
    body('username').not().isEmpty().trim().escape().withMessage("Ime tvrtke ne smije biti prazno!"),
    body('email').isEmail().escape().withMessage("Email mora biti pravi email!"),
    body('password1').trim().isLength({min: 6, max:15}).escape().withMessage("Lozinka mora biti izmedu 6 i 15 znakova!") ,
    body('oib').trim().isLength({min:11, max:11}).escape().withMessage("oib mora bit dugacak 11 znakova!")
] , postRegistrirajTvrtku);

router.post('/user', postPrijava);


router.get('/logout', async function (req, res, next) {
    req.session.user = undefined;
    req.session.destroy((err) => {
    
        if(err) {
          //report possible error
          console.log(err)
        }
        else {
            res.redirect('./');
        }
      })
    
    
});

function postPrijava(req, res, next){
    (async () => {

       
            let korisnik = await KorisnikPodatci.dohvatiVozacaPrekoUsernamea(req.body.username);
            console.log(korisnik)


            //ako je korisnik undefined, to znaci da korisnik nije vozac, nego je tvrtka ili taj username ne postoji
            if(korisnik === undefined){

                let loc = "err bacaj";

                try{
                    loc = await geocoder.geocode('put simunova 15 zadar');
                    console.log(loc);
                }catch(err){
                    console.log("EROR " + err)
                }
             
                korisnik = await KorisnikPodatci.dohvatiTvrtkuPrekoUsernamea(req.body.username);

                //ako korisnik sad nije undefined to znaci da je tvrtka
                if (korisnik !== undefined) {

                    if (KorisnikPodatci.provjeriLozinku(req.body.password, korisnik.lozinkaKorisnik)) {

                        req.session.user = korisnik

                        console.log ("Successful log in!");
            
                          
                        
                        let parkinzi = await ParkingPodatci.dohvatiParkingeZaTvrtku(req.session.user.korisnickoIme);
                        res.render('company/mainSiteCompany', {
                            title: 'Company',
                            user: req.session.user,
                            loc: loc[0],
                            parkinzi: parkinzi,
                        });
                        return;
                    } else {
                        console.log("Netocna lozinka!");
                        res.render('home', {
                            title: 'Home',
                            user: undefined,
                            err: "Netocna lozinka!"
                        })
                        return
                    }
                }



            }

            //ovo je u slucaju da je korisnik vozac
            if (korisnik !== undefined) {

                

                if (KorisnikPodatci.provjeriLozinku(req.body.password, korisnik.lozinkaKorisnik)) {
                    console.log ("Successful log in!");

                    if (korisnik.razinaOvlasti > 1) {
                        console.log('ADMIN')
                        res.render('admin/admin', {
                            title: 'Admin',
                            user: req.session.user,
                        });
                        return;
                    }

                    req.session.user = korisnik;
                    let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
                    let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
                    console.log("LOADING USER SITE")
                    res.render('user/mainSiteUser', {
                        title: 'User',
                        user: req.session.user,
                        vozila: vozila,
                        rezervacije: rezervacije
                    });
                    return;
                } else {
                    console.log("Netocna lozinka!");
                    res.render('home', {
                        title: 'Home',
                        user: undefined,
                        err: "Netocna lozinka!"
                    })
                    return
                }
            } else {
                console.log("Korisnicko ime nije pronadjeno!");
                res.render('home', {
                    title: 'Home',
                    user: undefined,
                    err: "Korisnicko ime nije pronadjeno!"
                })
                return
            }

        
        })();
    }

    function postRegistrirajVozaca(req, res, next){
        (async () => {

            const errors = validationResult(req);
            if (errors.isEmpty()) {
            
                console.log(req.body.toString())
                vozac = new Vozac(req.body.username, req.body.oib, req.body.kredkartica, req.body.email, req.body.name, req.body.surname, req.body.password1, 1);
                //const sql = `insert into vozac values('${vozac.korisnickoIme}', '${vozac.OIBkorisnik}', '${vozac.brojKredKartice}', '${vozac.emailKorisnik}', '${vozac.imeVozac}', '${vozac.prezimeVozac}', '${vozac.lozinkaVozac}', 1)`
                //console.log(sql);

                let provjera1 = await KorisnikPodatci.korisnickoImeZauzeto(req.body.username);
                if(provjera1){
                    res.render('home', {
                        title: 'Register a new user',
                        user: req.session.user,
                        err: 'Korisničko ime zauzeto'
                    });
                    return;
                }

                let provjera2 = await KorisnikPodatci.emailZauzet(req.body.email);
                if(provjera2){
                    res.render('home', {
                        title: 'Register a new user',
                        user: req.session.user,
                        err: 'Email zauzet'
                    });
                    return;
                }


                if(req.body.password1 != req.body.password2){
                    res.render('home', {
                        title: 'Register a new user',
                        user: req.session.user,
                        err: 'Lozinke se ne podudaraju'
                    });
                    return;
                }
                await vozac.registracija();

                req.session.user = vozac;
                vozilo = new Vozilo(req.body.automobil, req.session.user);
                await VoziloPodatci.dodajVozilo(vozilo, req.session.user);
                let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
                let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
                res.render('user/mainSiteUser', {
                    title: 'User',
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije
                });
            }else{
                const extractedErrors = [];
                errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
                console.log(extractedErrors);

                
                res.render('home', {
                    title: 'Register a new user',
                    errors: extractedErrors
                });
            }
        })();
    
    }

    router.get('/registeruser', async function(req, res, next){
        let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
            title: 'User',
            user: req.session.user,
            vozila: vozila,
            rezervacije: rezervacije
        });
        return;
    });

    function postRegistrirajTvrtku(req, res, next){
        (async () => {

            const errors = validationResult(req);
            if (errors.isEmpty()) {

                let tvrtka = new Tvrtka(req.body.username, req.body.password1, req.body.oib, req.body.email, req.body.username, req.body.address, 1);

                let provjera1 = await KorisnikPodatci.korisnickoImeZauzeto(req.body.username);
                if(provjera1){
                    res.render('home', {
                        title: 'Register a new company',
                        user: req.session.user,
                        err: 'Korisničko ime zauzeto'
                    });
                    return;
                }

                let provjera2 = await KorisnikPodatci.emailZauzet(req.body.email);
                if(provjera2){
                    res.render('home', {
                        title: 'Register a new company',
                        user: req.session.user,
                        err: 'Email zauzet'
                    });
                    return;
                }

                if(req.body.password1 != req.body.password2){
                    res.render('home', {
                        title: 'Register a new company',
                        user: req.session.user,
                        err: "Lozinke se ne podudaraju"
                    });
                    return;
                }
                await tvrtka.registracija();

                req.session.user = tvrtka;
                let parkinzi = await ParkingPodatci.dohvatiParkingeZaTvrtku(req.session.user.korisnickoIme);
                res.render('company/mainSiteCompany', {
                    title: 'Company',
                    user: req.session.user,
                    parkinzi: parkinzi
                });
            }else{
                const extractedErrors = [];
                errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
                console.log(extractedErrors);


                res.render('home', {
                    title: 'Register a new company',
                    errors: extractedErrors
                });
            }
        })();
}

module.exports = router;
