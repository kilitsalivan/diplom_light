window.addEventListener('DOMContentLoaded', function(){
    'use strict';
// Заказать звонок, не нашли услуги
const order = () =>{
    const modalСallback = document.querySelector('.modal-callback'),
            modalOverlay  = document.querySelector('.modal-overlay '),
            body = document.querySelector('body');
    const displayBlock = () => {
        modalСallback.style.display = 'block';
        modalOverlay.style.display = 'block';
    };
    
    const displayClose = () => {
        modalСallback.style.display = 'none';
        modalOverlay.style.display = 'none';
    };  
    
    body.addEventListener('click', (event) =>{
        let target = event.target;
        if (target.closest('#call') || target.matches('.button-services') )
        { displayBlock();
        } else 
            if (target.closest('.modal-close') || target.closest('.modal-overlay '))
                {
                displayClose();
                } 
        }); 
};  
order ();
//слайдер
const slider = () =>{
    const slide = document.querySelectorAll('.item');
    let currentSlide = 0,
    interval;
    const autoPlaySlide = () =>{
        slide[currentSlide].style.display = 'none' ;  
        currentSlide++;
        if (currentSlide >= slide.length){
            currentSlide = 0;
        }
        slide[currentSlide].style.display = 'block' ;
    };
    const startSlide = (time = 3000) =>{
        interval = setInterval (autoPlaySlide,time);
   };
   startSlide();
};
slider();

});