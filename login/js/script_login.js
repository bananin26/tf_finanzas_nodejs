const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

var texts = document.querySelector('.text-group');
var currentImageIndex = 0;
var intervalId = null;

function changeImage() {
    images[currentImageIndex].classList.remove('show');
    bullets[currentImageIndex].classList.remove('active');
    currentImageIndex = (currentImageIndex + 1) % images.length;
    images[currentImageIndex].classList.add('show');
    bullets[currentImageIndex].classList.add('active');
    texts.style.transform = `translateY(${-(currentImageIndex) * 2.2}rem)`;
}

function startCarousel() {
    intervalId = setInterval(changeImage, 3000);
}

function stopCarousel() {
    clearInterval(intervalId);
}

bullets.forEach(function(bullet, index) {
    bullet.addEventListener('click', function() {
        stopCarousel();
        images[currentImageIndex].classList.remove('show');
        bullets[currentImageIndex].classList.remove('active');
        currentImageIndex = index;
        images[currentImageIndex].classList.add('show');
        bullets[currentImageIndex].classList.add('active');
        texts.style.transform = `translateY(${-(currentImageIndex) * 2.2}rem)`;
    });
});

startCarousel();

