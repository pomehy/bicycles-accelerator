'use strict';

const pageHeader = document.querySelector('.page-header');
const headerToggle = document.querySelector('.page-header__toggle');
const videoBikes = document.querySelector('#video-bikes');
const videoPoster = videoBikes.querySelector('img');
const playVideoButton = document.querySelector('#video-bikes-play');

pageHeader.classList.remove('page-header--nojs');

headerToggle.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (pageHeader.classList.contains('page-header--active')) {
    pageHeader.classList.remove('page-header--active');
  } else {
    pageHeader.classList.add('page-header--active');
  }
});

playVideoButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  videoPoster.classList.add('visually-hidden');
  playVideoButton.classList.add('visually-hidden');
});
