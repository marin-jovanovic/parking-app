async function openEditWindow(korisnickoime){
    // alert("stisnuti osobni podaci");

    // window.open('http://www.google.com','MyWindow','width=600,height=300'); 
    // MyWindow.document.write("<p>This window's name is: " + myWindow.name + "</p>");
    // window.location.href = ""
    // var personalDataWindow = window.open("Izv", "", "width=500,height=500");
    // personalDataWindow.document.write("<h1> Osobni podatci </h1>")
    // myWindow.document.write("<p>This window's name is: " + myWindow.name + "</p>");


    const winHtml = `
    <!DOCTYPE html>
    <html>
        <html lang="hr">
    
        <head>
            <title>osobni podatci</title>
    
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <!-- <link rel="stylesheet" href="/IzvorniKod/public/styles/main_site_user/main_site_user.css"> -->
        
        </head>
    
        <body>
            

            <form name="registerForm" id="registerFormC" action="form-validation-advanced.html" method="get" onchange="return formValidation();">
                <table class="center__login__table" border="1" cellspacing="5" cellpadding="5" align="center" width="100%">
                    
                    <tr>
                        <td>
                            OIB
                            <br>
                            <input type="text" id="oib" value=${korisnickoime}>
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            ime
                            <br>
                            <input type="text" id="firstname" value="Marko" size="32">
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            prezime
                            <br>
                            <input type="text" id="lastname" value="Marulic" size="32">
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            adresa e-pošte
                            <br>
                            <input type="text" id="email" value="mm@nesto.com" size="32">
                        </td>
                    </tr>
    
                    </tr>
    
    
                    <tr>
                        <td>
                            TODO
                            <br>
                            <input type="text" name="password2" value="ovdje dodat za registraciju auta" size="32">
                        </td>
                    </tr>
                    <tr>
                        <td>
                            TODO
                            <br>
                            <input type="text" name="password2" value="ovdje dodat za kreditne kartice" size="32">
                        </td>
                    </tr>
    
                 
    
                    <tr>
                        <td>
                            nova lozinka
                            <br>
                            <input type="password" id="new_password_1" value="" size="32">
                            <br>
                            <br>
                            
                            potvrda nove lozinke
                            <br>
                            <input type="password" id="new_password_2" value="" size="32">
    
                        </td>
                    </tr>
    
                    <tr>
                        <td>
                            trenutna lozinka
                            <br>
                            <input type="password" id="old_password" value="" size="32">
                            <br>
                            <br>
    
                            <!-- <form action="/processForm.php"> -->
                                <input type="button" class="save__button" value="spremi" onclick="updatePersonalData()">
                            <!-- </form>                                               -->
                        </td>
                    </tr>
                </table>
    
                <script>
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
           
    
                        alert(oib + "\n" + firstname + "\n" + lastname + "\n" + email + "\n" + new_password_1 + "\n" + new_password_2 + "\n" + old_password);
    
                        // alert(x);
    
                        setTimeout('', 2000);
    
                        // ovo treba rjesit
                        is_closing_enabled = true;
    
                        if (is_closing_enabled) {
                            window.close();
                        }
    
                    }
    
                    
    
                </script>
    
            </form>
        </body>
    </html>
        
        `;

    const winUrl = URL.createObjectURL(
        new Blob([winHtml], { type: "text/html" })
    );

    const win = window.open(
        winUrl,
        "win",
        `width=800,height=400,screenX=200,screenY=200`
    );

    
}