'use strict';

const pageHeader = document.querySelector('.page-header');
const headerToggle = document.querySelector('.page-header__toggle');
const mainForm = document.querySelector('.main-form');
const mainFormSubmitButton = mainForm.querySelector('button');
const videoBikes = document.querySelector('.video-bikes');
const videoPoster = videoBikes.querySelector('img');
const playVideoButton = document.querySelector('#video-bikes-play');
const inputForms = document.querySelectorAll('input');
const contactsMap = document.querySelector('.contacts__map');

pageHeader.classList.remove('page-header--nojs');
videoBikes.classList.remove('video-bikes--nojs');
contactsMap.classList.remove('contacts__map--nojs');

headerToggle.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (pageHeader.classList.contains('page-header--active')) {
    pageHeader.classList.remove('page-header--active');
  } else {
    pageHeader.classList.add('page-header--active');
  }
});

let isStorageSupport = true;
let storagePhone = '';
let storageUserName = '';

try {
  storagePhone = localStorage.getItem('phone');
  storageUserName = localStorage.getItem('user-name');
} catch (err) {
  isStorageSupport = false;
}

const addLocalStorage = () => {
  if (isStorageSupport) {
    for (let i = 0; i < inputForms.length; i++) {
      if (inputForms[i].type === 'tel' || inputForms[i].id === 'user-name') {
        let storageKey = inputForms[i].name;
        localStorage.setItem(storageKey, inputForms[i].value);
      }
    }
  }
}

mainForm.addEventListener('submit', function(evt) {
  addLocalStorage();
});

playVideoButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  videoPoster.classList.add('visually-hidden');
  playVideoButton.classList.add('visually-hidden');
});

for (let i = 0; i < inputForms.length; i++) {
  if (inputForms[i].type === 'tel') {
    inputForms[i].removeAttribute('maxlength');
    let keyCode;

    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let position = this.selectionStart;
      if (position < 3) event.preventDefault();

      let matrix = "+7 (___) ___ ____",
        i = 0,
        def = matrix.replace(/\D/g, ""),
        val = this.value.replace(/\D/g, ""),
        newValue = matrix.replace(/[_\d]/g, function (a) {
          return i < val.length ? val.charAt(i++) || def.charAt(i) : a
        });
      i = newValue.indexOf("_");
      if (i != -1) {
        i < 5 && (i = 3);
        newValue = newValue.slice(0, i)
      }
      let reg = matrix.substr(0, this.value.length).replace(/_+/g,
        function (evt) {
          return "\\d{1," + evt.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    inputForms[i].addEventListener("input", mask, false);
    inputForms[i].addEventListener("focus", mask, false);
    inputForms[i].addEventListener("blur", mask, false);
  }

  if (inputForms[i].id === 'user-name') {
    const regex = /[^a-zA-Zа-яА-ЯёЁ .]/i;

    inputForms[i].addEventListener('input', function () {
      this.value = this.value.replace(regex, '');
    })
  }
};

{
  contactsMap.addEventListener('click', function(evt) {
    evt.preventDefault();
    contactsMap.classList.add('contacts__map--active');
    const iframeMap = document.createElement('iframe');
    iframeMap.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d499.65314281214916!2d30.32264893911616!3d59.9385707348118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696310fca5ba729%3A0xea9c53d4493c879f!2z0JHQvtC70YzRiNCw0Y8g0JrQvtC90Y7RiNC10L3QvdCw0Y8g0YPQuy4sIDE5LCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywgMTkxMTg2!5e0!3m2!1sru!2sru!4v1620037403659!5m2!1sru!2sru"
    iframeMap.allowFullscreen = true;
    iframeMap.title = 'Местоположение на карте магазина Moon';
    contactsMap.append(iframeMap);
  }, { once: true });


  document.addEventListener('click', function (evt) {
    const map = document.querySelector('#map-wrap iframe');
    if (map) {
      if (evt.target.id === 'map-wrap') {
        map.style.pointerEvents = 'all';
      } else {
        map.style.pointerEvents = 'none';
      }
    }
  });
}
