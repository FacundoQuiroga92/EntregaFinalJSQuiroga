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

    // inicio seccion carrito y eventos
    const shopContent = document.querySelector("#carrito")
    const verCarrito = document.querySelector(".ver-carrito")
    const modalContainer = document.querySelector("#modal-container")
    //bajada de json
    let carrito= JSON.parse(localStorage.getItem("carrito")) || [];
    //fetch - async - await 
    const getProducts = async () => {
        const response =await fetch("./json/stock.json")
        const data = await response.json()
        

        data.forEach((prods)=>{

            let content = document.createElement("div")
            content.className = "card"
            content.innerHTML =`
            <img src=" ${prods.img}">
            <h5>${prods.nombre}</h5>
            <p class="price"> ${prods.importe} </p>
            `;
    
            shopContent.appendChild(content);
    
            let comprar = document.createElement("button")
            comprar.innerText = "agregar";
            comprar.className = "agregar"
    
            content.appendChild(comprar); 
    
            comprar.addEventListener("click",()=>{
    
                const repeat = carrito.some((repeatProduct)=> repeatProduct.id === prods.id)
    
                if(repeat){
                    carrito.map((prod)=>{
                        if(prod.id === prods.id){
                            prod.cantidad++
                        }
                    })
                }else{
                    carrito.push({
                        id : prods.id,
                        img: prods.img,
                        nombre: prods.nombre,
                        importe: prods.importe,
                        cantidad: prods.cantidad,
                    })
                    saveLocal()
                }
            
            } )
        });
    }
    getProducts()
 
    
        const pintarCarrito = ()=>{
        limpiarHTML()
        modalContainer.style.display="flex"
        const modalHeader = document.createElement("div")
        modalHeader.className = "modal-header"
        modalHeader.innerHTML = `
        <h2 class="modal-header-title">Carrito</h2>
        `
        modalContainer.appendChild(modalHeader)
        const modalButton = document.createElement("button")
        modalButton.innerText ="X"
        modalButton.className="modal-header-button"

        modalButton.addEventListener("click",()=>{
            modalContainer.style.display="none"
        })

        modalHeader.appendChild(modalButton)

        carrito.forEach((product) =>{
            let carritoContent = document.createElement("div")
            carrito.className = "modal-content"
            carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>${product.importe} $</p>
            <span class="restar"> restar unidad- </span>
            <p>Cantidad:${product.cantidad} </p>
            <span class="sumar"> sumar unidad+ </span>
            <p class="finish">Total de este Producto:${product.cantidad * product.importe} </p>
            <button class="delete-product"> eliminar producto </button>
            `

            modalContainer.appendChild(carritoContent)

            
            // uso de sweet alert
            let msjEliminarProducto = carritoContent.querySelector(".delete-product")
            msjEliminarProducto.addEventListener("click", ()=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Producto Eliminado',
                    
                  })
            })

            //boton restar productos y uso de sintaxis avanzada
            let restar = carritoContent.querySelector(".restar")

            restar.addEventListener("click", () => {
                if(product.cantidad !==1){
                    product.cantidad--
                }
                saveLocal()
                pintarCarrito()
            })
            //boton sumar productos y uso de sintaxis avanzada
            let sumar = carritoContent.querySelector(".sumar")
            sumar.addEventListener("click", () => {
                product.cantidad++
                saveLocal()
                pintarCarrito()
            })

            let eliminar = carritoContent.querySelector(".delete-product")
            eliminar.addEventListener("click", ()=>{
                eliminarProducto(product.id)
            })
        })
        
        

        const total = carrito.reduce((acc, el) => acc + el.importe * el.cantidad, 0)
        const totalBuying= document.createElement("div")
        totalBuying.className="total-content"
        totalBuying.innerHTML=`Finalizar compra Total de: ${total}$`
        modalContainer.appendChild(totalBuying)

        //se limpia el html al finalizar compra

        let finish = document.querySelector(".total-content")
        finish.addEventListener("click", limpiarHTML)
    }

    function limpiarHTML() {
        modalContainer.innerHTML = "";
      }
    
    verCarrito.addEventListener("click", pintarCarrito)

    //eliminar productos del carrito
    const eliminarProducto = (id) =>{
        const foundId = carrito.find((element)=> element.id === id)

        carrito = carrito.filter((carritoId)=>{
            return carritoId !== foundId
        })

        saveLocal()
        pintarCarrito()
    }

    //local storage set item
    function saveLocal(){
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }

    
    