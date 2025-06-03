// Portfolio Main JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-out",
    once: false,
    mirror: false,
  });

  // Initialize Particles.js
  initParticles();

  // Initialize Three.js scene
  initThreeJS();

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize skill section animations
  initSkillAnimations();

  // Initialize neural network visualization
  initNeuralVisualization();

  // Initialize 3D card effects
  init3DCardEffects();

  // Initialize header behavior
  initHeaderBehavior();

  // Form validation
  initFormValidation();
});

// Initialize particles.js
function initParticles() {
  const primaryColor = "#66EAFF";
  const secondaryColor = "#6E56CF";
  const tertiaryColor = "#90FF34";

  if (document.getElementById("particles-js")) {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: [primaryColor, secondaryColor, tertiaryColor],
        },
        shape: {
          type: ["circle", "triangle"],
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 6,
          },
        },
        opacity: {
          value: 0.6,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.3,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: primaryColor,
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.6,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }
}

// Initialize Three.js scene
function initThreeJS() {
  const container = document.getElementById("three-container");
  if (!container) return;

  const primaryColor = 0x66eaff;
  const secondaryColor = 0x6e56cf;
  const tertiaryColor = 0x90ff34;

  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  // Create neural network nodes and connections
  const nodes = [];
  const connections = [];

  // Create geometry for nodes and connections
  const nodeGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  const connectionGeometry = new THREE.CylinderGeometry(0.03, 0.03, 1, 8);
  connectionGeometry.rotateX(Math.PI / 2);

  // Create materials
  const primaryMaterial = new THREE.MeshBasicMaterial({
    color: primaryColor,
    transparent: true,
    opacity: 0.7,
  });

  const secondaryMaterial = new THREE.MeshBasicMaterial({
    color: secondaryColor,
    transparent: true,
    opacity: 0.7,
  });

  const tertiaryMaterial = new THREE.MeshBasicMaterial({
    color: tertiaryColor,
    transparent: true,
    opacity: 0.7,
  });

  const connectionMaterial = new THREE.MeshBasicMaterial({
    color: primaryColor,
    transparent: true,
    opacity: 0.3,
  });

  // Create neural network structure
  // Input layer
  for (let i = 0; i < 4; i++) {
    const node = new THREE.Mesh(nodeGeometry, primaryMaterial);
    node.position.set(-8, (i - 1.5) * 3, 0);
    nodes.push(node);
    scene.add(node);
  }

  // Hidden layer 1
  for (let i = 0; i < 6; i++) {
    const node = new THREE.Mesh(nodeGeometry, secondaryMaterial);
    node.position.set(-3, (i - 2.5) * 2.5, 0);
    nodes.push(node);
    scene.add(node);
  }

  // Hidden layer 2
  for (let i = 0; i < 5; i++) {
    const node = new THREE.Mesh(nodeGeometry, secondaryMaterial);
    node.position.set(3, (i - 2) * 2.5, 0);
    nodes.push(node);
    scene.add(node);
  }

  // Output layer
  for (let i = 0; i < 3; i++) {
    const node = new THREE.Mesh(nodeGeometry, tertiaryMaterial);
    node.position.set(8, (i - 1) * 3, 0);
    nodes.push(node);
    scene.add(node);
  }

  // Create connections between layers
  // Input to hidden 1
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 6; j++) {
      createConnection(
        nodes[i],
        nodes[4 + j],
        connectionMaterial,
        scene,
        connections
      );
    }
  }

  // Hidden 1 to hidden 2
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      createConnection(
        nodes[4 + i],
        nodes[10 + j],
        connectionMaterial,
        scene,
        connections
      );
    }
  }

  // Hidden 2 to output
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      createConnection(
        nodes[10 + i],
        nodes[15 + j],
        connectionMaterial,
        scene,
        connections
      );
    }
  }

  // Position camera
  camera.position.z = 20;

  // Handle mouse movement for interactive effect
  let mouseX = 0;
  let mouseY = 0;
  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener("mousemove", (event) => {
    mouseX = (event.clientX - windowHalfX) / 50;
    mouseY = (event.clientY - windowHalfY) / 50;
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Rotate based on mouse position
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    // Pulse animation for nodes
    const time = Date.now() * 0.001;
    nodes.forEach((node, i) => {
      node.scale.x =
        node.scale.y =
        node.scale.z =
          1 + 0.2 * Math.sin(time + i * 0.3);
      node.material.opacity = 0.5 + 0.3 * Math.sin(time + i * 0.3);
    });

    // Data flow animation on connections
    connections.forEach((connection, i) => {
      connection.material.opacity = 0.2 + 0.2 * Math.sin(time * 2 + i * 0.1);
    });

    renderer.render(scene, camera);
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

// Helper function to create connections between nodes
function createConnection(nodeA, nodeB, material, scene, connectionsArray) {
  const connection = new THREE.Mesh(
    new THREE.CylinderGeometry(0.03, 0.03, 1, 8),
    material.clone()
  );

  // Calculate position and rotation
  const direction = new THREE.Vector3().subVectors(
    nodeB.position,
    nodeA.position
  );
  const length = direction.length();
  connection.position.copy(nodeA.position).add(direction.multiplyScalar(0.5));
  connection.scale.set(1, length, 1);
  connection.lookAt(nodeB.position);
  connection.rotateX(Math.PI / 2);

  scene.add(connection);
  connectionsArray.push(connection);
}

// Initialize scroll animations
function initScrollAnimations() {
  // Scroll indicator disappears on scroll
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = "0";
      } else {
        scrollIndicator.style.opacity = "1";
      }
    });
  }

  // Parallax effect on hero section
  const heroSection = document.querySelector(".hero");
  if (heroSection) {
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        heroSection.style.backgroundPosition = `center ${
          scrollPosition * 0.5
        }px`;
      }
    });
  }

  // Fade in elements on scroll
  const fadeElements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

