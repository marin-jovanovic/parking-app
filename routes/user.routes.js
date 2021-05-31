var express = require('express');
const KorisnikPodatci = require('../tools/KorisnikPodatci');
const Vozac = require('../models/Vozac');
const Rezervacija = require('../models/Rezervacija');
const Vozilo = require('../models/Vozilo');
var router = express.Router();
const VoziloPodatci = require('../tools/VoziloPodatci');
const { body, validationResult } = require('express-validator');

const { ispisiLokacije } = require('../tools/LokacijaPodatci');
const { dohvatiParkinge } = require('../tools/ParkingPodatci');
const ParkingPodatci = require('../tools/ParkingPodatci');
const RezervacijaPodatci = require('../tools/RezervacijaPodatci');
const { ukloniRezervaciju } = require('../tools/RezervacijaPodatci');


router.get('/test',  dohvatiTrenutneParkinge);

async function dohvatiTrenutneParkinge(request, response){
    console.log("user.routes.js/ router.get/test")
    p = await dohvatiParkinge();

    response.send(p);

}

router.get('/natrag', vratiNatrag);
router.get('/registeruser', vratiNatrag);
router.get('/natrag', vratiNatrag);



router.get('/get_locations/:registracija', dohvatiParkingeUTerminu);

async function dohvatiParkingeUTerminu(req, res) {
    // console.log("IME USERA "+ req.session.user.korisnickoIme);
    // console.log("REGISTRACIJA " + req.params.registracija);
    // console.log(request.params.registracija);
    console.log(req.params.registracija);

    // let uklonjenoVozilo = await VoziloPodatci.ukloniVozilo(req.session.user, req.params.registracija);
    // let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
    // let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
//     res.render('user/mainSiteUser', {
//       title: 'user',
//       vozila: vozila,
//       user: req.session.user,
//       rezervacije: rezervacije
//   })
    let split = req.params.registracija.split(";");
    if(!split[0]){
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
                errmsg: "Morate zadati datum!",
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
        });
    }else{
        let wrapper = Date.parse(split[0]);
        if(isNaN(wrapper)){
            let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
                errmsg: "Morate zadati pravilan datum!",
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
        });
        }
    }
    if(parseInt(split[1]) < 0 || parseInt(split[1]) > 24 || isNaN(split[1]) || !split[1]){
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
                errmsg: "Broj sati mora biti izmedu 0 i 24!",
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
        });
    }
    if(parseInt(split[3]) < 0 || parseInt(split[3]) > 24 || isNaN(split[3]) || !split[3]){
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
                errmsg: "Broj sati mora biti izmedu 0 i 24!",
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
        });
    }
        if(parseInt(split[2]) < 0 || parseInt(split[2]) > 60 || isNaN(split[2]) || !split[2]){
            let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
            res.render('user/mainSiteUser', {
                    errmsg: "Broj minuta mora biti izmedu 0 i 60!",
                    title: 'User',
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije
            });
        }
        if(parseInt(split[4]) < 0 || parseInt(split[4]) > 60 || isNaN(split[4]) || !split[4]){
            let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
            res.render('user/mainSiteUser', {
                    errmsg: "Broj minuta mora biti izmedu 0 i 60!",
                    title: 'User',
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije
            });
        }

    temp = Date.parse(split[0]);
    console.log(temp)
    pickedDate = new Date(0);
    pickedDate.setUTCMilliseconds(temp + 3600000);
    realDate = new Date(pickedDate.getFullYear(), pickedDate.getMonth(), pickedDate.getDate(), parseInt(split[1]), parseInt(split[2]), 0, 0);
    console.log("REAL DATE " + realDate);
    currentDate = new Date();
    if(currentDate.getFullYear() == realDate.getFullYear() &&
        currentDate.getMonth() == realDate.getMonth() &&
        currentDate.getDate() == realDate.getDate()){
            console.log("AA " + realDate.getHours() + " " + (parseInt(currentDate.getHours()) + 6))
            if(parseInt(realDate.getHours()) < (parseInt(currentDate.getHours()) + 6)){
                console.log("RAZLIKE NIJE 6 SATI ")
                console.log(realDate);
                console.log(currentDate);
                res.send("Rezervacija mora biti 6 sati unaprijed!");
                return;
            }else if(parseInt(realDate.getHours()) == (parseInt(currentDate.getHours()) + 6)){
                if(parseInt(realDate.getMinutes()) < (parseInt(currentDate.getMinutes()))){
                    console.log("RAZLIKA NIJE 6 SATI")
                    console.log(realDate);
                    console.log(currentDate);
                    res.send("Rezervacija mora biti 6 sati unaprijed!");
                    return;
                }else{
                    console.log("OK")
                }
            }else{
                console.log("OK")
            }
    }else if(currentDate.getFullYear() == realDate.getFullYear() &&
    currentDate.getMonth() == realDate.getMonth() &&
    currentDate.getDate() + 1 == realDate.getDate()){
        console.log("AAAAAAAAa")
        let tempHours;
        if(parseInt(realDate.getHours()) < (parseInt(currentDate.getHours()) + 6)){
            tempHours =  realDate.getHours() + 24;
            console.log(tempHours);
            console.log("zzz "+ (parseInt(realDate.getHours()) + 24 - (parseInt(currentDate.getHours()))));
            if((parseInt(realDate.getHours()) + 24 - (parseInt(currentDate.getHours())) < 6)){
                console.log("RAZLIKE NIJE 6 SATI ")
                console.log(realDate);
                console.log(currentDate);
                res.send("Rezervacija mora biti 6 sati unaprijed!");
                return;
            }else if((parseInt(realDate.getHours()) + 24 - (parseInt(currentDate.getHours())) == 6)){
                if(parseInt(realDate.getMinutes()) < (parseInt(currentDate.getMinutes()))){
                    console.log("RAZLIKA NIJE 6 SATI")
                    console.log(realDate);
                    console.log(currentDate);
                    res.send("Rezervacija mora biti 6 sati unaprijed!");
                    return;
                }else{
                    console.log("OK")
                }
            }else{
                console.log("OK")
            }
        }
    }

    let krajMillis = parseInt(split[3]) * 3600000 + parseInt(split[4]) * 60000;
    console.log(krajMillis)
    let krajVrijeme = krajMillis + realDate.getTime();
    console.log(krajVrijeme)
    krajDatum = new Date(0);
    krajDatum.setUTCMilliseconds(krajVrijeme)
    rezervacija = new Rezervacija(0, 0, realDate, krajDatum, null, req.session.user, null);
    console.log(rezervacija.pocetakrezervacije);
    console.log(rezervacija.krajrezervacije);

    let parkinzi = await ParkingPodatci.dohvatiSveParkinge();

    let dostupni = [];

