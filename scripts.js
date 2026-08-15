/* ==========================================================================
   La Ferme Bermond — Interactions
   Aucune dépendance externe. Tout est progressif : sans JS, la page reste
   entièrement lisible et navigable.
   ========================================================================== */
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ----------------------------------------------------------------------
       1. En-tête : état « collé » au défilement
       ---------------------------------------------------------------------- */
    var header = document.getElementById('siteHeader');
    if (header) {
        var toggleStuck = function () {
            header.classList.toggle('is-stuck', window.scrollY > 40);
        };
        toggleStuck();
        window.addEventListener('scroll', toggleStuck, { passive: true });
    }

    /* ----------------------------------------------------------------------
       2. Menu mobile
       ---------------------------------------------------------------------- */
    var burger = document.getElementById('burger');
    var nav = document.getElementById('mainNav');

    function closeNav() {
        if (!burger || !nav) return;
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Ouvrir le menu');
    }

    if (burger && nav) {
        burger.addEventListener('click', function () {
            var open = nav.classList.toggle('is-open');
            burger.setAttribute('aria-expanded', open ? 'true' : 'false');
            burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        });

        nav.addEventListener('click', function (e) {
            if (e.target.closest('a')) closeNav();
        });

        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !burger.contains(e.target)) closeNav();
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 980) closeNav();
        });
    }

    /* ----------------------------------------------------------------------
       3. Lien de navigation actif (scrollspy)
       ---------------------------------------------------------------------- */
    var navLinks = Array.prototype.slice.call(
        document.querySelectorAll('.nav__list a[href^="#"]')
    );

    if (navLinks.length && 'IntersectionObserver' in window) {
        var linkFor = {};
        var watched = [];

        navLinks.forEach(function (link) {
            var id = link.getAttribute('href').slice(1);
            var target = document.getElementById(id);
            if (target) {
                linkFor[id] = link;
                watched.push(target);
            }
        });

        var visible = new Set();

        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) visible.add(entry.target.id);
                else visible.delete(entry.target.id);
            });

            var current = null;
            for (var i = 0; i < watched.length; i++) {
                if (visible.has(watched[i].id)) { current = watched[i].id; break; }
            }

            navLinks.forEach(function (l) { l.classList.remove('is-active'); });
            navLinks.forEach(function (l) { l.removeAttribute('aria-current'); });

            if (current && linkFor[current]) {
                linkFor[current].classList.add('is-active');
                linkFor[current].setAttribute('aria-current', 'true');
            }
        }, { rootMargin: '-80px 0px -55% 0px', threshold: 0 });

        watched.forEach(function (el) { spy.observe(el); });
    }

    /* ----------------------------------------------------------------------
       4. Apparition progressive des blocs
       ---------------------------------------------------------------------- */
    var reveals = document.querySelectorAll('.reveal');

    if (!reveals.length) {
        /* rien à faire */
    } else if (reduceMotion || !('IntersectionObserver' in window)) {
        Array.prototype.forEach.call(reveals, function (el) {
            el.classList.add('is-visible');
        });
    } else {
        var revealObserver = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

        Array.prototype.forEach.call(reveals, function (el) {
            revealObserver.observe(el);
        });

        // Filet de sécurité : si l'observateur n'a pas pu s'exécuter (onglet en
        // arrière-plan, rendu suspendu, navigateur exotique…), on affiche quand
        // même tout ce qui se trouve dans la fenêtre. Aucun contenu ne peut
        // rester invisible.
        window.addEventListener('load', function () {
            window.setTimeout(function () {
                Array.prototype.forEach.call(
                    document.querySelectorAll('.reveal:not(.is-visible)'),
                    function (el) {
                        if (el.getBoundingClientRect().top < window.innerHeight * 1.15) {
                            el.classList.add('is-visible');
                        }
                    }
                );
            }, 1200);
        });
    }

    /* ----------------------------------------------------------------------
       5. Galeries photo (image principale + vignettes)
       ---------------------------------------------------------------------- */
    Array.prototype.forEach.call(document.querySelectorAll('[data-gallery]'), function (gallery) {
        var main = gallery.querySelector('.gallery__main');
        var thumbs = gallery.querySelectorAll('.gallery__thumb');
        if (!main || !thumbs.length) return;

        function show(button) {
            var src = button.getAttribute('data-full');
            if (!src || main.getAttribute('src') === src) return;

            Array.prototype.forEach.call(thumbs, function (t) {
                t.setAttribute('aria-current', t === button ? 'true' : 'false');
            });

            var swap = function () {
                main.src = src;
                var label = button.getAttribute('aria-label') || '';
                main.alt = label.replace(/^Voir la photo\s*:\s*/i, '') || main.alt;
                gallery.classList.remove('is-swapping');
            };

            if (reduceMotion) { swap(); return; }

            gallery.classList.add('is-swapping');
            var pre = new Image();
            pre.onload = swap;
            pre.onerror = swap;
            pre.src = src;
            window.setTimeout(function () {
                if (gallery.classList.contains('is-swapping')) swap();
            }, 900);
        }

        Array.prototype.forEach.call(thumbs, function (button) {
            button.addEventListener('click', function () { show(button); });
        });
    });

    /* ----------------------------------------------------------------------
       6. Modales d'adhésion (HelloAsso)
       ---------------------------------------------------------------------- */
    var lastFocused = null;

    function openModal(modal) {
        if (!modal) return;
        lastFocused = document.activeElement;
        modal.removeAttribute('hidden');
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';

        // Chargement différé de l'iframe HelloAsso
        var frame = modal.querySelector('iframe[data-src]');
        if (frame) {
            frame.src = frame.getAttribute('data-src');
            frame.removeAttribute('data-src');
        }

        var closeBtn = modal.querySelector('.modal__close');
        if (closeBtn) closeBtn.focus();
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('is-open');
        modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function closeAllModals() {
        Array.prototype.forEach.call(document.querySelectorAll('.modal.is-open'), closeModal);
    }

    document.addEventListener('click', function (e) {
        var trigger = e.target.closest('[data-modal]');
        if (trigger) {
            e.preventDefault();
            openModal(document.getElementById(trigger.getAttribute('data-modal')));
            return;
        }

        if (e.target.closest('.modal__close')) {
            closeModal(e.target.closest('.modal'));
            return;
        }

        if (e.target.classList.contains('modal')) closeModal(e.target);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;
        closeAllModals();
        closeNav();
    });

    // Redimensionnement automatique du widget HelloAsso
    window.addEventListener('message', function (e) {
        if (!/helloasso\.com$/.test(new URL(e.origin).hostname)) return;
        if (!e.data || !e.data.height) return;
        Array.prototype.forEach.call(document.querySelectorAll('.modal iframe'), function (frame) {
            frame.style.height = parseInt(e.data.height, 10) + 'px';
        });
    });

    /* ----------------------------------------------------------------------
       7. Diaporama du héros
       Les images 2 à 5 (≈1,6 Mo) ne sont demandées qu'une fois la page chargée,
       pour ne pas peser sur le premier affichage. Si prefers-reduced-motion est
       actif, on laisse le héros fixe sur la première image.
       ---------------------------------------------------------------------- */
    var heroMedia = document.querySelector('.hero__media');
    if (heroMedia && !reduceMotion) {
        var startHero = function () {
            window.setTimeout(function () {
                heroMedia.classList.add('is-loaded');
            }, 400);
        };
        if (document.readyState === 'complete') startHero();
        else window.addEventListener('load', startHero);
    }

    /* ----------------------------------------------------------------------
       8. Année courante dans le pied de page
       ---------------------------------------------------------------------- */
    var year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
})();
