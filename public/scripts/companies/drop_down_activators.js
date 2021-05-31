dropDownState = 0

function formPersonalDataToggle(){

    if (dropDownState != 1) {
        $("#formPersonalData").slideToggle("slow");
        $("#formAddParkingSpace").slideUp("slow");
        $("#formManageParkingSpaces").slideUp("slow");
        dropDownState = 1

        try {

            new_marker.setMap(null);
        
        }
          catch(err) {

        }
    }
}

let is_location_added;

let new_marker;

function restart_location() {
    is_location_added = false;
    new_marker.setMap(null);
}

function formAddParkingSpaceToggle(){

    if (dropDownState != 2) {
        $("#formPersonalData").slideUp("slow");
        $("#formAddParkingSpace").slideToggle("slow");
        $("#formManageParkingSpaces").slideUp("slow");
        dropDownState = 2

    } else {
        new_marker.setMap(null);
    }

    is_location_added = false;

    google.maps.event.addListener(map, 'click', function(event) {
       if (! is_location_added) {
            placeMarker(event.latLng);
            is_location_added = true;
       }
    });
 
    document.getElementById('placeholder_0').innerHTML = 
    '<div id="idChild">postavi marker na kartu klikom misa: </div><br>'; 


    function placeMarker(location) {

        new_marker = new google.maps.Marker({
            position: location, 
            map: map
        });

        let temp = String(new_marker.position).split(", ");

        let sirina = temp[0].substring(1, temp[0].length)
        let duzina = temp[1].substring(0, temp[1].length - 1)

        document.getElementById('placeholder_0').innerHTML = 
        '<div id="idChild">log: </div><br>' +
        '<input name=\'sirina\' type=\'text\' value=\''+sirina+'\'></input>' + 
        '<br>' +
        '<input name=\'duzina\' type=\'text\' value=\''+duzina+'\'></input>' + 
        '<br>'; 
    
    }

}

function formManageParkingSpacesToggle(){

    if (dropDownState != 3) {
        $("#formPersonalData").slideUp("slow");
        $("#formAddParkingSpace").slideUp("slow");
        $("#formManageParkingSpaces").slideToggle("slow");
      
        dropDownState = 3
    }

}

function save_location_info() {
         // last <div> with element class id
         var lastid = $(".element:last").attr("id");
        
         var split_id = lastid.split("_");
         var nextindex = Number(split_id[1]) + 1;
 
         document.getElementById('placeholder_2').innerHTML = 
         '<div id="idChild">spremam</div><br>';
 
}