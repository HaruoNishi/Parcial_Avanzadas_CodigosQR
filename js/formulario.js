
const formulario =document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const $imagen = document.querySelector('#codigo'),
        $boton = document.querySelector('#btnDescargar');

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

function capturarDatos() {
    var nombre = document.getElementById('nombre').value;
    var apodo = document.getElementById('apodo').value;
    var correo = document.getElementById('correo').value;
    var telefono = document.getElementById('telefono').value;
    var datos = [`Nombre: ${nombre}`,`Apodo: ${apodo}`,`Correo: ${correo}`,`Telefono: ${telefono}`];
    var cadena = datos.join();
    return cadena;
}

/* */
formulario.addEventListener('submit' , (e) =>{
    e.preventDefault();
    
    if(campos.nombre && campos.apodo && campos.correo && campos.telefono) {
        
        var datos = capturarDatos();
        var img = document.querySelector('#codigo');
        img.classList.add('card__img-activo');
        new QRious({
            element: $imagen,
            value: datos, // La URL o el texto
            backgroundAlpha: 1, // 0 para fondo transparente
            foreground: "#000", // Color del QR
            level: "H", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
        });
        var btn = document.querySelector('#btnDescargar');
        btn.classList.remove('formulario__btn-inactivo')
        formulario.reset();
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto');
        });

        document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
    }
});

$boton.onclick = () => {
    const enlace = document.createElement("a");
    enlace.href = $imagen.src;
    enlace.download = "Código QR Datos del Formulario";
    enlace.click();
}