// 

    for(let i = 0; i < parkinzi.length; i++){
        let r = new Rezervacija(0, 0, realDate, krajDatum, null, req.session.user, parkinzi[i].idparking);
        let brojZauzetihMjesta = await RezervacijaPodatci.dohvatiBrojZauzetihMjesta(r);
        console.log(brojZauzetihMjesta);
        if(parkinzi[i].kapacitet - brojZauzetihMjesta > 0){
            dostupni.push(parkinzi[i]);
            console.log("PUSHED");
        }
    }

    res.send(dostupni);

}

router.post('/vozacpodatci',  [
    body('email').isEmail().escape().withMessage("Email mora bit pravi email!"),
    body('oib').trim().isLength({min:11, max:11}).escape().withMessage("oib mora bit dugacak 11 znakova!")
], postOsobniPodatci);

router.post('/napravirezervaciju', postNapraviRezervaciju);

router.post('/dodajAuto',
[body('noviAuto').trim().not().isEmpty().isLength({min:1, max: 15}).escape().withMessage("Registracija vozila ne smije biti prazna!")] 
,postDodajAuto);

router.get('/', getVozacStranica);

router.get('/showCars')

router.get('/uklonivozilo/:registracija', ukloniVozilo);

async function ukloniVozilo(req, res, next) {
    console.log("IME USERA "+ req.session.user.korisnickoIme);
    console.log("REGISTRACIJA " + req.params.registracija);
    await VoziloPodatci.ukloniVozilo(req.session.user, req.params.registracija);
    let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
    let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
    res.render('user/mainSiteUser', {
      title: 'user',
      vozila: vozila,
      user: req.session.user,
      rezervacije: rezervacije
  })

}

