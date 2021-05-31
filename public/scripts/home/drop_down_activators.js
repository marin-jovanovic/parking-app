dropDownState = 0;


function openFormLogin(){

    if (dropDownState != 1) {
        $("#loginForm").slideToggle("slow");
        $("#registerFormU").slideUp("slow");
        $("#registerFormC").slideUp("slow");

        dropDownState = 1
    }


}

function openFormRegisterU(){
    if (dropDownState != 2) {
        $("#loginForm").slideUp("slow");
        $("#registerFormU").slideToggle("slow");
        $("#registerFormC").slideUp("slow");

        dropDownState = 2
    }

 
}

function openFormRegisterC(){

    if (dropDownState != 3) {

        $("#loginForm").slideUp("slow");
        $("#registerFormU").slideUp("slow");
        $("#registerFormC").slideToggle("slow");
        dropDownState = 3
    }

}

