export function setupCursor() {
    // Exemple avec GSAP
    document.addEventListener("mousemove", (event) => {
        const mouseX = event.clientX ;
        const mouseY = event.clientY ;

        // Animation GSAP avec les dimensions récupérées
        gsap.set(".cursor", {
            
            x: mouseX, // Centrer horizontalement
            y: mouseY, // Centrer verticalement
            stagger: -0.1,
        });
    });
}