router.get('/uklonirezervaciju/:rezervacija', izbrisiRezervaciju);
router.get('/dodajAuto', vratiNatrag);
router.get('/vozacpodatci', vratiNatrag);

async function izbrisiRezervaciju(req, res, next) {
    console.log("IME USERA "+ req.session.user.korisnickoIme);
    console.log("REZERVACIJA " + req.params.rezervacija);
    await RezervacijaPodatci.ukloniRezervaciju(req.params.rezervacija);
    let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
    let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
    console.log("!123 " + rezervacije)
    res.render('user/mainSiteUser', {
      title: 'user',
      vozila: vozila,
      user: req.session.user,
      rezervacije: rezervacije
  })

}

async function postDodajAuto(req, res, next) {
    console.log("JA SAM SAD UNUTAR DODAJ AUTO")
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        vozilo = new Vozilo(req.body.noviAuto, req.session.user);
        let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
        for(let i = 0; i < vozila.length; i++){
            if(vozila[i].registracija == vozilo.registracija){
                res.render('user/mainSiteUser', {
                    title: 'User',
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije,
                    careerr: "error"
                });
            }
        }
        vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
        await VoziloPodatci.dodajVozilo(vozilo, req.session.user);
        res.render('user/dodanovozilo', {
            title: 'User',
            user: req.session.user,
            vozila: vozila,
            rezervacije: rezervacije
        });
        return;
    }else{
        const extractedErrors = [];
                errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
                console.log(extractedErrors);
                let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
                let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
                res.render('user/mainSiteUser', {
                    title: 'User',
                    errors2: extractedErrors,
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije
                });
    }
}

async function postOsobniPodatci(req, res, next) {

    const errors = validationResult(req);
    let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
    if (errors.isEmpty()) {
        let vozac;
        if(!req.body.password1){
            vozac = new Vozac(req.session.user.korisnickoIme, req.body.oib, req.body.kredkartica, req.body.email, req.body.name, req.body.surname, req.session.user.lozinkaKorisnik, 1);
        }else{
            if(req.body.password1.length > 15 || req.body.password1.length < 6){
                let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
                res.render('user/mainSiteUser', {
                    title: 'user',
                    user: req.session.user,
                    err: 'Lozinka mora imati izmedu 6 i 15 znakova!',
                    vozila: vozila,
                    rezervacije: rezervacije
                });
            return;
            }
            vozac = new Vozac(req.session.user.korisnickoIme, req.body.oib, req.body.kredkartica, req.body.email, req.body.name, req.body.surname, req.body.password1, 1);
        }
        console.log("AAA" + vozac.lozinkaKorisnik);
        if(req.body.password1 != req.body.password2){
            console.log("LOZINKE SE NE POKLAPAJU!!!")
            let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
            res.render('user/mainSiteUser', {
                title: 'user',
                user: req.session.user,
                err: 'Lozinke se ne podudaraju',
                vozila: vozila,
                rezervacije: rezervacije
            });
            return;
        }
        await KorisnikPodatci.azurirajVozaca(vozac);
        let noviVozac = await KorisnikPodatci.dohvatiVozacaPrekoUsernamea(req.session.user.korisnickoIme);
        req.session.user = noviVozac;
        console.log(req.session.user)
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
            title: 'user',
            user: req.session.user,
            vozila: vozila,
            rezervacije: rezervacije
        });
        return;
    }else{
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
        console.log(extractedErrors);
        let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
                res.render('user/mainSiteUser', {
                    title: 'User',
                    errors1: extractedErrors,
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije
                });
    }
}


