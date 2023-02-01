//traigo al contenedor padre
const contenedorProductos = document.getElementById("cardProductos")
const contenedorCarrito = document.getElementById("carritoContenedor")
const btnVaciarCarrito = document.getElementById("vaciarCarrito")
const contadorCarrito = document.getElementById("contadorCarrito")
const totalProductos = document.getElementById("precioTotal")
const btnConjunto = document.getElementById("btn-conjunto")
const btnTop = document.getElementById("btn-top")
const btnBombis = document.getElementById("btn-bombis")
let carrito = []

//recorro elarray
function pintarCrad(){
    productos.forEach(elProducto => {
        //creo el elem contenedor hijo
        const contenedorCard =  document.createElement("div")
        //creo su clase
        contenedorCard.classList.add("productos__contenedorGral--contCard", "col")
        contenedorCard.innerHTML = `
            <div class="productos__contenedorGral--contCard-card card h-100">
                <img class="img__card card-img-top" src=${elProducto.img} alt="producto lenceria">
                <div class="contenedor__body card-body">
                    <div class="contenedor__body--info ">
                        <h2 class="contenedor__body--info--titulo card-title fs-4">${elProducto.titulo}</h2> 
                        <p class="contenedor__body--info--precio card-text fs-5 fw-semibold">$ ${elProducto.precio}</p>                   
                    </div>
                    <hr><p class="contenedor__body--info--precio card-text fs-6">Los talles disponibles
                    son<span class="fw-semibold mx-2">S - M - L - XL</span>y los podes elejir en
                    <span class="fw-semibold">Blanco - Negro - Gris - Beige - Rojo - Fuxia - Estampados</span></p> 
                    <button id="agregar${elProducto.id}" class="contenedor__body--btn btn btn-secondary text-dark">Agregar al carrito</button>
                </div>
            </div>  
       `
        //agrego los elementos al padre
        contenedorProductos.appendChild(contenedorCard);
        //se produce el evento del click en el boton
        const btnAgregar = document.getElementById(`agregar${elProducto.id}`)
        btnAgregar.addEventListener("click", () =>{
            //por cada click en un boton se agrega el producto
            agregarAlCarrito(elProducto.id)
            
        })
    }) 
}
pintarCrad()

//por parametro le doy el id del prod
const agregarAlCarrito = (prodId) => {
    //para no repetir el producto
    const existe = carrito.some(prod => prod.id === prodId)
    

    if(existe){
        //encuentro el producto agregado y le sumo la cantidad
        const prod = carrito.map(prod => {
            if(prod.id === prodId){
                prod.cantidad ++                
            }
        })
    }else{
        //voy a comparar que el id del array coincida con el que recibe por parametro
        const item = productos.find((prod) => prod.id === prodId)
        carrito.push(item)
        //console.log(carrito)
    }
    actualizarCarrito()
}
//elimina los del carrito no los del stock
const eliminarDelCarrito = (prodId) =>{
    //obtengo el elem del array
    const itemCarrito = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(itemCarrito)
    carrito.splice(indice, 1)
    actualizarCarrito()
}

const actualizarCarrito = () =>{
    //cada vez que llamo a la funcio borro el nodo y lo inicio vacio
    contenedorCarrito.innerHTML = ""
    //recorre el array y lo llena con info actualizada
    carrito.forEach((arrayCarrito) => {
        const contItemsCarrito = document.createElement("div")
        contItemsCarrito.classList.add("carritoBody", "row")
        contItemsCarrito.innerHTML = `
            <p class="body__producto col">${arrayCarrito.titulo}</P>
            <p class="body__precio col">Precio: ${arrayCarrito.precio}</p>
            <p class="body__cant col">Cantidad: <span id="cantidad">${arrayCarrito.cantidad}</span></p>
            
            <a id="eliminarDelCarrito${arrayCarrito.id}" class="body__btnElim col text-center "><i class="bi bi-trash3"></i></>
        `
        contenedorCarrito.appendChild(contItemsCarrito)

        //elimino uno a uno los elementos del carrito
        const btnElim = document.getElementById(`eliminarDelCarrito${arrayCarrito.id}`)
        btnElim.onclick = () => {
            //console.log("elimino")
            eliminarDelCarrito()
        }
        
    })

    
    contadorCarrito.innerText = carrito.length
    //por cada producto, el acumulador le sume precio al prod 
    totalProductos.innerText = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}



//vaciar carrito
btnVaciarCarrito.addEventListener("click", () => {
    carrito.length = 0;
    actualizarCarrito()
})



//filtrar por categoria
// const filtrarCateg = productos.filter((elem) => elem.categoria.nombre.includes("Conjuntos"))
// const filtrarCateg2 = productos.filter((elem) => elem.categoria.nombre.includes("Top"))
// const filtrarCateg3 = productos.filter((elem) => elem.categoria.idCat.includes("Bombis"))
// const prod = [
//     {nombre: "arroz", precio: 500},
//     {nombre: "harina", precio: 300},
//     {nombre: "papa", precio: 800},
//     {nombre: "arroz", precio: 300},
//     {nombre: "arroz", precio: 1500},
//     {nombre: "arroz", precio: 1000},
//     {nombre: "arroz", precio: 2000},
// ]

//const producto = prod.filter((element) => element.nombre.includes("arroz"))