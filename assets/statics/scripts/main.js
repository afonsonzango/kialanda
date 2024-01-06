var mobilebutton = document.getElementById('mobile-button');
var lnkcontainer = document.getElementById('lnk-container');

lnkcontainer.style.left = '-100%'

mobilebutton.addEventListener('click', function () {
    if (lnkcontainer.style.left == '0px') {
        lnkcontainer.style.left = '-100%'
    } else {
        lnkcontainer.style.left = '0px'
    }
});

document.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        lnkcontainer.style.left = '-100%';
    }
});

const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");

if (localStorage.getItem('kialanda-theme-color') == 'dark') {
    document.querySelector("html").setAttribute("data-theme", 'dark');
} else if (localStorage.getItem('kialanda-theme-color') == 'light') {
    document.querySelector("html").setAttribute("data-theme", 'light');
} else if (systemSettingDark.matches) {
    document.querySelector("html").setAttribute("data-theme", 'dark');
}


const button = document.querySelector("[data-theme-toggle]");

button.addEventListener('click', function () {
    var actualtheme = document.querySelector("html").getAttribute("data-theme");

    if (actualtheme == 'dark') {
        localStorage.setItem('kialanda-theme-color', 'light');
        document.querySelector("html").setAttribute("data-theme", 'light');
    } else {
        localStorage.setItem('kialanda-theme-color', 'dark');
        document.querySelector("html").setAttribute("data-theme", 'dark');
    }
});


const navbar = document.querySelector('nav.navbar');

navbar.style.backgroundColor = 'transparent';

document.addEventListener('scroll', function(){
    if(scrollY > 60){
        navbar.style.backgroundColor = '';
    }else{
        navbar.style.backgroundColor = 'transparent';
    }
});


const startGame = function (game){
    window.location.pathname = `/kialanda/games/${game}`
}
