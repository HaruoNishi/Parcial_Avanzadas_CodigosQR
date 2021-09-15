
let numero = 1;

new QRious({
    element: document.querySelector("#codigo"),
    value: "nombre", // La URL o el texto
    size: 195,
    backgroundAlpha: 0, // 0 para fondo transparente
    foreground: "#000", // Color del QR
    level: "H", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
});
