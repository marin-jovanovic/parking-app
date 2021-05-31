// function display_locations() {
console.log("display_locations/ display_locations")

// Create XHR Object
var xhr = new XMLHttpRequest();

// OPEN - type, url/file, async
xhr.open('GET', 'http://parkiraj-me-ndb.herokuapp.com/admin/test', true);

// const result = await podaci.dohvatiSveVozace();


// OPTIONAL - used for loaders
// xhr.onprogress = function(){
// }

// function pad(str) {
//     pad = '00000000000000000000000000000000'
//     padLeft = true;
 
//     if (padLeft) {
//       return (pad + str).slice(-pad.length);
//     } else {
//       return (str + pad).substring(0, pad.length);
//     }
//   }

xhr.onload = function(){

    if(this.status == 200){

    parkings = JSON.parse(this.responseText);

    formatted_locations = []

    for (var i  = 0 ; i < parkings.length; i++) {

        // temp = {
        //     lat: parseFloat(parkings[i].lokacija.geosirina), 
        //     lng: parseFloat(parkings[i].lokacija.geoduzina),
        //     NumEmpty : parseFloat(parkings[i].brojslobmjesta)
        // }

        console.log(parkings[i]);

        // let content = pad(String(parkings[i].korisnickoimevozac)) + " " + parkings[i].imevozac + " " + parkings[i].prezimevozac + " " + parkings[i].oibvozac + " " + parkings[i].emailvozac


        // brojkredkartice: "180089341849821"
        // emailvozac: "eula47@smith.com"
        // imevozac: "Bruce"
        // korisnickoimevozac: "avinashu26u0"
        // lozinkavozac: "7HP3PhgEDJmvFGN"
        // oibvozac: "20822835811"
        // prezimevozac: "Novak"
        // razinaovlasti: 1

       // last <div> with element class id
       var lastid = $(".element:last").attr("id");
        
       var split_id = lastid.split("_");
       var nextindex = Number(split_id[1]) + 1;

       console.log(split_id);
   
       // Adding new div container after last occurance of element class
       $(".element:last").after("<div class='element' id='div_"+ nextindex +"'></div>");
   
       // Adding element to <div>
       $("#div_" + nextindex).append("<span>"+content+"</span><input id='remove_" + nextindex + "' class='remove' type='button' value='obrisi'></input><br>");
       

        // console.log(temp);

        // addParkingMarker(
        //    temp,
        //     map
        // );

        // formatted_locations.push(temp);

    }

    // locations = formatted_locations;

    } else if(this.status = 404){

    console.log("not found");
    
    }

}

xhr.onerror = function(){
    console.log('Request Error...');
}

xhr.send();

// }