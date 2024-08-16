(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const navLinks = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('section');

        function changeLinkState() {
            let index = sections.length;

            while (--index && window.scrollY + 70 < sections[index].offsetTop) { }

            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[index].classList.add('active');
        }

        function handleScroll() {
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                if (sectionTop < windowHeight * 0.8) {
                    section.classList.add('visible');
                } else {
                    section.classList.remove('visible');
                }
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const sectionId = event.target.getAttribute('href');
                document.querySelector(sectionId).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        changeLinkState();
        handleScroll();

        window.addEventListener('scroll', () => {
            changeLinkState();
            handleScroll();
        });
    });
})();
// Sélectionner les éléments nécessaires
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Ajouter un événement au clic sur le burger
burger.addEventListener('click', () => {
    // Activer/Désactiver le menu
    nav.classList.toggle('nav-active');

    // Animation des liens
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });

    // Animation du burger
    burger.classList.toggle('toggle');
});
