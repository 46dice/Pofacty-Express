"use strict"

//TABS
window.addEventListener('DOMContentLoaded', () => {

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
    const goTopBtn = document.querySelector('.scroll-to-top');

    let toTopBtn = document.querySelector(".scroll-to-top");
    let pageYOffset = 0;
    let timeout;
    window.onscroll = function () {
        if (timeout) {
            window.clearTimeout(timeout);
        }
        if (window.pageYOffset > 580) {
            toTopBtn.style.display = "block";
        } else {
            toTopBtn.style.display = "none";
        }
        pageYOffset = window.pageYOffset;
        timeout = window.setTimeout(function () {
            if (window.pageYOffset === pageYOffset) {
                toTopBtn.style.display = "none";
            }
        }, 2000);
    }
    // плавный скролл наверх
    toTopBtn.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });


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
        modal = document.querySelector('[data-modal]');

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

    window.addEventListener('scroll', openModalByScroll);


});
