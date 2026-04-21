// Easter egg for curious devs
console.log("Uhmm... Not everyone opens the console. Thanks for checking out my portfolio, hope to work with you!");


// ─── CANVAS PARTICLE ANIMATION ───────────────────────────────────────────────
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 80;

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3;
        this.speedX = (Math.random() - 0.5) * 0.625;
        this.speedY = (Math.random() - 0.5) * 0.625;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width)  this.speedX *= -1;
        // FIX: was canvas.width — must compare y against canvas.HEIGHT
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
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
    particles.forEach((p) => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

initParticles();
animate();


// ─── RESIZE HANDLER ──────────────────────────────────────────────────────────
window.addEventListener("resize", () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
});


// ─── SCROLL HANDLER (merged — one listener, not two) ─────────────────────────
const navbar  = document.querySelector("header");
const b2topBtn = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    // Navbar slide-in
    if (scrollY > 400) {
        navbar.classList.add("slide-in");
    } else {
        navbar.classList.remove("slide-in");
    }

    // FIX: back-to-top threshold was hardcoded 3000px — now dynamic
    if (scrollY > window.innerHeight * 2) {
        b2topBtn.style.opacity = 1;
    } else {
        b2topBtn.style.opacity = 0;
    }
});

b2topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});


// ─── MOBILE SIDEBAR TOGGLE ───────────────────────────────────────────────────
const hamburger = document.querySelector(".hamburger");
const sidebar   = document.querySelector("aside");
const closeBtn  = document.querySelector(".close-nav");

hamburger.addEventListener("click", () => {
    sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

// Close sidebar when a nav link is tapped
document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", () => {
        sidebar.classList.remove("active");
    });
});


// ─── FOOTER YEAR ─────────────────────────────────────────────────────────────
document.getElementById("year").innerText = new Date().getFullYear();


// ─── EMAILJS CONTACT FORM ────────────────────────────────────────────────────
// NOTE: Add your domain whitelist in the EmailJS dashboard to prevent
// unauthorized use of your public key + service/template IDs.
document.addEventListener("DOMContentLoaded", () => {

    emailjs.init("BCYdhJo5NDDlO0ZyG");

    const contactForm = document.getElementById("contact-form");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name    = contactForm.name.value.trim();
        const email   = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            alert("Fill all fields.");
            return;
        }

        if (!email.includes("@")) {
            alert("Invalid email.");
            return;
        }

        const submitBtn = contactForm.querySelector("button");
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        emailjs.send("service_8lcm1hs", "template_gl0kb58", { name, email, message })
            .then(() => {
                alert("Message sent successfully.");
                contactForm.reset();
            })
            .catch(err => {
                console.error(err);
                alert("Failed to send message. Please try again.");
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send Message";
            });
    });

});
