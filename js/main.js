"use strict"

// меню бургер
const iconMenu = document.querySelector('.header_burger_icon');
const mainLogo = document.querySelector('.logo');
const MenuBody = document.querySelector('.menu');
if (iconMenu) {
    iconMenu.addEventListener("click", function(e) {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        MenuBody.classList.toggle('_active');
        MenuBody.classList.toggle('menus');
        mainLogo.classList.toggle('logo_prev');

    });
}

//Прокрутка при клике 

const menuLinks = document.querySelectorAll('.meny_link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top;

            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                MenuBody.classList.remove('_active');
                MenuBody.classList.remove('menus');
                mainLogo.classList.remove('logo_prev');
            }


            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault();
        }
    }
}



//анимации при скроле
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);

    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 100;


            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;

            }

            if ((scrollY > animItemOffset - animItemPoint) && scrollY < (animItemOffset + animItemHeight)) {
                animItem.classList.add('_active');
            }
        }
    }

    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.scrollX || document.documentElement.scrollLeft,
            scrollTop = window.scrollY || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll();
}



// ТАЙМЕР

let target_date = new Date('2021, 11, 24').getTime();
let days, hours, minutes, seconds;
const time_days = document.getElementById("days");
const time_hours = document.getElementById("hours");
const time_minutes = document.getElementById("minutes");
const time_seconds = document.getElementById("seconds");
getCountdown();

setInterval(function() { getCountdown(); }, 1000);

function getCountdown() {

    let current_date = new Date().getTime();
    let seconds_left = (target_date - current_date) / 1000;

    days = pad(parseInt(seconds_left / 86400));
    seconds_left = seconds_left % 86400;

    hours = pad(parseInt(seconds_left / 3600));
    seconds_left = seconds_left % 3600;

    minutes = pad(parseInt(seconds_left / 60));
    seconds = pad(parseInt(seconds_left % 60));

    time_days.innerHTML = days;
    time_hours.innerHTML = hours;
    time_minutes.innerHTML = minutes;
    time_seconds.innerHTML = seconds;

    if (target_date < current_date) {
        time_days.innerHTML = "00";
        time_hours.innerHTML = "00";
        time_minutes.innerHTML = "00";
        time_seconds.innerHTML = "00";
    }
}

function pad(n) {
    return (n < 10 ? '0' : '') + n;
}

// Меню авторизации и логина
const popupContainer = document.querySelector('.popup__container');
const popupSection = document.querySelector('.popup');
const popupPos = document.querySelector('.popup_close');
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function(e) {
            const curentPopup = document.querySelector('.popup_menu');
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener("click", function(e) {
            const curentPopup = document.querySelector('.popup_menu');
            curentPopup.classList.remove('open');
            body.classList.remove('lock');
            body.style.paddingRight = '0px';
        });
    }
}

function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
        const popupActive = document.querySelector('.popup_menu.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        curentPopup.classList.add('open');
        curentPopup.addEventListener("click", function(e) {
            if (!e.target.closest('.popup__container')) {
                curentPopup.classList.remove('open');
                body.classList.remove('lock');
                body.style.paddingRight = '0px';
            }
        });
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wraper').offsetWidth + 'px';
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock = false;
    setTimeout(function() {
        unlock = true;
    }, timeout);
}

function toggleForm() {
    popupContainer.classList.toggle('active');
    popupSection.classList.toggle('active');
    popupPos.classList.toggle('active');
}