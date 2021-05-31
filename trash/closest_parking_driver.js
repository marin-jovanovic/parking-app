// console.log("hello from closest_parking_driver.js")

// var closestParking;
// var distanceToClosestParking;

// getClosestParking()

// function getClosestParking() {
//     // await initMap();

//     console.log("closest parking")

//     var locations = getLocations()

//     closestParking = locations[0]

//     distanceToClosestParking = calculateDistanceBetweenPoints(userLocation,
//         locations[0].lat, locations[0].lng)
    
//     console.log("distance ", distanceToClosestParking)
//     console.log("user loc ", userLocation)
//     console.log("lat", locations[0].lat)

//     for (var i = 1; i < locations.length; i++) {

//         var currDistance = calculateDistanceBetweenPoints(userLocation, locations[i].lat,
//             locations[i].lng)

//         if (distanceToClosestParking > currDistance) {
//             closestParking = locations[i]
//             distanceToClosestParking = currDistance
//         }
//     }

//     // console.log
//     console.log("najkraca udaljenost ", distanceToClosestParking)
//     console.log("koordinate najblize ", closestParking)


//     // addInfoWindow(closestParking, "najbliza lokacija")


// }

// // pomocna funkcija za @calculateDistanceBetweenPoints
// function rad(x) {
//     return x * Math.PI / 180
// }

// // return: float: udaljenost u metrima izmedu lokacija
// function calculateDistanceBetweenPoints(userLocation, locationLat, 
//     locationLng) {
    
//     var R = 6378137;
    
//     var dLat = rad(locationLat - userLocation.lat);

//     var dLong = rad(locationLng - userLocation.lng);
    
//     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
//         Math.cos(rad(userLocation.lat)) * Math.cos(rad(locationLat)) *
//         Math.sin(dLong / 2) * Math.sin(dLong / 2);
    
//     return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// }



// // // ////////////////////////////////// test

// // let promise = new Promise(function(resolve, reject) {
// //     // not taking our time to do the job
// //     resolve(123); // immediately give the result: 123
// // });


// // promise.then(
// //     function(result) { 
// //         /* handle a successful result */ 
// //         console.log("nije error");
// //     },
// //     function(error) { 
// //         /* handle an error */
// //         console.log("bacen error")
// //     }
// // );