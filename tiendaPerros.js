document.addEventListener('DOMContentLoaded', function() {
    let perrito = document.querySelector("#dogContainer");
    let perritoCopia = perrito.cloneNode(true);

    let contenedor = document.querySelector(".fotos_clientes");
    perrito.remove();

    const apiKey = 'live_jGjcBrmnaQl3JwUKUQQWJZRE6d70tgwGkaQn7aoRZwdMStREMML47FGGtVcvTqrT'; 

    fetch('https://api.thedogapi.com/v1/images/search', {
        headers: {
            'x-api-key': apiKey
        }
    })
    .then(response => response.json())
    .then(data => {
        let nuevoPerrito = perritoCopia.cloneNode(true);
        nuevoPerrito.querySelector("#imagen_perro").src = data[0].url;
        nuevoPerrito.querySelector("#imagen_perro").alt = "foto de perrito";
        contenedor.appendChild(nuevoPerrito);
    })
    .catch(error => console.log("Ocurrió un error al mostrar al perro", error));
});
