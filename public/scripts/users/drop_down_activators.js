dropDownState = 0

function personalDataToggle(){

    if (dropDownState != 1) {
        $("#formPersonalData").slideToggle("slow");
        $("#formAddCar").slideUp("slow");
        $("#formShowCars").slideUp("slow");
        $("#formShowNearestParking").slideUp("slow");
        $("#formCheckout").slideUp("slow");
        $("#formShowReservations").slideUp("slow");

        dropDownState = 1;
    }
}

function addCarToggle(){
    if (dropDownState != 2) {
        $("#formPersonalData").slideUp("slow");
        $("#formAddCar").slideToggle("slow");
        $("#formShowCars").slideUp("slow");
        $("#formShowNearestParking").slideUp("slow");
        $("#formCheckout").slideUp("slow");
        $("#formShowReservations").slideUp("slow");

        dropDownState = 2;
    }

}

function showCarsToggle(){

    if (dropDownState != 3) {
        $("#formPersonalData").slideUp("slow");
        $("#formAddCar").slideUp("slow");
        $("#formShowCars").slideToggle("slow");
        $("#formShowNearestParking").slideUp("slow");
        $("#formCheckout").slideUp("slow");
        $("#formShowReservations").slideUp("slow");

        dropDownState = 3;
    }

}

function changeCarsToggle(){

    if (dropDownState != 4) {
        $("#formPersonalData").slideUp("slow");
        $("#formAddCar").slideUp("slow");
        $("#formShowCars").slideUp("slow");
        $("#formShowNearestParking").slideUp("slow");
        $("#formCheckout").slideUp("slow");
        $("#formShowReservations").slideUp("slow");

        dropDownState = 4;
    }
   
}

// function showNearestParkingToggle(){
    
//     if (dropDownState != 5) {
//         $("#formPersonalData").slideUp("slow");
//         $("#formAddCar").slideUp("slow");
//         $("#formShowCars").slideUp("slow");
//         $("#formShowNearestParking").slideToggle("slow");
//         $("#formCheckout").slideUp("slow");
//         $("#formShowReservations").slideUp("slow");

//         dropDownState = 5;
//     }

//     nearestParkingDriver();

// }

function formCheckoutToggle() {

    if (dropDownState != 6) {
        $("#formPersonalData").slideUp("slow");
        $("#formAddCar").slideUp("slow");
        $("#formShowCars").slideUp("slow");
        $("#formShowNearestParking").slideUp("slow");
        $("#formCheckout").slideToggle("slow");
        $("#formShowReservations").slideUp("slow");

        dropDownState = 6;
    }

    checkoutDriver();

}

function formShowReservationsToggle() {

    if (dropDownState != 7) {
        $("#formPersonalData").slideUp("slow");
        $("#formAddCar").slideUp("slow");
        $("#formShowCars").slideUp("slow");
        $("#formShowNearestParking").slideUp("slow");
        $("#formCheckout").slideUp("slow");
        $("#formShowReservations").slideToggle("slow");
        
        dropDownState = 7;
    }

} 