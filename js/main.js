// PREENTREGA VENTA DE AUTOS

const JuegosEnVenta = function (titulo, categoria, year, precio, img) {
    this.titulo = titulo;
    this.categoria = categoria;
    this.year = year;
    this.precio = precio;
    this.img = img;
}

// AUTOS EN VENTA

let juego1 = new JuegosEnVenta("Baldurs Gate 3", "Rol", 2023, 40, "img/img1.jpg");
let juego2 = new JuegosEnVenta("Remnant", "Acción", 2023, 39, "img/img2.jpg");
let juego3 = new JuegosEnVenta("Europa IV", "Estrategia", 2022, 25, "img/img3.jpg");
let juego4 = new JuegosEnVenta("Atlas Fallen", "Acción", 2023, 15, "img/img4.jpg");
let juego5 = new JuegosEnVenta("13 Origin", "Indie", 2023, 10, "img/img5.jpg");
let juego6 = new JuegosEnVenta("Mega City Police", "Rougelike", 2023, 25, "img/img6.jpg");
let juego7 = new JuegosEnVenta("Wo Long", "Aventura", 2023, 50, "img/img7.jpg");
let juego8 = new JuegosEnVenta("Backrooms Doors", "Rpg Indie", 2023, 7, "img/img8.jpg");
let listaDeJuegos = [juego1, juego2, juego3, juego4, juego5, juego6, juego7, juego8];







const cartas = document.getElementById("cartas");
const verCarrito = document.getElementById("verCarrito");
const modalConteiner = document.getElementById("modalConteiner");
const contadorCarrito = document.getElementById("contador");



//Agregamos con InnerHTML las Cards

//Pedir al local Storage "carrito"
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


listaDeJuegos.forEach((cardJuegos) => {
    let contenido = document.createElement("li");
    contenido.classList.add("cartasHijo");
    contenido.innerHTML = `
    <h3 class="tituloClass">${cardJuegos.titulo.toUpperCase()}</h3>
    <h4 class="categoriaClass">${cardJuegos.categoria}</h4>
    <h4 class="yearClass">${cardJuegos.year}</h4>
    <img class="imagenCard" src="${cardJuegos.img}" alt="${cardJuegos.titulo} ${cardJuegos.categoria}">
    <h4 class="precioClass">USD$ ${cardJuegos.precio}</h4>
    
    
`;

    cartas.append(contenido);

    let comprar = document.createElement("button");
    comprar.innerText = "Comprar";
    comprar.className = "btnAgregar";

    comprar.addEventListener("click", () => {
        carrito.push({
            titulo: cardJuegos.titulo,
            categoria: cardJuegos.categoria,
            img: cardJuegos.img,
            precio: cardJuegos.precio,
        });


        //CONTADOR DE CARRITO AGREGADO ACÁ
        addContador()

        //AGREGANDO TOSTIFIE AL BOTON DE COMPRA
        Toastify({
            text: "Agregado al Carrito",
            className: "info",
            duration: 1000,
            style: {
                background: "linear-gradient(to right, #3B393B, #DB00FF)",
            }

        }).showToast();
        console.log("Carrito:", carrito);
    });

    contenido.appendChild(comprar);
    cartas.appendChild(contenido);
});


//Filtro de Busqueda

document.addEventListener("keyup", e => {
    if (e.target.matches("#buscador")) {
        const searchTerm = e.target.value.toUpperCase();
        const cartasHijo = document.querySelectorAll(".cartasHijo");

        cartasHijo.forEach(auto => {
            const autoText = auto.textContent.toUpperCase();
            auto.style.display = autoText.includes(searchTerm) ? "block" : "none";
        });
    }
});



