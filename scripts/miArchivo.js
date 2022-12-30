let nombreForm = document.querySelector("#nombre");
let correoForm = document.querySelector("#correo");

// Transformamos a Json el array de objetos y subida a localStorage
let clientesDatos=[
    {nombre:"Carlos",correo:"carlos@gmail.com"},
    {nombre:"Juan",correo:"Juan2022@gmail.com"}
]
const aJson = JSON.stringify(clientesDatos)

localStorage.setItem("clientesDatos", aJson)

//eventos
nombreForm.addEventListener("input", function(){
    if (nombreForm.value===""){
        alert("Ingrese un nombre por favor")
    }
});
correoForm.addEventListener("input", function(){
    if (correoForm.value===""){
        alert("ingrese un correo valido por favor")
    }
});
 
let formulario = document.querySelector("#formulario")

let info = document.querySelector("#printForm")

// mostrar info del form, bajada de array desde el local storage, push de datos ingresados del imput y subida de nuevo al local storage como archivo json

const printInfo= formulario.addEventListener("submit", function(e){
    e.preventDefault();
    info.innerHTML=`
    <div class="alert alert-primary" role=alert">
    <h5>Gracias ${nombreForm.value} por dejarnos tus datos, te contactaremos a ${correoForm.value} para solucionar tus dudas</h5>
    </div>
    `
    const usuario = {
        nombre: `${nombre.value}`,
        correo: `${correo.value}`
    }
    
    const agregarUsu= JSON.parse(localStorage.getItem("clientesDatos"))
        agregarUsu.push(usuario)
        localStorage.setItem("datosClientes", JSON.stringify(agregarUsu))

})

//buscador de productos
const productos = [
    {id: 12, nombre: 'CAMISETA BOCA', importe: 30000},
    {id: 11, nombre: 'CAMISETA RIVER', importe: 30000},
    {id: 47, nombre: 'GORRA BOCA ', importe: 5000},
    {id: 20, nombre: 'GORRA RACING', importe: 5000},
    {id: 50, nombre: 'CAMISETA BRASIL', importe: 25000},
    {id: 58, nombre: 'PELOTA MUNDIAL 2022', importe: 15000}]

    const inputBusqueda = document.querySelector("#inputSearch")
    const tablebody = document.querySelector("tbody")
    
    
    const armarTabla = (prod)=> {
        return `<tr>
                    <td>${prod.id}</td>
                    <td>${prod.nombre}</td>
                    <td>${prod.importe}</td>
                </tr>`
    }
    
    const filtrarProductos = ()=> {
        let parametro = inputBusqueda.value.trim().toUpperCase()
        let resultado = productos.filter(prod => prod.nombre.includes(parametro))
            if (resultado.length > 0) {
                subirProductos(resultado)
            }
    }
    
    const subirProductos = (array)=> {
        let tabla = ""
        if (array.length > 0) {
            array.forEach(prod => {
                tabla += armarTabla(prod)
            })
            tablebody.innerHTML = tabla
        }
    }
    subirProductos(productos)
    
    inputBusqueda.addEventListener("search", filtrarProductos)
    