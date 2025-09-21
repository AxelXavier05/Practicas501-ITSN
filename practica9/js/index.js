// Estado por default: Guanajuato
let estado = document.getElementById('estado');
estado.value = 11;

// Fecha por default: hoy
let fecha = document.getElementById('fecha');
let hoy = new Date();
let fechaCadena = hoy.getFullYear() + "-" +
                  ("0" + (hoy.getMonth() + 1)).slice(-2) + "-" +
                  ("0" + hoy.getDate()).slice(-2);
fecha.value = fechaCadena;

// Validación de contraseña
document.getElementById("formulario").addEventListener("submit", function(e){
    e.preventDefault(); // evita enviar si hay error

    let pass1 = document.getElementById("contrasena1").value;
    let pass2 = document.getElementById("contrasena2").value;

    // Reglas:
    // - mínimo 8 caracteres
    // - al menos una mayúscula
    // - al menos un número
    // - sin espacios
    let regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if(pass1 !== pass2){
        alert("Las contraseñas no coinciden");
        return;
    }

    if(!regex.test(pass1)){
        alert("La contraseña debe tener mínimo 8 caracteres, al menos una mayúscula y un número, y no contener espacios");
        return;
    }

    alert("Formulario válido. Usuario registrado con éxito.");
    this.submit(); // aquí sí lo manda si todo pasó
});
