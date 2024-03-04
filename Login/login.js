function validateLogin() {
    var email = document.getElementById("usuario").value;
    var password = document.getElementById("contraseña").value;

    if (email === "mail@usermail.com" && password === "admin") {
        window.location.href = "../Table/table.html";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Credenciales incorrectas. Inténtalo de nuevo.",
            color: "#413E4D",
            confirmButtonColor: '#DD3542',
            customClass: {
                title: 'swal2-title',
                confirmButtom:'sweet-warning',
                input: 'swal2-input',
                inputLabel: 'swal2-inputLabel',
                validationMessage: 'swal2-text',
                confirmButton: 'sweet-confirm',
            }
        });
    }
}

function forgotPassword() {
    (async () => {
        const { value: email } = await Swal.fire({
            title: "No recuerdo mi contraseña",
            input: "email",
            inputLabel: "Ingrese su correo electronico",
            inputPlaceholder: "Correo electronico"
        });
        if (email) {
            Swal.fire(`Se ha enviado un correo electrónico a la dirección ${email} con instrucciones para restablecer su contraseña.`);
        }
    })()
}
