/* slider */

const sliderContainer = document.querySelector(".citation-slider");
const slides = sliderContainer.children;
const containerWidth = sliderContainer.offsetWidth;
const margin = 30;
let slideDots;
let itemPerSlide = 0;

//responsive 
const responsive = [
    { breakPoint: { width: 0, item: 1 } },
    { breakPoint: { width: 991, item: 2 } }
]

function load() {
    for (let i = 0; i < responsive.length; i++) {
        if (window.innerWidth > responsive[i].breakPoint.width) {
            itemPerSlide = responsive[i].breakPoint.item;
        }
    }

    start();
}

function start() {
    totalWidth = 0;
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.width = (containerWidth / itemPerSlide) - margin + "px";
        slides[i].style.margin = margin / 2 + "px";
        totalWidth += containerWidth / itemPerSlide;

    }


    sliderContainer.style.width = totalWidth + "px";
    slideDots = Math.ceil(slides.length / itemPerSlide);

    for (let i = 0; i < slideDots; i++) {
        const div = document.createElement("div");
        div.id = i;
        div.setAttribute("onclick", "controlSlide(this)");
        if (i == 0) {
            div.classList.add("active");
        }
        document.querySelector(".slide-controls").appendChild(div);
    }
}
let currentSlide = 0;
let autoSlide = 0;

function controlSlide(element) {
    clearInterval(timer)
    timer = setInterval(autoPlay, 5000);
    autoSlide = element.id;
    currentSlide = element.id;
    changeSlide(currentSlide)

}

function changeSlide(currentSlide) {
    controlButtons = document.querySelector(".slide-controls").children;
    for (let i = 0; i < controlButtons.length; i++) {
        controlButtons[i].classList.remove("active");
    }
    controlButtons[currentSlide].classList.add("active");
    sliderContainer.style.marginLeft = -(containerWidth * currentSlide) + "px";
}

function autoPlay() {
    if (autoSlide == slideDots - 1) {
        autoSlide = 0;
    } else {
        autoSlide++;
    }
    changeSlide(autoSlide)
}

let timer = setInterval(autoPlay, 5000);

window.onload = load();


// Header fix 

window.onscroll = function() {
    const docScroollTop = document.documentElement.scrollTop;

    if (window.innerWidth > 991) {
        if (docScroollTop > 100) {
            document.querySelector("header").classList.add("fixed")
        } else {
            document.querySelector("header").classList.remove("fixed")
        }
    }
}

// navbar links 

const navbar = document.querySelector(".navbar");
a = navbar.querySelectorAll("a");

a.forEach(function(element) {
    element.addEventListener("click", function() {
        for (let i = 0; i < a.length; i++) {
            a[i].classList.remove("active");
        }
        this.classList.add("active")
        document.querySelector(".navbar").classList.toggle("show");
    })
})


// Menu toogle

const menu = document.querySelector(".menu");

menu.addEventListener("click", function() {
    document.querySelector(".navbar").classList.toggle("show");
})


// Text writer 

//typeWriter

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #ffffffd0}";
    document.body.appendChild(css);
};