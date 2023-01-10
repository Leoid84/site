// Create by Leandro Gonçalves

// =========== MENU NAV ====================//

const menuToggle = document.querySelector('.menu-toggle');

menuToggle.addEventListener("click", function(){
    let menuNav = document.querySelector('.nav-sidebar');
    let menuIcon = document.querySelector('.menu-icon');
    if( menuNav.classList.contains('show') == true && menuIcon.classList.contains('close') == true ){
        menuNav.classList.remove('show');
        menuIcon.classList.remove('close');
    } else {
        menuNav.classList.add('show');
        menuIcon.classList.add('close');
    }
    
});

// =========== SECTIONS SELECT ====================//


const sections = document.querySelectorAll('section');//
const navLink = document.querySelectorAll('.nav-menu ul li a');

window.addEventListener('scroll', function(){
    let current ='';
    sections.forEach( section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if( scrollY >= ( sectionTop - sectionHeight / 3 )){
            current = section.getAttribute('id')
        }
    });
    navLink.forEach( a =>{
        a.classList.remove('nav-active');
        if( a.classList.contains(current) ){
            a.classList.add('nav-active')
        }
    });
} );


//============== Smooth Scroll ======================== //

// Identificar o clique no menu
// Verificar o item que foi clicado e fazer referência com o alvo
// Verificar a distância entre o alvo e o topo
// Animar o scroll até o alvo

const menuItems = document.querySelectorAll('.scroll[href^="#"]');

function getScrollTopByHref(element) {
	const id = element.getAttribute('href');
	return document.querySelector(id).offsetTop;
}

function scrollToPosition(to) {
  smoothScrollTo(0, to);
}

function scrollToIdOnClick(event) {
	event.preventDefault();
	const to = getScrollTopByHref(event.currentTarget)- 80;
	scrollToPosition(to);
}

menuItems.forEach(navLink => {
	navLink.addEventListener('click', scrollToIdOnClick);
});

// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int) endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};


//============== Mouse Cursor ======================== //

  let cursor = document.querySelector('.cursor');

  document.addEventListener('mousemove', function(e){
      cursor.setAttribute("style", "top:" + (e.pageY - 10) + "px; left:" + (e.pageX -10) + "px" );
  });

  let navOver = document.querySelector('.nav-menu');
 
  navOver.addEventListener('mouseover', function(){
    cursor.classList.add('display');
 });
  navOver.addEventListener('mouseout', function(){
   cursor.classList.remove('display');
 });


//============== Scroll toTop ======================== //

 window.onscroll = function() {scrollTotop()};

function scrollTotop() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector("#btn-toTop").className = "visible";
  } else {
    document.querySelector("#btn-toTop").className = "hidden";
  }
}

//============== Parallax ======================== //


let parallax = document.querySelector('.parallax');
let textpax = document.querySelector('.textpax');

window.addEventListener('scroll', function(){
   let coords = window.scrollY;
   parallax.style.backgroundPositionY = coords * 0.30 + '%';
   textpax.style.top = coords * 0.05 + '%';
});

