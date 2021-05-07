'use strict';

(function () {
  const pageBody = document.querySelector('.page-body');
  const pageHeader = document.querySelector('.page-header');
  const headerToggle = document.querySelector('.page-header__toggle');

  if (pageHeader) {
    pageHeader.classList.remove('page-header--nojs');
  }

  if (headerToggle) {
    headerToggle.addEventListener('click', function (evt) {
      evt.preventDefault();

      if (pageHeader.classList.contains('page-header--active')) {
        pageHeader.classList.remove('page-header--active');
        pageBody.classList.remove('page-body--no-scroll');
      } else {
        pageHeader.classList.add('page-header--active');
        pageBody.classList.add('page-body--no-scroll');
      }
    });
  }
})();

(function () {
  const mainForm = document.querySelector('.main-form');
  const inputForms = document.querySelectorAll('input');

  const addLocalStorage = function (input) {
    let isStorageSupport = true;

    if (isStorageSupport) {
      if (input.type === 'tel' || input.id === 'user-name') {
        let storageKey = input.name;
        localStorage.setItem(storageKey, input.value);
      }
    }
  };

  for (let j = 0; j < inputForms.length; j++) {
    if (mainForm) {
      mainForm.addEventListener('submit', function () {
        addLocalStorage(inputForms[j]);
      });
    }
    if (inputForms[j].type === 'tel') {
      inputForms[j].removeAttribute('maxlength');

      const maskPhone = function (evt) {
        let keyCode = evt.keyCode;
        let matrix = '+7 (___) ___ ____';
        let i = 0;
        let def = matrix.replace(/\D/g, '');
        let value = inputForms[j].value.replace(/\D/g, '');
        let newValue = matrix.replace(/[_\d]/g, function (a) {
          return i < value.length ? value.charAt(i++) || def.charAt(i) : a;
        });
        i = newValue.indexOf('_');
        if (i !== -1) {
          newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, inputForms[j].value.length).replace(/_+/g,
            function (event) {
              return '\\d{1,' + event.length + '}';
            }).replace(/[+()]/g, '\\$&');
        reg = new RegExp('^' + reg + '$');
        if (!reg.test(inputForms[j].value) || inputForms[j].value.length < 5 || keyCode > 47 && keyCode < 58) {
          inputForms[j].value = newValue;
        }
        if (evt.type === 'blur' && inputForms[j].value.length < 5) {
          inputForms[j].value = '';
        }
      };
      inputForms[j].addEventListener('input', maskPhone, false);
      inputForms[j].addEventListener('focus', maskPhone, false);
      inputForms[j].addEventListener('blur', maskPhone, false);
    }

    if (inputForms[j].id === 'user-name') {
      const regex = /[^a-zA-Zа-яА-ЯёЁ .]/i;

      inputForms[j].addEventListener('input', function () {
        inputForms[j].value = inputForms[j].value.replace(regex, '');

        if (inputForms[j].value.match(regex)) {
          inputForms[j].setCustomValidity('Введите буквы');
        }
      });
    }
  }
})();

(function () {
  const videoBikes = document.querySelector('.video-bikes');
  const videoPoster = videoBikes.querySelector('img');
  const playVideoButton = document.querySelector('#video-bikes-play');

  if (videoBikes) {
    videoBikes.classList.remove('video-bikes--nojs');
  }

  if (playVideoButton) {
    playVideoButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      videoPoster.classList.add('visually-hidden');
      playVideoButton.classList.add('visually-hidden');
    });
  }
})();


(function () {
  const contactsMap = document.querySelector('.contacts__map');

  if (contactsMap) {
    contactsMap.classList.remove('contacts__map--nojs');
  }

  if (contactsMap) {
    contactsMap.addEventListener('click', function (evt) {
      evt.preventDefault();
      contactsMap.classList.add('contacts__map--active');
      const iframeMap = document.createElement('iframe');
      iframeMap.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d499.65314281214916!2d30.32264893911616!3d59.9385707348118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4696310fca5ba729%3A0xea9c53d4493c879f!2z0JHQvtC70YzRiNCw0Y8g0JrQvtC90Y7RiNC10L3QvdCw0Y8g0YPQuy4sIDE5LCDQodCw0L3QutGCLdCf0LXRgtC10YDQsdGD0YDQsywgMTkxMTg2!5e0!3m2!1sru!2sru!4v1620037403659!5m2!1sru!2sru';
      iframeMap.allowFullscreen = true;
      iframeMap.title = 'Местоположение на карте магазина Moon';
      contactsMap.append(iframeMap);
    }, {once: true});

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
})();
