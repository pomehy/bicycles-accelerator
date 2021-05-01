'use strict';

const pageHeader = document.querySelector('.page-header');
const headerToggle = document.querySelector('.page-header__toggle');
const mainForm = document.querySelector('.main-form');
const mainFormSubmitButton = mainForm.querySelector('button');
const videoBikes = document.querySelector('.video-bikes');
const videoPoster = videoBikes.querySelector('img');
const playVideoButton = document.querySelector('#video-bikes-play');
const inputForms = document.querySelectorAll('input');

pageHeader.classList.remove('page-header--nojs');
videoBikes.classList.remove('video-bikes--nojs');

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
    let keyCode;

    function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      let startPosition = this.selectionStart;
      if (startPosition < 3) event.preventDefault();

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
        function (a) {
          return "\\d{1," + a.length + "}"
        }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
      if (event.type == "blur" && this.value.length < 5) this.value = ""
    }

    inputForms[i].addEventListener("input", mask, false);
    inputForms[i].addEventListener("focus", mask, false);
    inputForms[i].addEventListener("blur", mask, false);
  }
};
