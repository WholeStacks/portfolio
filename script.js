// Add parallax effect
window.addEventListener("scroll", () => {
    const parallaxSections = document.querySelectorAll(".parallax");
    parallaxSections.forEach(section => {
        const yPos = -(window.scrollY * 0.4);
        section.style.backgroundPosition = `50% ${yPos}px`;
    });
});
