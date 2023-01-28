
const pintarProductos = () =>{
    //traigo al contenedor padre
    const contenedorProducto = document.getElementById("cardProductos")
    //recorro elarray
    stokDeProductos.forEach(arrayProducto => {
        //creo el elem contenedor hijo
        const contenedorCard =  document.createElement("div")
        //creo su clase
        contenedorCard.classList.add("productos__contenedorGral--contCard", "col")
        contenedorCard.innerHTML = `
            <div class="productos__contenedorGral--contCard-card card h-100">
                <img class="img__card card-img-top" src=${arrayProducto.img} alt="producto lenceria">
                <div class="contenedor__info card-body">
                    <h5 class="contenedor__info--titulo card-title fs-3">${arrayProducto.producto} 
                    <span class=" fs-5 text-secondary "> - ${arrayProducto.modelo}</span></h5>
                    <p class="contenedor__info--precio card-text fs-4">$ ${arrayProducto.precio}</p>
                    <a href="#" class="contenedor__info--btn btn btn-secondary link-dark">Agregar al carrito</a>
                </div>
            </div>
        `
        //agrego los elementos al padre
        contenedorProducto.appendChild(contenedorCard);

    })   
}

pintarProductos()