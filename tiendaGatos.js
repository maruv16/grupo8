let gatito = document.querySelector("#catContainer");
let gatitoCopia = gatito.cloneNode(true);

let contenedor = document.querySelector("article");
gatito.remove()

    fetch("https://api.thecatapi.com/v1/images/search?limit=10")
        .then( response => response.json())
        .then(data => { 
            //procesamiento de la info que llega de la API
            
            let nuevoGatito = gatitoCopia.cloneNode(true);
            nuevoGatito.querySelector("#imagen_gato").src = data.results[0].url;
            nuevoGatito.querySelector("#imagen_gato").alt = "foto de gatito";
            contenedor.appendChild(nuevoGatito);
            
            //console.log(data.results[0].url);
        })
    .catch (error => console.log("Ocurrió un error al mostrar al gato"));
