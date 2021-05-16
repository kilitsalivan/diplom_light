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

const getmainForm = () =>{
  const	userName = document.querySelectorAll('[name="fio"]'),
        userPhone = document.querySelectorAll('[name="tel"]'); 
       
  const mainFormInput = (elem) => {
       
    elem.addEventListener('input',(event)=>{
          let target = event.target;
    if (target.name === 'tel' ) {
        target.value = target.value.replace(/[^0-9+]/ig, '');
    }else if (target.type === 'text' && target.name === 'fio') {
      target.value = target.value.replace(/[^а-яА-ЯЁё\.\,\;\:\!\?\-\(\)\ ]/, '');
    }
    });
    } ;
  userName.forEach((elem) =>{
      mainFormInput(elem);
    }); 
  userPhone.forEach ((elem) =>{
      mainFormInput(elem);
  }); 
//фокус
const getInputs = (input, exp) => {
if (!!input.value.match(exp)) {
        input.value = input.value.replace(exp, '');
} else {
  return;
}
};

const getClear = (item) => {
item.value = item.value.replace(/\s+/g, ' ');
item.value = item.value.replace(/\-+/g, '-');
  
let regExpElem = new RegExp(item.value);
  if (/^[/ /-]/.test(regExpElem)) {
    item.value = item.value.replace(/^[/ /-]/, '');
  }
  if(/[/ /-]$/.test(regExpElem)) {
    item.value = item.value.replace(/[/ /-]$/, '');
  }
};

const getUpperCase = (elem) => {
    let upperCase = elem.value;
  return upperCase.split(' ').map(item =>item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
};

userName.forEach((elem) => {
  elem.addEventListener('blur', () => {
    getInputs(elem, /[^а-яА-ЯЁё\-\ ]/);
    getClear(elem);
      elem.value = getUpperCase(elem);
  });
});

};
getmainForm();

//отправка формы
const sendForm = (id) => {
  const errorMessage = 'Что то пошло не так...',
        loadMessage = 'Идет отправка...',
        succesMessage = 'Cпасибо! Мы скоро с вами свяжемся!';
        const form = document.getElementById(id);
        
  const statusMessage = document.createElement ('div');
        statusMessage.style.cssText = 'font-size: 2rem; color: black;';
              
  form.addEventListener('submit', (event) => {
      event.preventDefault();
  form.appendChild(statusMessage);
      
  const clearInput = (elem) => {
        const form = document.getElementById(elem);
        [...form.elements].filter(item =>
            item.tagName.toLowerCase() !== 'button' && item.type !== 'submit').forEach(item => item.value = '');
              };
  
      statusMessage.textContent = loadMessage;          

const formData = new FormData(form);
  
    postData(Object.fromEntries(formData))
    .then((response) => {
        if (response.status !== 200){
          throw new Error ('status network not 200');
          }
        statusMessage.textContent = succesMessage;
        clearInput(id);
        setTimeout(() => {
          statusMessage.textContent = '';
          let modalСallback = document.querySelector('.modal-callback'),
              modalOverlay  = document.querySelector('.modal-overlay ');
              modalСallback.style.display = 'none';
              modalOverlay.style.display = 'none';
               }, 3000);  
      }) 
      .catch ((error) =>{
        statusMessage.textContent = errorMessage;  
        console.error(error);
        setTimeout(() => {
          statusMessage.textContent = '';
         let modalСallback = document.querySelector('.modal-callback'),
             modalOverlay  = document.querySelector('.modal-overlay ');
             modalСallback.style.display = 'none';
             modalOverlay.style.display = 'none';
              }, 3000);
      });
});
const postData = (body) =>{
return fetch ('./server.php',{
   method: 'POST',
   headers:{'Content-Type': 'application/json'
  },
  body:JSON.stringify(body)
}); 
};
};
sendForm ('form1', getmainForm);
sendForm ('form2', getmainForm);

//accordion
const accordionBlok = () =>{
    let accordeon = document.querySelector('.accordeon'),
        accordeonTitle = accordeon.querySelectorAll('.title'),
        elementContent = accordeon.querySelectorAll('.element-content');
  
const getAccordeon = (index) => {
      for (let i = 0; i < elementContent.length; i++) {
          if (index === i) {
            accordeonTitle[i].parentElement.classList.add('active');
            elementContent[i].style.display = 'block';
          } else {
            accordeonTitle[i].parentElement.classList.remove('active');
            elementContent[i].style.display = 'none';
          }
      }
  };

  accordeon.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('title')) {
          accordeonTitle.forEach( (item, i) => {
            if(item === target) {
                  getAccordeon(i);
              }
          });
      }
  });
};
accordionBlok();
});