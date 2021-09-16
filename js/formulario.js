
const formulario =document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	apodo: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
    nombre: false,
    apodo: false,
    correo: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre' );
        break;
        case "apodo":
            validarCampo(expresiones.apodo, e.target, 'apodo');
        break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;  
        
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');   
        campos[campo] = false;
    }
}
inputs.forEach((input) =>{
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

/* Prueba con Datos*/
function capturarDatos() {
    var nombre = document.getElementById('nombre').value;
    var apodo = document.getElementById('apodo').value;
    var correo = document.getElementById('correo').value;
    var telefono = document.getElementById('telefono').value;
    var datos = [nombre, apodo, correo, telefono];
    var cadena = datos.join();
    return cadena;
}

var qrcode = new QRCode(document.getElementById('codigo'), {
    width: 190,
    height: 190
});
/* */
formulario.addEventListener('submit' , (e) =>{
    e.preventDefault();

    if(campos.nombre && campos.apodo && campos.correo && campos.telefono) {
        /*____________*/
        var datos = capturarDatos();
        qrcode.makeCode(datos);
        /*____________*/
        formulario.reset();
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });

        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        /* Prueba con QR*/
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});
