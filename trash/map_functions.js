// var closestParking;
// var distanceToClosestParking;

// async function getClosestParking() {

//     // mora se opet pozvat da bi se radilo s aktualnim podatcima
//     var locations = getLocations();

//     closestParking = locations[0];

//     distanceToClosestParking = calculateDistanceBetweenPoints(userLocation,
//         locations[0].lat, locations[0].lng);
    
//     for (var i = 1; i < locations.length; i++) {

//         var currDistance = calculateDistanceBetweenPoints(userLocation, locations[i].lat,
//             locations[i].lng);

//         if (distanceToClosestParking > currDistance) {
//             closestParking = locations[i];
//             distanceToClosestParking = currDistance;
//         }

//     }

//     console.log("najkraca udaljenost ", distanceToClosestParking);
//     console.log("koordinate najblize ", closestParking);

//     addInfoWindow(closestParking, "najblizi parking");

// }

// // return: float: udaljenost u metrima izmedu lokacija
// function calculateDistanceBetweenPoints(userLocation, locationLat, locationLng) {
        
//     var dLat = (locationLat - userLocation.lat) * Math.PI / 180;

//     var dLong = (locationLng - userLocation.lng) * Math.PI / 180;
    
//     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
//         Math.cos((userLocation.lat) * Math.PI / 180) * Math.cos((locationLat) * Math.PI / 180) *
//         Math.sin(dLong / 2) * Math.sin(dLong / 2);
    
//     // 6378137 je radius zemlje za ovu mapu, razlikuje se od stvarnog ali je to ok
//     // zato sto ova mapa ovako ocito funkcionira
//     return 6378137 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// }