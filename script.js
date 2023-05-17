// todo esto de acá empieza la animación del carousel!
const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; 
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; 
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); 
    });
});

const autoSlide = () => {
    
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); 
    let firstImgWidth = firstImg.clientWidth + 14;
    
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { 
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
   
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

//termina el carousel.

//empieza el menú desplegable!
let menuVisible = false;
function mostrarOcultarMenu(){
    if(menuVisible){
        document.getElementById("nav").classList ="";
        menuVisible = false;
    }else{
        document.getElementById("nav").classList ="responsive";
        menuVisible = true;
    }
}
function seleccionar(){
    document.getElementById("nav").classList = "";
    menuVisible = false;
}
//termina el menú

//empieza la validación de contactos!

const formulario = document.getElementById('formulario-contacto');
const nombre = document.getElementById('nombre');
const telefono = document.getElementById('telefono');
const correo = document.getElementById('correo');
const tema = document.getElementById('tema');
const mensaje = document.getElementById('mensaje');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault(); // Evita que se envíe el formulario de forma automática

  if (nombre.value === '') {
    alert('Por favor, ingresa tu nombre.');
    nombre.focus();
    return false;
  }

  const expresionRegularTelefono = /^[0-9]{10}$/;
  if (!expresionRegularTelefono.test(telefono.value)) {
    alert('Por favor, ingresa un número de teléfono válido (no incluyas el código de área).');
    telefono.focus();
    return false;
  }

  const expresionRegularCorreo = /^\S+@\S+\.\S+$/;
  if (!expresionRegularCorreo.test(correo.value)) {
    alert('Por favor, ingresa un correo electrónico válido.');
    correo.focus();
    return false;
  }

  if (tema.value === '') {
    alert('Por favor, ingresa un tema para el mensaje.');
    tema.focus();
    return false;
  }

  if (mensaje.value === '') {
    alert('Por favor, ingresa un mensaje.');
    mensaje.focus();
    return false;
  }

  // Si todos los campos son válidos, se envía el formulario
  alert('Formulario enviado exitosamente!');
  formulario.reset();
});