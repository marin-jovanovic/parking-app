console.log("hello from html_writers.js")
// cars = getCars(user.OIBKorisnik);
    // cars = getCars("a");
 // document.getElementById('formChangeCars').innerHTML = 
    // '<div id="idChild">trenutni popis autiju</div>' 

    // if (cars.length == 0) {

    // } else if (cars.length >= 1) {
    //     document.getElementById('formChangeCars').innerHTML += 
    //     '<div id="idChild">auto ' + 1 + ': ' + cars[0].registracija + '</div>' 

    //     for (i = 1; i < cars.length; i++) {
    //         document.getElementById('formChangeCars').innerHTML += 
    //         '<div id="idChild">auto ' + (i + 1) + ': ' + cars[i].registracija + '</div>' 
    //     }
    // }



// za DODAJ AUTO 
$(document).ready(function(){

    // // Add new element
    // $(".add").click(function(){

    //     // last <div> with element class id
    //     var lastid = $(".element:last").attr("id");
        
    //     var split_id = lastid.split("_");
    //     var nextindex = Number(split_id[1]) + 1;

    
    //     // Adding new div container after last occurance of element class
    //     $(".element:last").after("<div class='element' id='div_"+ nextindex +"'></div>");
    
    //     // Adding element to <div>
    //     $("#div_" + nextindex).append("<input type='text' placeholder='upisi registraciju' id='txt_"
    //     + nextindex +"'><span> </span><input id='remove_" + nextindex + 
    //     "' class='remove' type='button' value='obrisi'></input>");
        
    // });
    
    // Remove element
    $('.container').on('click','.remove',function(){

        var deleteindex = ( this.id.split("_"))[1];
     
        // Remove <div> with id
        try {
            $("#div_" + deleteindex).remove();

        } catch(err) {
            
        }

    }); 

});

function nearestParkingDriver() {

    getClosestParking();

    console.log("closestParking", closestParking);
    
    var distance = parseInt(distanceToClosestParking);

    // document.getElementById('formShowNearestParking').innerHTML = 
    // '<div id="idChild">broj slobodnih mjesta: ' + String(closestParking.NumEmpty) +'</div>';


    // if ( distance < 1000) {
    //         document.getElementById('formShowNearestParking').innerHTML +=
    //             '<div id="idChild">udaljenost: ' + distance + ' m</div>'; 

    // } else {
        
    //     document.getElementById('formShowNearestParking').innerHTML += 
    //         '<div id="idChild">udaljenost: ' + String(+(distance / 1000).toFixed(1)) + ' km</div>'; 

    // }

}

function checkoutDriver() {
    
    formCheckoutToggleEnabled = true;

    checkoutFormWriter(current_selected);

}

// function set_to_nearest() {
//     // alert("radim ovo trenutno");

//     getClosestParking();
//     checkoutFormWriter(closestParking);

// }

let is_closest_parking_defined = false;

function checkoutFormWriter(location) {

    if (formCheckoutToggleEnabled) {

        console.log("checkoutFormWriter todo mozda")

        if (! is_closest_parking_defined) {
            is_closest_parking_defined = true;


        }

        let sirina;
        let duzina;

        try {
            sirina = location.lat;
            duzina = location.lng;

            // ako korisnik stisne na najblizu lokaciju
            if (location == closestParking) {
                document.getElementById('placeholder_1').innerHTML = 
                '<div id="idChild">odabrana je najbliza lokacija</div>';


            // ako korisnik stisne na neku lokaciju koja nije najbliza
            } else {
                document.getElementById('placeholder_1').innerHTML = 
                    '<div id="idChild">odabrana je lokacija koja je prikazana na karti';

            }


        } catch(error) {
            console.log("location not selected");
            nearestParkingDriver();

            sirina = closestParking.lat;
            duzina = closestParking.lng;
            
            document.getElementById('placeholder_1').innerHTML = 
                '<div id="idChild">odabrali smo vama najbli&zcaron;u lokaciju';

        }

        document.getElementById('placeholder_1').innerHTML += 
            // '<br>' + 
            'klikom na kartu odaberite drugu lokaciju ako &zcaron;elite</div>' + 
            '<hr>' +
            '<div id="idChild">vase koordinate: </div>' +
            '<input name=\'sirina\' type=\'text\' value=\'' + sirina + '\'></input>' + 
            '<br>' +
            '<input name=\'duzina\' type=\'text\' value=\'' + duzina + '\'></input>' + 
            '<br>' + 
            '<hr>';    
    }

}


