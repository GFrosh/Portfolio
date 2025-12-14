const consoleText = "Uhmm... Not everyone opens the console. Thanks for checking out my portfolio, hope to work with you!";
document.addEventListener('DOMContentLoaded', () => {
    console.log(consoleText);
});

// CANVAS SPACE ANIMATION
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3;
        this.speedX = (Math.random() - 0.5) * 0.625;
        this.speedY = (Math.random() - 0.5) * 0.625;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > canvas.width) {
            this.speedY *= -1;
        }
    }

    draw() {
        ctx.fillStyle = "#00aaff";
        ctx.shadowColor = "#00aaff";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animate);
}

initParticles();
animate();


window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});




// Navbar animation...
window.addEventListener('scroll', () => {
    const navbar = document.querySelector("header");
    if (window.scrollY > 400) {
        navbar.classList.add('slide-in');
    }
    else {
        navbar.classList.remove('slide-in');
    }
});




// Toggle Navigation...
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector('aside');
const closeBtn = document.querySelector(".close-nav");

hamburger.addEventListener("click", () => {
    console.log("Navbar Toggled!");
    sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    console.log("Navbar Toggled!");
    sidebar.classList.remove("active");
});




// BACK TO TOP FUNCTION
const b2topBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 3000) {
        b2topBtn.style.opacity = 1;
    } else {
        b2topBtn.style.opacity = 0;
    }
});

b2topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});






// FOOTER CURRENT YEAR
const year = document.getElementById("year");
const currentYear = new Date();
year.innerText = currentYear.getFullYear();




// EMAIL FUNCTIONALITY
document.addEventListener("DOMContentLoaded", () => {

    emailjs.init("BCYdhJo5NDDlO0ZyG");

    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Freeze values immediately
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            alert("Fill all fields.");
            return;
        }

        if (!email.includes("@")) {
            alert("Invalid email.");
            return;
        }

        // Lock the form to prevent double-submit
        contactForm.querySelector("button").disabled = true;

        emailjs.send("service_8lcm1hs", "template_gl0kb58", {
            name,
            email,
            message
        })
        .then(() => {
            alert("Message sent successfully.");
            contactForm.reset();
        })
        .catch(err => {
            console.error(err);
            alert("Failed to send message.");
        })
        .finally(() => {
            contactForm.querySelector("button").disabled = false;
        });
    });

});
