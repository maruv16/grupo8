let BASE_URL = 'http://localhost:5000';
let submitButtonCrear = document.querySelector("#Formulario #Crear");
let submitButtonEditar = document.querySelector("#Formulario #Editar");
let cancelButton = document.querySelector("#Formulario #Cancelar");

let params = new URLSearchParams(document.location.search);
let alimento_id = params.get("alimento_id");
console.log(alimento_id);

function add_new_alimento(event) {
    event.preventDefault();
    
    let data = {
        'nombre': document.querySelector("#Formulario #Titulo").value,
        'marca': document.querySelector("#Formulario #marca").value,
        'descripcion': document.querySelector("#Formulario #descripcion").value
    }

    let url = BASE_URL + '/api/alimentos_balanceados/create/';

    fetchData(url, "POST", () => {
        document.querySelector("#Formulario").reset();
        window.location.replace("../index.html#AlimentosBalanceados");
    }, data);
}

function update_alimento(event) {
    event.preventDefault();
    
    let data = {
        'nombre': document.querySelector("#Formulario #Titulo").value,
        'marca': document.querySelector("#Formulario #marca").value,
        'descripcion': document.querySelector("#Formulario #descripcion").value
    }

    let url = BASE_URL + '/api/alimentos_balanceados/update/' + alimento_id;

    fetchData(url, "PUT", () => {
        document.querySelector("#Formulario").reset();
        window.location.replace("../index.html#AlimentosBalanceados");
    }, data);
}

function cancelar() {
    window.location.href = "../index.html";
}

function set_form_readOnly(value) {
    let form = document.querySelector("#Formulario");
    let elements = form.elements;
    for (let input of elements) { 
        input.readOnly = value;
    }
}

function add_or_update() {
    if (alimento_id !== null) {
        document.querySelector(".actionTitle").innerHTML = "Actualizar alimento";
        set_form_readOnly(false);

        let url = BASE_URL + '/api/alimentos_balanceados/' + alimento_id;
        console.log(url)
        fetchData(url, "GET", (data) => {
            document.querySelector("#Titulo").value = data.nombre;
            document.querySelector("#marca").value = data.marca;
            document.querySelector("#descripcion").value = data.descripcion;
            document.querySelector("#alimento_id").value = data.id;

            set_form_readOnly(false);
        });

        submitButtonCrear.style.display = "none";
        submitButtonEditar.style.display = "block";
        submitButtonEditar.addEventListener("click", update_alimento);
    } else {
        submitButtonEditar.style.display = "none";
        submitButtonCrear.style.display = "block";
        submitButtonCrear.addEventListener("click", add_new_alimento);
    }

    cancelButton.addEventListener("click", cancelar);
}

document.addEventListener('DOMContentLoaded', () => {
    add_or_update();
});