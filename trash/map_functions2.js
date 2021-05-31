// // In the following example, markers appear when the user clicks on the map.
// // Each marker is labeled with a single alphabetical character.
// const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let labelIndex = 0;

// const jelacic = { lat: 45.813138, lng: 15.977264}
// var userLocation = { lat: jelacic.lat, lng: jelacic.lng}

// var closestParking
// var distanceToClosestParking



// // returna listu iz baze [user lat, user lngt], oba broja su float
// // test function, napravi da cita iz baze kasnije
// function getLocations() {
//     return [
//         { lat: 45.413, lng: 15.077 },
//         { lat: 45.513, lng: 15.177 },
//         { lat: 45.613, lng: 15.277 },
//         { lat: 45.713, lng: 15.377 },
//         { lat: 45.813, lng: 15.477 },
//         { lat: 45.913, lng: 15.577 }
//     ]
// }


// // // sets @userLat and @userLng
// // // sets center of map
// // function positionMap() {

// //     // centriranje na jelacic trg
// //     const jelacic = { 
// //         lat: jelacicLat,
// //         lng: jelacicLng
// //     };
    
// //     const map = new google.maps.Map(document.getElementById("map"), {
// //         zoom: 12,
// //         center: jelacic,
// //     });


// //     // centriranje na lokaciju kompjutera ako je dopusteno lociranje 
// //     // stavljanje taga "vi ste ovdje!" na tu lokaciju
// //     if (navigator.geolocation) {

// //         navigator.geolocation.getCurrentPosition(

// //             (position) => {

// //                 const pos = {
// //                     lat: position.coords.latitude,
// //                     lng: position.coords.longitude,
// //                 };

// //                 userLat = position.coords.latitude
// //                 userLng = position.coords.longitude


// //                 infoWindow = new google.maps.InfoWindow();

// //                 infoWindow.setPosition(pos);
                
// //                 infoWindow.setContent("Vi ste ovdje!");
                
// //                 infoWindow.open(map);
                
// //                 map.setCenter(pos);
                
// //             },
        
// //             () => {
// //                 // pass
// //             }
    
// //         );

// //     } 
// // }

// // function getNearestLocation(locations) {
// //     console.log(locations[0])
// //     console.log(calculateDistanceBetweenPoints(userLat, userLng, locations[0].lat, locations[0].lng))
// //     closestParking = locations[0]
// //     distanceToClosestParking = calculateDistanceBetweenPoints(userLat, userLng, locations[0].lat, locations[0].lng)

// //     for (var i = 1; i < locations.length; i++) {
// //         console.log(locations[i]);

// //         distance = calculateDistanceBetweenPoints(userLat, userLng, locations[i].lat, locations[i].lng)


// //         console.log(distance)


// //         if (distanceToClosestParking > distance) {
// //             closestParking = locations[i]
// //             distanceToClosestParking = distance
// //             alert("ovo je najblizi parking")

// //         }

// //     }

// //     console.log("kraj getnearset location")



// // }


// function initMap() {

//     // centriranje na jelacic trg
//     // const jelacic = { 
//     //     lat: jelacicLat,
//     //     lng: jelacicLng
//     // };

//     // centriranje na jelacic
//     console.log("jelacic: ", jelacic)

//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 12,
//         center: jelacic,
//     });


//     // await f()

//     // centriranje na lokaciju kompjutera ako je dopusteno lociranje 
//     // stavljanje taga "vi ste ovdje!" na tu lokaciju
//     if (navigator.geolocation) {

//         navigator.geolocation.getCurrentPosition(

//             (position) => {

//                 const pos = {
//                     lat: position.coords.latitude,
//                     lng: position.coords.longitude,
//                 };

//                 userLocation = pos
//                 console.log("userf ", userLocation)


//                 map.center = userLocation


//                 // userLocation = { lat: position.coords.latitude, lng: position.coords.longitude}

//                 // userLat = position.coords.latitude
//                 // userLng = position.coords.longitude


//                 infoWindow = new google.maps.InfoWindow();

//                 infoWindow.setPosition(pos);
                
//                 infoWindow.setContent("Vi ste ovdje!");
                
//                 infoWindow.open(map);
                
//                 map.setCenter(pos);
                
//             },
        
//             () => {
//                 console.log("nije dat pristup lokaciji")
//                 // pass
//             }

//         );

//     } 

//     console.log("user ", userLocation)

//     var locations = getLocations()

//     for (var i = 0; i < locations.length; i++) {
//         console.log("lok ", i, locations[i])
//     }

//     // getNearestLocation(locations)
    
//     for (var i  = 0 ; i < locations.length; i++) {
//         console.log("lokacija ", i, " -> ",  locations[i])
     


//         // addMarker(locations[i].lat, locations[i].lng, map)
//         addMarker(locations[i], map)
//     }



//     infoWindow = new google.maps.InfoWindow();

//     infoWindow.setPosition(closestParking);
    
//     infoWindow.setContent("najblizi parking");
    
//     infoWindow.open(map);
    
//     map.setCenter(closestParking);

    

//     // This event listener calls addMarker() when the map is clicked.
//     google.maps.event.addListener(map, "click", (event) => {
//         console.log(event)
//         console.log(event.latLng)

//         console.log(event.latLng.lat)
//         console.log(event.latLng.lng)

//         lat = event.latLng.lat
//         lng = event.latLng.lng


    

//         // console.log(event.longitude)
//         // addMarker(event.latLng, map);
//     });

// }

// ///////////////////////////////////////////////////////
// // funkcija za firme

// function addMarker(location, map) {
//         new google.maps.Marker({
//             position: event.latLng,
//             label: labels[labelIndex++ % labels.length],
//             map: map,
//         });
// }


  

// ///////////////////////////////////////////////////////

// // Adds a marker to the map.
// function addMarker(location, map) {

//     // listOfParkings.push(location)

//     if (closestParking == null){
//         // your code here.
//         closestParking = location
//         distanceToClosestParking = calculateDistanceBetweenPoints(userLocation, location)
//         // alert("ovo je najblizi parking")
//     }
  
  
//     // Add the marker at the clicked location, and add the next-available label
//     // from the array of alphabetical characters.

//     new google.maps.Marker({
//         position: location,
//         label: labels[labelIndex++ % labels.length],
//         map: map,
//     });

//     distance = calculateDistanceBetweenPoints(userLocation, location)

//     console.log(distance)

//     console.log(location)
//     // console.log(location.lat, location.lng)

//     if (distanceToClosestParking > distance) {
//         closestParking = location
//         distanceToClosestParking = distance
//         // alert("ovo je najblizi parking")
//     }
// }

// // pomocna funkcija za @calculateDistanceBetweenPoints
// function rad(x) {
//     return x * Math.PI / 180
// }

// // return: float: udaljenost u metrima izmedu lokacija
// function calculateDistanceBetweenPoints(userLocation, location) {
    
//     var R = 6378137;
//     // var R = 6371137
    
//     var dLat = rad(location.lat - userLocation.lat);
   
//     var dLong = rad(location.lng - userLocation.lng);
    
//     var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + 
//         Math.cos(rad(userLocation.lat)) * Math.cos(rad(location.lat)) *
//         Math.sin(dLong / 2) * Math.sin(dLong / 2);

//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
//     var d = R * c;
   
//     return d;
// }
 

 



