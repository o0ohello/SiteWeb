export function carrousel() {
    const carousel = document.querySelector(".carousel-container");
    const items = document.querySelectorAll(".carousel-item");

    let animation = gsap.to(".carousel", {
        x: "-50vw",
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
    });


    function updateSizes() {
        const centerX = window.innerWidth / 2;

        items.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;

            // Distance par rapport au centre de l'écran
            const distance = Math.abs(centerX - itemCenter);
            const maxDistance = window.innerWidth / 2; // Max = bords de l'écran

            // Calcul de la taille (10vh à 15vh)
            const scale = 1 + (1 - Math.min(distance / maxDistance, 1)) * 0.5;
            const padding = Math.min(distance / maxDistance)/2;
            gsap.to(item, { scale: scale, padding: padding  ,duration: 0.1 });
        });

        requestAnimationFrame(updateSizes);
    }

    requestAnimationFrame(updateSizes);
}