//CARRIOOOO

const printCarrito = () => {

    modalConteiner.innerHTML = "";
    modalConteiner.style.display = "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
    <h1 class="modalTitulo">Tu Compra</h1>
    `
    modalConteiner.append(modalHeader);

    const modalButton = document.createElement("h2");
    modalButton.innerHTML = "CERRAR";
    modalButton.className = "modal-button";

    modalButton.addEventListener("click", () => {
        modalConteiner.style.display = "none";
    });

    modalHeader.append(modalButton);
    //BOTON TERMINAR COMPRAR
    const terminarCompra = document.createElement("h2");
    terminarCompra.innerHTML = `<h2 id="compraBott" >Terimar Compra</h2>`;
    terminarCompra.className = "compraBoton";
    modalConteiner.append(terminarCompra)
    //SWEET ALERT
    terminarCompra.addEventListener("click", async () => {
        if (carrito.length <= 0) {
            Swal.fire('Carrito Vacio')
        } else {
            const { value: email } = await Swal.fire({
                title: 'Ingresa Tu Mail Para Enviar El Formualrio De Compra',
                input: 'email',
                inputLabel: 'Your email address',
                inputPlaceholder: 'ingresa Tu Mail'
            })
            if (email) {
                Swal.fire(`Entered email: ${email}`)
            }
        }
    },)
    //AGREGAR PRODUCTOS AL CARRITO
    carrito.forEach((cardJuegos, index) => {

        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
    <img class= "portadas" src="${cardJuegos.img}"></img>
    <h3 class= "tituloClass2">${cardJuegos.titulo}</h>
    <p class= "precioClass2">${cardJuegos.precio}$</p>
    `;
        modalConteiner.append(carritoContent);
        guardarCarrito()
        //ELIMINAR DEL CARRITO 

        let eliminar = document.createElement("h3");
        eliminar.innerText = "🗑";
        eliminar.className = "eliminarCarrito";
        eliminar.addEventListener("click", () => {
            carrito.splice(index, 1);
            modalConteiner.innerHTML = "";
            printCarrito();
        });
        carritoContent.append(eliminar);




    })
    guardarCarrito()

    //CONTADOR DE CARRITO AGREGADO ACÁ
    addContador()



    //Suma de las cards ingresadas al carrito

    //AGREGADO DE "API"

    const suma = carrito.reduce((acc, el) => acc + el.precio, 0);

    fetch("https://api.bluelytics.com.ar/v2/latest")
        .then(response => response.json())
        .then(result => {
            const valorBlue = result.blue.value_avg;
            const totalEnPesos = valorBlue * suma;
            const totalCompra = document.createElement('div');
            totalCompra.className = "total-content";
            totalCompra.innerHTML = `
                <h1>Total a pagar USD$ ${suma}</h1>
                <h2>Total a pagar Pesos$ ${totalEnPesos}</h2>
            `;
            modalConteiner.append(totalCompra);
        })
        .catch(error => console.error('Error', error));










}

verCarrito.addEventListener('click', printCarrito)







//guardar carrito en localStorage
const guardarCarrito = () => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}


//contador del carrito (sugar syntax)

const addContador = () => {
    contador.style.display = carrito.length <= 0 ? "none" : "block";
    contador.innerText = carrito.length <= 0 ? "" : carrito.length;
}

