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


function changeImage(imageSrc) {
    document.getElementById("mainImage1").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage1").src = imageSrc;
        document.getElementById("mainImage1").style.opacity = "1";
    }, 300);
}

function changeImage1(imageSrc) {
    document.getElementById("mainImage").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage").src = imageSrc;
        document.getElementById("mainImage").style.opacity = "1";
    }, 300);
}

function changeImage2(imageSrc) {
    document.getElementById("mainImage2").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage2").src = imageSrc;
        document.getElementById("mainImage2").style.opacity = "1";
    }, 300);
}

function changeImage3(imageSrc) {
    document.getElementById("mainImage3").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage3").src = imageSrc;
        document.getElementById("mainImage3").style.opacity = "1";
    }, 300);
}

function changeImage4(imageSrc) {
    document.getElementById("mainImage4").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage4").src = imageSrc;
        document.getElementById("mainImage4").style.opacity = "1";
    }, 300);
}

function changeImage5(imageSrc) {
    document.getElementById("mainImage5").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage5").src = imageSrc;
        document.getElementById("mainImage5").style.opacity = "1";
    }, 300);
}

function changeImage6(imageSrc) {
    document.getElementById("mainImage6").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage6").src = imageSrc;
        document.getElementById("mainImage6").style.opacity = "1";
    }, 300);
}

function changeImage7(imageSrc) {
    document.getElementById("mainImage7").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage7").src = imageSrc;
        document.getElementById("mainImage7").style.opacity = "1";
    }, 300);
}

function changeImage8(imageSrc) {
    document.getElementById("mainImage8").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage8").src = imageSrc;
        document.getElementById("mainImage8").style.opacity = "1";
    }, 300);
}

function changeImage9(imageSrc) {
    document.getElementById("mainImage9").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage9").src = imageSrc;
        document.getElementById("mainImage9").style.opacity = "1";
    }, 300);
}

function changeImage10(imageSrc) {
    document.getElementById("mainImage10").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage10").src = imageSrc;
        document.getElementById("mainImage10").style.opacity = "1";
    }, 300);
}

function changeImage11(imageSrc) {
    document.getElementById("mainImage11").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage11").src = imageSrc;
        document.getElementById("mainImage11").style.opacity = "1";
    }, 300);
}

function changeImage12(imageSrc) {
    document.getElementById("mainImage12").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage12").src = imageSrc;
        document.getElementById("mainImage12").style.opacity = "1";
    }, 300);
}

function changeImage13(imageSrc) {
    document.getElementById("mainImage13").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage13").src = imageSrc;
        document.getElementById("mainImage13").style.opacity = "1";
    }, 300);
}

function changeImage14(imageSrc) {
    document.getElementById("mainImage14").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage14").src = imageSrc;
        document.getElementById("mainImage14").style.opacity = "1";
    }, 300);
}

function changeImage15(imageSrc) {
    document.getElementById("mainImage15").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("mainImage15").src = imageSrc;
        document.getElementById("mainImage15").style.opacity = "1";
    }, 300);
}


(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdherentModals);
  } else {
    initAdherentModals();
  }

  function initAdherentModals() {
    const triggers = document.querySelectorAll('.adherentTrigger');
    const modals = document.querySelectorAll('.adherentModal');
    const closeBtns = document.querySelectorAll('.adherentModal__close');

    triggers.forEach(trigger => {
      trigger.addEventListener('click', function() {
        const modalId = this.dataset.modal;
        const modalEl = document.getElementById(modalId);
        if (!modalEl) return;

        modalEl.classList.add('show');
        document.body.style.overflow = 'hidden'; // bloque le scroll
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modals.forEach(m => m.classList.remove('show'));
        document.body.style.overflow = '';
      });
    });

    modals.forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === modal) {
          modal.classList.remove('show');
          document.body.style.overflow = '';
        }
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        modals.forEach(m => m.classList.remove('show'));
        document.body.style.overflow = '';
      }
    });
  }
})();
