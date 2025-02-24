export function setupNavbar() {
  console.log("navbar.js has been loaded!"); // Log de confirmation

  const navbar = document.querySelector(".navbar");
  const visibleElements = document.querySelectorAll(".visible");

  // Créer une timeline GSAP
  const tl = gsap.timeline({ paused: true }); // La timeline commence en pause

  // Animation de la navbar
  tl.to(".navbar", {
    height: "90vh",
    width: "35vh",
    borderRadius: "15px",
    duration: 0.5,
  });

  // Animation des éléments visibles
  tl.to(
    visibleElements,
    {
      visibility: "visible",
      opacity: 1,
      duration: 0.5,
      stagger: 0.1, // Animation décalée pour chaque élément
      onStart: () => {
        visibleElements.forEach((el) => el.style.pointerEvents = "auto");
      },
      onComplete: () => {
        visibleElements.forEach((el) => el.style.pointerEvents = "auto");
      },
    },
    // "-=1" // Commence légèrement avant la fin de l'animation précédente
  );

  tl.reverse({
    onReverseComplete: () => {
      visibleElements.forEach((el) => el.style.pointerEvents = "none");
    }
  });



//TIMELINE 2 ANIMATION SECTION
  const t2 = gsap.timeline({ paused: true }); // La timeline commence en pause

  // Animation de la navbar
  t2.to(".navbar", {
    height: "7vh",
    width: "25vh",
    borderRadius: "15px",
    duration: 0.5,
  });

  navbar.addEventListener("mouseenter", () => {
    tl.play(); // Joue la timeline
  });

  navbar.addEventListener("mouseleave", () => {
    tl.reverse(); // Joue la timeline à l'envers
  });

  // Sélectionner toutes les sections et la div affichant le nom
  const sections = document.querySelectorAll(".section");
  const currentSectionDisplay = document.querySelector(".current-section");

  // Initialiser ScrollTrigger pour chaque section
  sections.forEach((section) => {
    const sectionName = section.getAttribute("data-section-name"); // Récupérer le nom de la section

    ScrollTrigger.create({
      trigger: section,
      start: "top-=10 top", // Début de la détection
      onEnter: () => updateCurrentSection(sectionName), // Entrée dans la section
      onEnterBack: () => updateCurrentSection(sectionName), // Retour dans la section
      markers: false,
    });
  });

  // Fonction pour mettre à jour la div avec une animation d'opacité
  function updateCurrentSection(sectionName) {
    gsap.to(currentSectionDisplay, {
      opacity: 0, // Fait disparaître l'ancien texte
      duration: 0.2, // Durée de l'animation
      onComplete: () => {
        currentSectionDisplay.textContent = sectionName; // Met à jour le texte
        gsap.to(currentSectionDisplay, {
          opacity: 1, // Fait réapparaître le texte
          duration: 0.2,
        });
      },
    });
  }

}