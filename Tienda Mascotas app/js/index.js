let BASE_URL = 'http://localhost:5000';

let filterButtons = {
    "Listado": document.querySelector("#VerListadoAlimentos"),
    "Limpiar": document.querySelector("#LimpiarListado")
}


let alimentoContainer = document.querySelector(".alimentos-container");

let alimentoListadoTemplateReference = document.querySelector(".alimento.listado.template");

let alimentosTemplates = {
    "Listado": alimentoListadoTemplateReference.cloneNode(true),
};

alimentoListadoTemplateReference.remove();

function loadAlimentos() {
    console.log("Loading alimentos...");
    let url = BASE_URL + '/api/alimentos_balanceados/lista/';
    fetchData(url, "GET", (data) => {
        let alimentos = [];
        for (const alimento of data) {
            let newAlimento = alimentosTemplates["Listado"].cloneNode(true);
            newAlimento.querySelector(".titulo").innerHTML = alimento.nombre;
            newAlimento.querySelector(".marca").innerHTML = alimento.marca;
            newAlimento.querySelector(".descripcion").innerHTML = alimento.descripcion;
            newAlimento.querySelector(".fecha").innerHTML = alimento.fecha_creacion;
            newAlimento.querySelector(".alimento_id").value = alimento.id;

            let eliminarAction = newAlimento.querySelector("#Eliminar");
            let editarAction = newAlimento.querySelector("#Editar");

            if (eliminarAction) {
                eliminarAction.addEventListener("click", () => deleteAlimento(alimento.id));
            }

            if (editarAction) {
                editarAction.addEventListener("click", () => editAlimento(alimento.id));
            }

            alimentos.push(newAlimento);
        }

        alimentoContainer.innerHTML = '';
        alimentos.forEach(alimento => alimentoContainer.appendChild(alimento));
    });
}

function deleteAlimento(id) {
    let url = BASE_URL + '/api/alimentos/' + id;
    fetchData(url, "DELETE", () => {
        loadAlimentos(); 
    });
}

function editAlimento(id) {
    window.location.replace("pages/add_update_alimento.html?alimento_id=" + id);
}

function limpiarListado() {
    console.log("Limpiando listado...");
    alimentoContainer.innerHTML = "";
}

// Función para establecer filtros y manejar eventos
function setActiveFilter(event) {
    for (let filter in filterButtons) {
        filterButtons[filter].classList.remove("active");
    }
    event.currentTarget.classList.add("active");

    if (event.currentTarget.filterName === "Listado") {
        loadAlimentos();
    } else if (event.currentTarget.filterName === "Limpiar") {
        limpiarListado();
    }
}
function setFilters() {
    for (let button in filterButtons) {
        filterButtons[button].addEventListener("click", setActiveFilter);
        filterButtons[button].filterName = button;
    }
}

setFilters();
loadAlimentos();
