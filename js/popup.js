const popup = document.getElementById("popup");
popup.classList.add("activar");
setTimeout(() => {
    popup.classList.remove("activar");
}, 5000);