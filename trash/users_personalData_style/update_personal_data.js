function updatePersonalData() {

    var is_closing_enabled = false;
    var oib = document.getElementById("oib").value;
    var firstname = document.getElementById("firstname").value;
    var lastname = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var new_password_1 = document.getElementById("new_password_1").value;
    var new_password_2 = document.getElementById("new_password_2").value;
    var old_password = document.getElementById("old_password").value;
   
    if (new_password_1 !== new_password_2 && new_password_1 != ""){
    alert("novi pass se ne poklapaju")
    }
   
    alert(oib + "\\n" + firstname + "\n" + lastname + "\n" + email + "\n" + new_password_1 + "\n" + new_password_2 + "\n" + old_password);
      
    setTimeout('', 2000);
   
    is_closing_enabled = true;
   
    // treba se vratit na prijasnju stranicu
    if (is_closing_enabled) {
    window.close();
    }
    // inace
    // ispisi poruku da nije saveana stranica prije izlaska
}
