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
});
