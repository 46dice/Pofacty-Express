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


    const anchors = document.querySelectorAll('a[href*="#"]')
    for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()

            const blockID = anchor.getAttribute('href').substr(1)

            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        })
    }


    //Стрелка наверх
    // let toTopBtn = document.querySelector(".scroll-to-top");
    // let pageYOffset = 0;
    // let timeout;
    // window.onscroll = function () {
    //     if (timeout) {
    //         window.clearTimeout(timeout);
    //     }
    //     if (window.pageYOffset > 580) {
    //         toTopBtn.style.display = "block";
    //     } else {
    //         toTopBtn.style.display = "none";
    //     }
    //     pageYOffset = window.pageYOffset;
    //     timeout = window.setTimeout(function () {
    //         if (window.pageYOffset === pageYOffset) {
    //             toTopBtn.style.display = "none";
    //         }
    //     }, 2000);
    // }
    // // плавный скролл наверх
    // toTopBtn.addEventListener("click", function () {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    // });


    // window.addEventListener("scroll", trackScroll);
    // // обработчик на нажатии
    // goTopBtn.addEventListener("click", goTop);

    // function trackScroll() {
    //     // вычисляем положение от верхушки страницы
    //     const scrolled = window.pageYOffset;
    //     // считаем высоту окна браузера
    //     const coords = document.documentElement.clientHeight;
    //     // если вышли за пределы первого окна
    //     if (scrolled > coords) {
    //         // кнопка появляется
    //         goTopBtn.classList.add("show");
    //     } else {
    //         // иначе исчезает
    //         goTopBtn.classList.remove("show");
    //     }
    // }

    // function goTop() {
    //     // пока не вернулись в начало страницы
    //     if (window.pageYOffset > 0) {
    //         // скроллим наверх
    //         window.scrollBy(0, -75); // второй аргумент - скорость
    //         setTimeout(goTop, 0); // входим в рекурсию
    //     }
    // }


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

    // window.onscroll = function () {
    //     if (window.scrollTop() > 200) {
    //         header.classList.add('opacity');
    //     } else {
    //         header.classList.remove('opacity-default');
    //     }
    // }

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


});