async function getVozacStranica(req, res, next) {
    let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
    let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
    res.render('user/mainSiteUser', {
        title: 'User',
        user: req.session.user,
        rezervacije: rezervacije,
        vozila: vozila
    });
}

async function vratiNatrag(req, res, next){
    let vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
    let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
    res.render('user/mainSiteUser', {
        title: 'User',
        user: req.session.user,
        vozila: vozila,
        rezervacije: rezervacije
    });
    return;
}

async function postNapraviRezervaciju(req, res, next) {
    vozila = await VoziloPodatci.dohvatiVozila(req.session.user);
    console.log("DURATIONMIIN " + req.body.durationmin);
    if(!req.body.startDateTemp){
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
                errmsg: "Morate zadati datum!",
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
        });
    }else{
        let wrapper = Date.parse(req.body.startDateTemp);
        if(isNaN(wrapper)){
            let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
                errmsg: "Morate zadati pravilan datum!",
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
        });
        }
    }
    if(parseInt(req.body.starthr) < 0 || parseInt(req.body.starthr) > 24  || isNaN(req.body.starthr) || !req.body.starthr){
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
                errmsg: "Broj sati mora biti izmedu 0 i 24!",
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
        });
    }
    if(parseInt(req.body.startmin) < 0 || parseInt(req.body.startmin) > 60 || isNaN(req.body.startmin) || !req.body.startmin){
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
                errmsg: "Broj minuta mora biti izmedu 0 i 60!",
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
        });
    }
    if(!req.body.trajno){
        if(parseInt(req.body.durationhr) < 0 || parseInt(req.body.durationhr) > 24 || isNaN(req.body.durationhr) || !req.body.durationhr){
            let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
            res.render('user/mainSiteUser', {
                    errmsg: "Broj sati mora biti izmedu 0 i 24!",
                    title: 'User',
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije
            });
        }
        if(parseInt(req.body.durationmin) < 0 || parseInt(req.body.durationmin) > 60 || isNaN(req.body.durationmin) || !req.body.durationmin){
            let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
            res.render('user/mainSiteUser', {
                    errmsg: "Broj minuta mora biti izmedu 0 i 60!",
                    title: 'User',
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije
            });
        }
    }
    if(req.body.ponavljajuce && isNaN(parseInt(req.body.brputa))){
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
            res.render('user/mainSiteUser', {
                    errmsg: "Broj puta ponavljanja netocno dodan!",
                    title: 'User',
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije
            });
    }
    console.log("++++++++++++++++++++++++++")
    console.log("BODY " + req.body.start +" " + req.body.startDateTemp);
    console.log("++++++++++++++++++++++++++")
    if((parseFloat(req.body.sirina > 0) && (parseFloat(req.body.sirina > 0))) == false){
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
                errmsg: "Morate izabrati lokaciju!",
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
        });
    }
    starthr = req.body.starthr;
    startmin = req.body.startmin;
    temp = Date.parse(req.body.startDateTemp);
    // console.log(temp.getFullYear());
    // console.log(temp.getMonth());
    // console.log(temp.getDate());
    pickedDate = new Date(0);
    pickedDate.setUTCMilliseconds(temp + 3600000);
    realDate = new Date(pickedDate.getFullYear(), pickedDate.getMonth(), pickedDate.getDate(), parseInt(starthr), parseInt(startmin), 0, 0);
    console.log("REAL DATE " + realDate);
    currentDate = new Date();
    let parking = await ParkingPodatci.dohvatiParkingZaKoordinate(req.body.sirina, req.body.duzina)
    if(currentDate.getFullYear() == realDate.getFullYear() &&
        currentDate.getMonth() == realDate.getMonth() &&
        currentDate.getDate() == realDate.getDate()){
            console.log("AA " + realDate.getHours() + " " + (parseInt(currentDate.getHours()) + 6))
            if(parseInt(realDate.getHours()) < (parseInt(currentDate.getHours()) + 6)){
                console.log("RAZLIKE NIJE 6 SATI ")
                console.log(realDate);
                console.log(currentDate);
                let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
                res.render('user/mainSiteUser', {
                    errmsg: "Rezervacija mora biti napravljena 6 sati unaprijed 1",
                    title: 'User',
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije
                });
                return;
            }else if(parseInt(realDate.getHours()) == (parseInt(currentDate.getHours()) + 6)){
                if(parseInt(realDate.getMinutes()) < (parseInt(currentDate.getMinutes()))){
                    console.log("RAZLIKA NIJE 6 SATI")
                    console.log(realDate);
                    console.log(currentDate);
                    let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
                    res.render('user/mainSiteUser', {
                        errmsg: "Rezervacija mora biti napravljena 6 sati unaprijed 2",
                        title: 'User',
                        user: req.session.user,
                        vozila: vozila,
                        rezervacije: rezervacije
                    });
                    return;
                }else{
                    console.log("OK")
                }
            }else{
                console.log("OK")
            }
    }else if(currentDate.getFullYear() == realDate.getFullYear() &&
    currentDate.getMonth() == realDate.getMonth() &&
    currentDate.getDate() + 1 == realDate.getDate()){
        console.log("AAAAAAAAa")
        let tempHours;
        if(parseInt(realDate.getHours()) < (parseInt(currentDate.getHours()) + 6)){
            tempHours =  realDate.getHours() + 24;
            console.log(tempHours);
            console.log("zzz "+ (parseInt(realDate.getHours()) + 24 - (parseInt(currentDate.getHours()))));
            if((parseInt(realDate.getHours()) + 24 - (parseInt(currentDate.getHours())) < 6)){
                console.log("RAZLIKE NIJE 6 SATI ")
                console.log(realDate);
                console.log(currentDate);
                let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
                res.render('user/mainSiteUser', {
                    errmsg: "Rezervacija mora biti napravljena 6 sati unaprijed 3",
                    title: 'User',
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije
                });
                return;
            }else if((parseInt(realDate.getHours()) + 24 - (parseInt(currentDate.getHours())) == 6)){
                if(parseInt(realDate.getMinutes()) < (parseInt(currentDate.getMinutes()))){
                    console.log("RAZLIKA NIJE 6 SATI")
                    console.log(realDate);
                    console.log(currentDate);
                    let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
                    res.render('user/mainSiteUser', {
                        errmsg: "Rezervacija mora biti napravljena 6 sati unaprijed 4",
                        title: 'User',
                        user: req.session.user,
                        vozila: vozila,
                        rezervacije: rezervacije
                    });
                    return;
                }else{
                    console.log("OK")
                }
            }else{
                console.log("OK")
            }
        }
    }
    let vozilo = new Vozilo(req.body.cars, req.session.user.korisnickoIme);
    let krajDatum;
    let rezervacija;
    if(req.body.ponavljajuce){
        if(req.body.trajno){
            let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
            res.render('user/mainSiteUser', {
                errmsg: "Rezervacija ne moze biti i trajna i ponavljajuca",
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
            });
            return;
        }else{
            let brojPonavljanja = parseInt(req.body.brputa);
            let rezervacije = [];
            console.log("BROJ NPONAVLJANJA " + brojPonavljanja)
            success =  Math.floor(Math.random() * Math.floor(100));
            if(success < 20){
                res.render('user/naplata', {
                    title: 'User',
                    user: req.session.user,
                    vozila: vozila,
                    rezervacije: rezervacije,
                    err: "Naplata nije uspjela"
                });
                return;
            }
            for(let i = 0; i < brojPonavljanja; i++){
                console.log("startmin " + req.body.startmin);
                let startTime = realDate.getTime() + i * 7 * 24 * 60 * 60 * 1000;
                let krajMillis = parseInt(req.body.durationhr) * 3600000 + parseInt(req.body.durationmin) * 60000;
                console.log(krajMillis)
                let krajVrijeme = krajMillis + startTime;
                console.log(krajVrijeme)
                krajDatum = new Date(0);
                pocetakDatum = new Date(0);
                pocetakDatum.setUTCMilliseconds(startTime);
                krajDatum.setUTCMilliseconds(krajVrijeme);
                console.log(i)
                console.log(pocetakDatum);
                console.log(krajDatum)
                rezervacije[i] = new Rezervacija(0, 1, pocetakDatum, krajDatum, vozilo, req.session.user, parking.idparking);
                let brojZauzetihMjesta = await RezervacijaPodatci.dohvatiBrojZauzetihMjesta(rezervacije[i]);
                console.log(brojZauzetihMjesta);
                console.log(parking.kapacitet);
                if(brojZauzetihMjesta >= parking.kapacitet){
                    let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
                    res.render('user/mainSiteUser', {
                        errmsg: "Nema slobodnih mjesta na ovom parkingu u izabranom vremenu!",
                        title: 'User',
                        user: req.session.user,
                        vozila: vozila,
                        rezervacije: rezervacije
                    });
                    return;
                }
                await RezervacijaPodatci.dodajRezervaciju(rezervacije[i]);
            }
            rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
            res.render('user/naplata', {
                title: 'User',
                user: req.session.user,
                vozila: vozila,
                rezervacije: rezervacije
            });
            return;
        }
    }else if(req.body.trajno){
        krajDatum = new Date('2050');
        rezervacija = new Rezervacija(0, 2, realDate, krajDatum, vozilo, req.session.user, parking.idparking);
    }else{
        let krajMillis = parseInt(req.body.durationhr) * 3600000 + parseInt(req.body.durationmin) * 60000;
        console.log(krajMillis)
        let krajVrijeme = krajMillis + realDate.getTime();
        console.log(krajVrijeme)
        krajDatum = new Date(0);
        krajDatum.setUTCMilliseconds(krajVrijeme)
        rezervacija = new Rezervacija(0, 0, realDate, krajDatum, vozilo, req.session.user, parking.idparking);
    }
    let brojZauzetihMjesta = await RezervacijaPodatci.dohvatiBrojZauzetihMjesta(rezervacija);
    console.log(brojZauzetihMjesta);
    console.log(parking.kapacitet);
    if(brojZauzetihMjesta >= parking.kapacitet){
        let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
        res.render('user/mainSiteUser', {
            errmsg: "Nema slobodnih mjesta na ovom parkingu u izabranom vremenu!",
            title: 'User',
            user: req.session.user,
            vozila: vozila,
            rezervacije: rezervacije
        });
        return;
    }
    let rezervacije = await RezervacijaPodatci.dohvatiRezervacije(req.session.user);
    success =  Math.floor(Math.random() * Math.floor(100));
    if(success > 20){
        await RezervacijaPodatci.dodajRezervaciju(rezervacija);
    }else{
        res.render('user/naplata', {
            title: 'User',
            user: req.session.user,
            vozila: vozila,
            rezervacije: rezervacije,
            err: "Naplata nije uspjela"
        });
        return;
    }
    
    if(req.body.trajno){
        let trajno = true;
        console.log(trajno)
        res.render('user/naplata', {
            title: 'User',
            user: req.session.user,
            vozila: vozila,
            rezervacije: rezervacije,
            trajno: trajno
        });
        return;
    }else{
        res.render('user/naplata', {
            title: 'User',
            user: req.session.user,
            vozila: vozila,
            rezervacije: rezervacije
        });
    }
}

module.exports = router;
