export function works() {
    const boxes = document.querySelectorAll(".container-project-colum");

    boxes.forEach((box) => {
        const deco = box.querySelector(".deco");
        const headerVideo = box.querySelector(".header-video");
        const projectContent = box.querySelector(".project-content");
        const mainVideo = box.querySelector(".video-container video");
        const title = box.querySelector(".container-project-colum-box h1");

        box.addEventListener("click", function () {
            // Ferme toutes les autres divs avant d'ouvrir celle-ci
            boxes.forEach((otherBox) => {
                if (otherBox !== box && otherBox.classList.contains("expanded")) {
                    const otherTimeline = gsap.timeline();
                    const otherContent = otherBox.querySelector(".project-content");
                    const otherHeader = otherBox.querySelector(".header-video");
                    const otherVideo = otherBox.querySelector(".video-container video");
                    const otherDeco = otherBox.querySelector(".deco");

                    otherTimeline
                        .to(otherContent, {
                            opacity: 0,
                            duration: 0.3
                        })
                        .to(otherHeader, {
                            opacity: 0,
                            duration: 0.3
                        }, "-=0.2")
                        .to(otherBox, {
                            height: "10vh",
                            duration: 0.6,
                            ease: "power2.inOut"
                        });

                    otherBox.classList.remove("expanded");
                    if (otherVideo) otherVideo.pause();
                    if (otherHeader) otherHeader.pause();
                }
            });

            const timeline = gsap.timeline();

            if (!box.classList.contains("expanded")) {
                // Expansion
                timeline
                    .to(box, {
                        height: "80vh",
                        duration: 0.8,
                        ease: "power2.out"
                    })
                    .to(headerVideo, {
                        opacity: 1,
                        duration: 0.5
                    }, "-=0.4")
                    .to(projectContent, {
                        opacity: 1,
                        duration: 0.5
                    }, "-=0.2");

                box.classList.add("expanded");
                if (headerVideo) headerVideo.play();
                if (mainVideo) mainVideo.play();
            } else {
                // Réduction
                timeline
                    .to(projectContent, {
                        opacity: 0,
                        duration: 0.3
                    })
                    .to(headerVideo, {
                        opacity: 0,
                        duration: 0.3
                    }, "-=0.2")
                    .to(box, {
                        height: "10vh",
                        duration: 0.6,
                        ease: "power2.inOut"
                    }, "-=0.2");

                box.classList.remove("expanded");
                if (headerVideo) headerVideo.pause();
                if (mainVideo) mainVideo.pause();
            }
        });
    });
}