function write_date(startDate) {
    document.getElementById('placeholder_2').innerHTML = 
    '<div id="idChild">datum: </div>' +
    '<input name=\'startDateTemp\' id = "date" type=\'text\' value=\''+startDate+'\'></input>' + 
    '<br>' +
    '<hr>';


}

let is_start_set = false;
let is_start_hr_set = false;
let is_start_min_set = false;

let is_duration_hr_set = false;
let is_duration_min_set = false;

// let is_ponavljajuce_checkbox_set = false;
// let is_ponavljajuce_field_set = false;

// let is_trajno_checkbox_set = false;


document.getElementById("start").addEventListener("change", function() {
    is_start_set = true;
    check_for_button_addding();
});

document.getElementById("starthr").addEventListener("change", function() {
    is_start_hr_set = true;
    check_for_button_addding();
});

document.getElementById("startmin").addEventListener("change", function() {
    is_start_min_set = true;
    check_for_button_addding();
});

document.getElementById("durationhr").addEventListener("change", function() {
    is_duration_hr_set = true;
    check_for_button_addding();
});

document.getElementById("durationmin").addEventListener("change", function() {
    is_duration_min_set = true;
    check_for_button_addding();
});

// document.getElementById("ponavljajuceCheckbox").addEventListener("change", function() {
//     is_ponavljajuce_checkbox_set = true;
//     check_for_button_addding();
// });

// document.getElementById("ponavljajuceField").addEventListener("change", function() {}
//     is_ponavljajuce_field_set = true;
//     check_for_button_addding();
// });

// document.getElementById("trajnoCheckbox").addEventListener("change", function() {
//     is_trajno_checkbox_set = true;
//     check_for_button_addding();
// });

function check_for_empty(elem) {
    if (document.getElementById(elem).value === "") {
        alert("elem je prazan");
        return false;
    } else {
        return true;
    }
}

function tester() {
      
    for (let i = 0; i < markers.length; i++) {
        // console.log(markers[i]);

        markers[i].setMap(null);
    }

    console.log(markers);
    markers = []

    console.log(markers);
  
}

function show_locations_for_defined_time() {
    // console.log("radi");

    console.log("html_writers/ show_locations_for_defined_time")

    // Create XHR Object
    var xhr = new XMLHttpRequest();
 
    console.log(document.getElementById("start").value)

    let data = document.getElementById("start").value + ";" +
        document.getElementById("starthr").value + ";" +
        document.getElementById("startmin").value + ";" +
        document.getElementById("durationhr").value + ";" +
        document.getElementById("durationmin").value;
    
    // OPEN - type, url/file, async
    xhr.open('GET', 'parkiraj-me-ndb.herokuapp.com/user/get_locations/' + data, true);

    // OPTIONAL - used for loaders
    // xhr.onprogress = function(){
    // }

    xhr.onload = function(){

      if(this.status == 200){
  
        parkings = JSON.parse(this.responseText);

        for (const item of parkings) {
            console.log(item);
        }
        

        for (let i = 0; i < markers.length; i++) {

            markers[i].setMap(null);
        }

        console.log(markers);
        markers = [];
        locations = [];

        console.log(markers);
    
        for (let i = 0; i < parkings.length; i++) {
            console.log(parkings[i]);

            temp = {
                lat: parseFloat(parkings[i].geosirina), 
                lng: parseFloat(parkings[i].geoduzina),
                NumEmpty : parseFloat(parkings[i].brojslobmjesta)
            }


            addParkingMarker(
                temp,
                map
            );
            locations.push(temp);


        }
       
     

      } else if(this.status = 404){

        console.log("not found");
        
      }

    }

    xhr.onerror = function(){
      console.log('Request Error...');
    }

    xhr.send();

}


