// Grab the burger button and the document body
const burger = document.querySelector('.hamburger');
const body = document.body;

// Toggle "nav-open" class each time the burger is clicked
burger.addEventListener('click', () => {
    const expanded = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!expanded));
    body.classList.toggle('nav-open');
    
    console.log('Toggled!');
});