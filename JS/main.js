"use strict"

window.addEventListener('DOMContentLoaded', () => {

    //TABS
    const parentTabs = document.querySelector('.price__nav');
    const tabs = document.querySelectorAll('.tabheader');
    const tabsContent = document.querySelectorAll('.tab-pane');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show');
            item.classList.add('hide');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show');
        tabs[i].classList.add('tabheader__active');
    }


    hideTabContent();
    showTabContent();

    parentTabs.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabheader')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //ЯКОРЯ
    const anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const blockID = anchor.getAttribute('href').substr(1);

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            if (iconBurger.classList.contains('_active')) {
                document.body.classList.remove('_lock');
                iconBurger.classList.remove('_active');
                menuBody.classList.remove('_active');
            }
        });
    }

    //MODAL
    const modalOpenBtn = document.querySelectorAll('[data-modalOpen]'),
        modal = document.querySelector('[data-modal]'),
        mrazBtn = document.querySelector('[data-btn-post'),
        mraz = document.querySelector('.mraz');

    mrazBtn.addEventListener('click', e => {
        mraz.style.display = 'block';
    });


    function openModal(selector) {
        selector.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    function closeModal(selector) {
        selector.style.display = 'none';
        document.body.style.overflow = '';
    };

    modalOpenBtn.forEach(item => {
        item.addEventListener('click', () => {
            openModal(modal);
        });
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-modalclose') == '') {
            closeModal(modal);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.style.display === 'block') {
            closeModal(modal);
        }
    });

    function openModalByScroll() {
        if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modal);
            window.removeEventListener('scroll', openModalByScroll);
        }
    };

    window.addEventListener('scroll', () => {
        openModalByScroll();
    }, { once: true });


    //изменение хедера при скролле страницы
    const header = document.querySelector('.header');
    let isScrolled = false;

    window.addEventListener('scroll', function () {
        if (!isScrolled && window.scrollY > 200) {
            header.classList.add('opacity');
            header.classList.remove('opacity-default');
            isScrolled = true;
        } else if (isScrolled && window.scrollY <= 200) {
            header.classList.add('opacity-default');
            header.classList.remove('opacity');
            isScrolled = false;
        }
    });


    //Появление блоков при скролле анимация
    let blocks = document.querySelectorAll('.block-animate');

    function checkBlocksVisibility() {
        let windowHeight = window.innerHeight;

        blocks.forEach(block => {
            let blockPosition = block.getBoundingClientRect().top;

            if (blockPosition < windowHeight - 100) {
                block.style.opacity = "1";
                block.style.transform = "translateY(0)";
            }
        });
    }

    checkBlocksVisibility();

    window.addEventListener('scroll', checkBlocksVisibility);


    //БУРГЕР

    const iconBurger = document.querySelector('.menu-burg');
    const menuBody = document.querySelector('.header__nav-body');

    if (iconBurger) {
        iconBurger.addEventListener('click', (e) => {
            document.body.classList.toggle('_lock');
            iconBurger.classList.toggle('_active');
            menuBody.classList.toggle('_active');
        });
    }

    //Запускает видео
    document.querySelector('video').play();
});

