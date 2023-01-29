
const pintarCarrito = () => {
    //traigo al padre
    const contCarrito =  document.getElementById("miModal");
    //creo el elem hijo
    const contModal = document.createElement("div")
    //creo la clase
    contModal.classList.add("carrito__cont", "modal-dialog")
    //inserto el bloque html
    contModal.innerHTML = `
    
        <div class="carrito__cont--cont modal-content">
            <div class="carrito__cont--cont-header modal-header">
                <h5 class="carrito__title modal-title" id="#modalTitle">Su Carrito</h5>
                <button type=" button" class="carrito__btnClose btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="carrito__cont--cont-body modal-body">
                <span id=""></span>
                <img class="body__img" src="" alt="producto">
                <h5 class="body__producto" >producto</h5>
                <p class="body__modelo"> modelo</p>
                <p class="body__talle">talle</p>
                <p class="body__color">color</p>
                <p class="body__precio">precio</p>
            </div>
            <div class="carrito__cont--cont-footer modal-footer">
                <!-- <button type="button" class="footer__btnClose btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                <button type="button" class="footer__btnConfirmar btn btn-secondary">Confirmar</button>
            </div>
        </div>
    
    `
    contCarrito.appendChild(contModal);

}
pintarCarrito()