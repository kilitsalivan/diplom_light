window.addEventListener('DOMContentLoaded', function(){
    'use strict';
// Заказать звонок
const order = () =>{
    const modalСallback = document.querySelector('.modal-callback'),
            modalOverlay  = document.querySelector('.modal-overlay '),
            body = document.querySelector('body');
         
    body.addEventListener('click', (event) =>{
        let target = event.target;
           if (target.closest('#call'))
        {
            modalСallback.style.display = 'block';
            modalOverlay.style.display = 'block';
        } else 
            if (target.closest('.modal-close') || target.closest('.modal-overlay '))
                {
                modalСallback.style.display = 'none';
                modalOverlay.style.display = 'none';
                } 
        }); 
};  
    order ();
});