// Initialize skill section animations
function initSkillAnimations() {
  const skillSection = document.querySelector(".skills");
  if (!skillSection) return;

  const skillBars = document.querySelectorAll(".skill-progress");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.transform = "scaleX(1)";
              }, index * 100);
            });
          }, 300);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(skillSection);
}

// Initialize neural network visualization
function initNeuralVisualization() {
  const neuralViz = document.querySelector(".ai-visualization");
  if (!neuralViz) return;

  const nodes = neuralViz.querySelectorAll(".node");
  const dataStream = neuralViz.querySelector(".data-stream");

  // Randomly activate nodes
  setInterval(() => {
    nodes.forEach((node) => {
      if (Math.random() > 0.7) {
        node.classList.add("active");
      } else {
        node.classList.remove("active");
      }
    });
  }, 1000);

  // Data stream animation
  if (dataStream) {
    dataStream.style.backgroundSize = "200% 100%";
  }
}

// Initialize 3D card effects
function init3DCardEffects() {
  const cards = document.querySelectorAll(".project-card, .cert-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      card.style.transform = `perspective(1000px) rotateY(${
        x * 10
      }deg) rotateX(${-y * 10}deg) translateZ(20px)`;

      // Dynamic light effect
      const glare =
        card.querySelector(".card-glare") || document.createElement("div");
      if (!card.querySelector(".card-glare")) {
        glare.classList.add("card-glare");
        glare.style.position = "absolute";
        glare.style.top = "0";
        glare.style.left = "0";
        glare.style.width = "100%";
        glare.style.height = "100%";
        glare.style.pointerEvents = "none";
        glare.style.borderRadius = "inherit";
        glare.style.background =
          "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 80%)";
        glare.style.opacity = "0";
        glare.style.transition = "opacity 0.3s ease";
        glare.style.zIndex = "1";
        card.appendChild(glare);
      }

      glare.style.opacity = "1";
      glare.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateY(0) rotateX(0) translateZ(0)";

      const glare = card.querySelector(".card-glare");
      if (glare) {
        glare.style.opacity = "0";
      }
    });
  });
}

// Initialize header behavior
function initHeaderBehavior() {
  const header = document.querySelector("header");
  if (!header) return;

  let lastScrollY = 0;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    // Hide header on scroll down, show on scroll up
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }

    // Add more background opacity when scrolled
    if (currentScrollY > 50) {
      header.style.background = "rgba(9, 9, 11, 0.95)";
    } else {
      header.style.background = "rgba(9, 9, 11, 0.8)";
    }

    lastScrollY = currentScrollY;
  });
}

// Initialize form validation
function initFormValidation() {
  const contactForm = document.querySelector(".contact-form");
  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple validation
    const inputs = contactForm.querySelectorAll("input, textarea");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#ff3860";
      } else {
        input.style.borderColor = "";
      }
    });

    // Email validation
    const emailInput = contactForm.querySelector('input[type="email"]');
    if (emailInput && !validateEmail(emailInput.value)) {
      isValid = false;
      emailInput.style.borderColor = "#ff3860";
    }

    if (isValid) {
      // Simulate form submission
      const formElements = contactForm.elements;
      const successMessage = document.createElement("div");
      successMessage.classList.add("success-message");
      successMessage.innerHTML = `
                <div style="text-align: center; padding: 40px 20px;">
                    <i class="fas fa-check-circle" style="font-size: 48px; color: var(--primary-color); margin-bottom: 20px;"></i>
                    <h3 style="margin-bottom: 15px; color: var(--primary-color);">Message Sent Successfully!</h3>
                    <p>Thank you for reaching out. I'll respond to your message as soon as possible.</p>
                </div>
            `;

      contactForm.style.height = `${contactForm.offsetHeight}px`;
      contactForm.innerHTML = "";
      contactForm.appendChild(successMessage);

      // Reset form height after animation
      setTimeout(() => {
        contactForm.style.height = "auto";
      }, 500);
    }
  });
}

// Email validation helper
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});