function get_nearest_location_for_defined_time() {
  // Create XHR Object
  var xhr = new XMLHttpRequest();
 
  console.log(document.getElementById("start").value)

  let data = document.getElementById("start").value + ";" +
      document.getElementById("starthr").value + ";" +
      document.getElementById("startmin").value + ";" +
      document.getElementById("durationhr").value + ";" +
      document.getElementById("durationmin").value;

  
  
  // OPEN - type, url/file, async
  xhr.open('GET', 'http://parkiraj-me-ndb.herokuapp.com/user/get_locations/' + data, true);

  // OPTIONAL - used for loaders
  // xhr.onprogress = function(){
  // }

  xhr.onload = function(){

    if(this.status == 200){

    //   let result = this.responseText;

    //   console.log(result);

      parkings = JSON.parse(this.responseText);

      for (const item of parkings) {
          console.log(item);
      }
      

      for (let i = 0; i < markers.length; i++) {

          markers[i].setMap(null);
      }

      console.log(markers);
      markers = []
      locations = [];

      console.log(markers);
  
      for (let i = 0; i < parkings.length; i++) {
          console.log(parkings[i]);

          temp = {
              lat: parseFloat(parkings[i].geosirina), 
              lng: parseFloat(parkings[i].geoduzina),
              NumEmpty : parseFloat(parkings[i].brojslobmjesta)
          }


          addParkingMarker(
              temp,
              map
          );

          locations.push(temp);


      }
     


      console.log("*******************");

      getClosestParking();
      checkoutFormWriter(closestParking);



    } else if(this.status = 404){

      console.log("not found");
      
    }

  }

  xhr.onerror = function(){
    console.log('Request Error...');
  }

  xhr.send();

}

function check_for_button_addding() {
    if (is_start_set && is_start_hr_set && is_start_min_set &&
        is_duration_hr_set && is_duration_min_set) {

        // is_something_empty = false;

        // for (const item of ["start", "starthr", "startmin", "durationhr", "durationmin"]) {
        //     check_for_empty(item);
        //     is_something_empty = true;
        //     break;
        // }

        // if ( is_something_empty) {
            
        //     document.getElementById('placeholder_3').innerHTML = 
        //     '<div></div>';
        
        // } else {

            document.getElementById('placeholder_3').innerHTML = 
            '<div id="idChild"></div>' +
            '<input type="button" onclick="show_locations_for_defined_time();" value="prikazi tada dostupne parkinge">' + 
            '<br>' +
            '<input type="button" onclick="get_nearest_location_for_defined_time();" value="odaberi tada najblizi parking">' + 
            '<br>' +
            '<hr>';
  
        // }
      

    } 
}


function chosenParkingDriver() {

    document.getElementById('formCheckout').innerHTML = 
    '<div id="idChild">najbliza parkiralisna povrsina</div>';

    document.getElementById('formCheckout').innerHTML += 
    '<div id="idChild">broj slobodnih mjesta: ' + String(closestParking.NumEmpty) +'</div>';


    if ( distance < 1000) {
            document.getElementById('formShowNearestParking').innerHTML +=
                '<div id="idChild">udaljenost: ' + distance + ' m</div>'; 

    } else {
        
        document.getElementById('formShowNearestParking').innerHTML += 
            '<div id="idChild">udaljenost: ' + String(+(distance / 1000).toFixed(1)) + ' km</div>';

    }

}

