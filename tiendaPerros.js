let perrito = document.querySelector("#dogContainer");
let perritoCopia = perrito.cloneNode(true);

let contenedor = document.querySelector("article");
perrito.remove()

    fetch("https://dog.ceo/api/breeds/list/all")
        .then( response => response.json())
        .then(data => { 
            //procesamiento de la info que llega de la API
            
            let nuevoPerrito = perritoCopia.cloneNode(true);
            nuevoPerrito.querySelector("#imagen_perro").src = data.results[0].message;
            nuevoPerrito.querySelector("#imagen_perro").alt = "foto de perrito";
            contenedor.appendChild(nuevoPerrito);
            
            console.log(data.results[0]);
        })
    .catch (error => console.log("Ocurrió un error al mostrar al perro"));