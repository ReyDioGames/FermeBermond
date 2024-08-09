document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const sectionId = event.target.getAttribute('href');
            document.querySelector(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
