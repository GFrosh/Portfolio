const consoleText = "Uhmm... Not everyone opens the console. Thanks for checking out my portfolio, hope to work with you!";
document.addEventListener('DOMContentLoaded', () => {
    console.log(consoleText);
});


const projectsGrid = document.getElementById("projects-grid");

const techIconMap = {
    "JavaScript": "devicon-javascript-plain",
    "TypeScript": "devicon-typescript-plain",
    "Java": "devicon-java-plain",
    "C++": "devicon-cplusplus-plain",
    "CSS": "devicon-css3-plain",
    "HTML": "devicon-html5-plain",
    "Node.js": "devicon-nodejs-plain",
    "nodejs": "devicon-nodejs-plain",
    "React": "devicon-react-original",
    "UML": "document-text-outline",
    "CMS": "layers-outline",
    "GitHub Copilot": "sparkles-outline",
    "Open Source": "code-slash-outline",
    "Rate Limiting": "speedometer-outline",
    "Web App": "globe-outline",
    "Diagram Editor": "create-outline",
    "Chess Engine": "game-controller-outline",
    "Portfolio": "briefcase-outline",
    "Learning": "school-outline",
    "Collaboration": "people-outline",
    "Contribution": "git-branch-outline"
};

function formatTopicLabel(topic) {
    const specialCases = {
        nodejs: 'Node.js',
        'github-copilot': 'GitHub Copilot',
        'open-source': 'Open Source',
        'rate-limiting': 'Rate Limiting',
        'oop-principles': 'OOP Principles',
        webapp: 'Web App',
        'diagram-editor': 'Diagram Editor',
        'chess-engine': 'Chess Engine',
        portfolio: 'Portfolio',
        learn: 'Learning',
        collaborate: 'Collaboration',
        contribution: 'Contribution',
        electron: 'Electron',
        plantuml: 'PlantUML',
        cms: 'CMS'
    };

    const lowerTopic = topic.toLowerCase();
    if (specialCases[lowerTopic]) {
        return specialCases[lowerTopic];
    }

    return topic
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

function slugifyProjectName(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getProjectImage(repo) {
    return `https://opengraph.githubassets.com/1/GFrosh/${repo.name}`;
}

function normalizeDescription(repo) {
    const description = repo.description || `A GitHub project for ${repo.name}.`;
    return description.replace(/\s+/g, ' ').trim();
}

function renderTechTags(repo) {
    const tags = [];
    if (repo.language) {
        tags.push(repo.language);
    }

    for (const topic of repo.topics || []) {
        const label = formatTopicLabel(topic);
        if (!tags.includes(label) && tags.length < 3) {
            tags.push(label);
        }
    }

    if (tags.length === 0) {
        tags.push('GitHub');
    }

    return tags
        .slice(0, 3)
        .map((tag) => {
            const iconClass = techIconMap[tag] || techIconMap[tag.toLowerCase()] || 'code-slash-outline';
            const isDevicon = iconClass.startsWith('devicon-');
            return `
                <span class="tech">
                    ${isDevicon ? `<i class="${iconClass}"></i>` : `<ion-icon name="${iconClass}"></ion-icon>`}
                    <small>${tag}</small>
                </span>
            `;
        })
        .join('');
}

function createProjectCard(repo) {
    const liveUrl = repo.homepage || repo.html_url;
    const liveLabel = repo.homepage ? 'Live' : 'Repo';
    const projectSlug = slugifyProjectName(repo.name);

    return `
        <div class="project-card flip-card" data-project-slug="${projectSlug}">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${getProjectImage(repo)}" alt="Preview of ${repo.name}">
                    <div class="project-info">
                        <h3>${repo.name}</h3>
                        <p>${normalizeDescription(repo)}</p>
                        <div class="project-meta">
                            <span><i class="devicon-github-original"></i> ${repo.stargazers_count} stars</span>
                            <span>${repo.language || 'GitHub'}</span>
                        </div>
                    </div>
                </div>
                <div class="flip-card-back">
                    <div class="back-content">
                        <h3>${repo.name}</h3>
                        <p class="back-desc">${normalizeDescription(repo)}</p>
                        <div class="back-actions">
                            <a href="${liveUrl}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">${liveLabel} <ion-icon name="rocket-outline"></ion-icon></a>
                            <a href="${repo.html_url}" class="btn btn-ghost" target="_blank" rel="noopener noreferrer"><i class="devicon-github-original"></i> GitHub</a>
                        </div>
                        <div class="tech-tags">
                            ${renderTechTags(repo)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function attachProjectFlipHandlers() {
    if (!projectsGrid) {
        return;
    }

    projectsGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.flip-card');
        if (!card || event.target.closest('a')) {
            return;
        }

        card.classList.toggle('is-flipped');
    });
}

async function loadProjects() {
    if (!projectsGrid) {
        return;
    }

    try {
        const response = await fetch('projects.json');
        if (!response.ok) {
            throw new Error(`Unable to load projects.json (${response.status})`);
        }

        const projects = await response.json();
        const featuredProjects = projects.filter((project) => project.featured !== false).slice(0, 6);

        projectsGrid.innerHTML = featuredProjects.map(createProjectCard).join('');
    } catch (error) {
        console.error('Failed to load projects.json', error);
        projectsGrid.innerHTML = '<p class="projects-loading">Projects could not be loaded right now.</p>';
    }
}

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

attachProjectFlipHandlers();
loadProjects();


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
    sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
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
