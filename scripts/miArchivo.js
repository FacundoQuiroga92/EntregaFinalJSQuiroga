/* SIMULACION DE TIENDA DE GORRAS Y TERMOS DE EQUIPOS DE FUTBOL */

/*Bienvenida con entrada de datos*/
function bienvenida(){
    let nombre = prompt("Por favor ingrese su nombre")
    alert(`bienvenido a mundo deportivo ${nombre}`)
}
bienvenida()

/* utilizacion de constructor */
class cliente {
    constructor(nombre, correo){
        this.nombre = nombre;
        this.correo = correo;
    }
    mostrarValidacion(){
        console.log("usuario:"+this.nombre+" tu correo:"+this.correo+" fue validado con exito")
    }
}

const cliente1 = new cliente ("lionel", "lio10@gmail.com")
cliente1.mostrarValidacion()

/* Utilizacion de array con objetos */
const productos = [ 
    {id:1, nombre: "gorra de river", precio: 2000 },
    {id:2, nombre: "gorra de boca", precio: 2000 },
    {id:3, nombre: "termo de boca" , precio : 3500},
    {id:4, nombre: "termo de river" , precio: 3000},
    {id:5, nombre: "termo de racing" , precio: 1100},
    {id:6, nombre: "gorra de independiente" , precio: 1100},
    {id:7, nombre: "gorra de gimnasia de la plata" , precio: 800},
    {id:8, nombre: "termo de estudiantes" , precio: 1000},
]

/* utilizacion de metodos */
productos.forEach((producto) => {
    console.log (producto.nombre);
    console.log (producto.precio);
})

let gorras = productos.filter((p) => p.nombre.includes ("gorra")) ;
console.log(gorras);

let noTermoR = productos.filter((p) => p.nombre !== "termo de racing") ;
console.log(noTermoR);

let mejorPrecio = productos.find((p)=>p.precio < 1000)
console.log(mejorPrecio)

/* total de la compra */
const totalCarrito = productos.reduce((acumulador,producto) => acumulador + producto.precio, 0)
console.log(totalCarrito);

