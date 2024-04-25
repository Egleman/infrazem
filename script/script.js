const calcScroll = () => {
    let div = document.createElement('div');
    div.style.width = '500px';
    div.style.height = '500px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
}
const blockBody = () => {
    const body = document.body;
    body.style.overflowY = 'hidden';
    body.style.touchAction = 'none';
    const bodyScroll = calcScroll();
    body.style.paddingRight = `${bodyScroll}px`;
}
const unBlockBody = () => {
    const body = document.body;
    body.style.overflowY = 'auto';
    body.style.touchAction = 'auto';
    body.style.paddingRight = `0`;
}


const scrollLinks = document.querySelectorAll('[scroll]');
scrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const blockId = link.getAttribute('href');
        document.querySelector(blockId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    })
})


const modalLinks = document.querySelectorAll('[toggle]');
modalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const blockId = link.getAttribute('toggle');
        document.querySelector(blockId).classList.toggle('active');
        if (document.querySelector(blockId).classList.contains('active')) {
            blockBody();
        } else {
            unBlockBody();
        }
    })
})

const phoneInputs = document.querySelectorAll('[data-input="masked"]');
const onlyNumberInputs = document.querySelectorAll('[data-input="only-number"]');
const im = new Inputmask({
    mask: '(+7|8) (999) 999-99-99',
    showMaskOnHover: false,
    showMaskOnFocus: false,
    jitMasking: true,
    inputmode: 'tel'
})
phoneInputs.forEach(input => {
    im.mask(input);
})
onlyNumberInputs.forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    })
})

const header = () => {
    const headerSearchButton = document.querySelector('.header__list-link_icon');
    const searchModal = document.querySelector('.search');
    const headerBurgerBtn = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.mobile-menu__close');
    const mobileSearchBtn = document.querySelector('[data-button="mobile-search"]');
    const mobileMenuWrapper = document.querySelector('.mobile-menu__wrapper');
    const mobileMenuSearch = document.querySelector('.mobile-menu__search');
    const backSearchBtn = document.querySelector('.mobile-menu__back');

    headerSearchButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchModal.classList.add('active');
    })
    const closeActions = (modal) => {
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            modal.classList.add('close');
            unBlockBody();
            setTimeout(() => {
                if (modal.classList.contains('close')) {
                    modal.classList.remove('close')
                }
            }, 600)
        }
    }

    searchModal.addEventListener('click', (e) => {
        if (!e.target.closest('.header__search')) {
            closeActions(searchModal);
        }
    })

    headerBurgerBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        blockBody();
    })

    closeMenuBtn.addEventListener('click', () => {
        closeActions(mobileMenu);
    })
    mobileMenu.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu__body')) {
            closeActions(mobileMenu);
            mobileMenuWrapper.style.display = 'flex';
            mobileMenuSearch.classList.remove('active');
            closeMenuBtn.style.display = 'flex';
            backSearchBtn.style.display = 'none';
        }
    })

    window.addEventListener('resize', () => {
        if (window.innerWidth < 540) {
            closeActions(searchModal);
        }
        if (window.innerWidth > 1200) {
            closeActions(mobileMenu);
            mobileMenuWrapper.style.display = 'flex';
            mobileMenuSearch.classList.remove('active');
            closeMenuBtn.style.display = 'flex';
            backSearchBtn.style.display = 'none';
        } 
    })


    mobileSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mobileMenuWrapper.style.display = 'none';
        mobileMenuSearch.classList.add('active');
        closeMenuBtn.style.display = 'none';
        backSearchBtn.style.display = 'flex';
    })
    backSearchBtn.addEventListener('click', () => {
        mobileMenuWrapper.style.display = 'flex';
        mobileMenuSearch.classList.remove('active');
        closeMenuBtn.style.display = 'flex';
        backSearchBtn.style.display = 'none';
    })
}

const goodSlider = new Swiper('.hero__swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    navigation: {
        nextEl: '[data-button="hero-next"]',
        prevEl: '[data-button="hero-prev"]',
    },
});
const newsSlider = new Swiper('.news__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    navigation: {
        nextEl: '[data-button="news-next"]',
        prevEl: '[data-button="news-prev"]',
    },
    breakpoints: {
        0: {
            slidesPerView: 'auto',
            spaceBetween: 15,
        },
        // 375: {
        //     slidesPerView: 1.2,
        //     spaceBetween: 15,
        // },
        606: {
            slidesPerView: 1.5,
            spaceBetween: 15,
        },
        700: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1150: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    },
});
const gallerySlider = new Swiper('.gallery__swiper', {
    slidesPerView: 'auto',
    // freeMode: true,
    loop: true,
    spaceBetween: 30,
    navigation: {
        nextEl: '[data-button="gallery-next"]',
        prevEl: '[data-button="gallery-prev"]',
    },
    pagination: {
        el: ".gallery__pagination",
        clickable: true,
        bulletActiveClass: 'gallery-bullet-active',
        bulletClass: 'gallery-bullet',
    },
    breakpoints: {
        0: {
            spaceBetween: 15,
        },
        606: {
            spaceBetween: 24,
        },
        1022: {
            spaceBetween: 30,
        },
    },
});
const historySlider = new Swiper('.history__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    allowTouchMove: true,
    loop: true,
    navigation: {
        nextEl: '[data-button="history-next"]',
        prevEl: '[data-button="history-prev"]',
    },
    breakpoints: {
        0: {
            slidesPerView: 'auto',
            spaceBetween: 15,
        },
        606: {
            slidesPerView: 'auto',
            spaceBetween: 20,
        },
        1022: {
            slidesPerView: 'auto',
            spaceBetween: 30,
        }
    },
});
header();



class Accordion {
    constructor(target, config) {
        this._el = typeof target === 'string' ? document.querySelector(target) : target;
        const defaultConfig = {
            alwaysOpen: true,
            duration: 350
        };
        this._config = Object.assign(defaultConfig, config);
        this.addEventListener();
    }
    addEventListener() {
        this._el.addEventListener('click', (e) => {
            const elHeader = e.target.closest('.accordion__header');
            if (!elHeader) {
                return;
            }
            this.toggle(elHeader.parentElement);
        });
    }
    show(el) {
        const elBody = el.querySelector('.accordion__body');
        if (elBody.classList.contains('collapsing') || el.classList.contains('accordion__item_show')) {
            return;
        }
        elBody.style.display = 'block';
        const height = elBody.offsetHeight;
        elBody.style.height = 0;
        elBody.style.overflow = 'hidden';
        elBody.style.transition = `height ${this._config.duration}ms ease`;
        elBody.classList.add('collapsing');
        el.classList.add('accordion__item_slidedown');
        elBody.offsetHeight;
        elBody.style.height = `${height}px`;
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            el.classList.remove('accordion__item_slidedown');
            elBody.classList.add('collapse');
            el.classList.add('accordion__item_show');
            elBody.style.display = '';
            elBody.style.height = '';
            elBody.style.transition = '';
            elBody.style.overflow = '';
        }, this._config.duration);
    }
    hide(el) {
        const elBody = el.querySelector('.accordion__body');
        if (elBody.classList.contains('collapsing') || !el.classList.contains('accordion__item_show')) {
            return;
        }
        elBody.style.height = `${elBody.offsetHeight}px`;
        elBody.offsetHeight;
        elBody.style.display = 'block';
        elBody.style.height = 0;
        elBody.style.overflow = 'hidden';
        elBody.style.transition = `height ${this._config.duration}ms ease`;
        elBody.classList.remove('collapse');
        el.classList.remove('accordion__item_show');
        elBody.classList.add('collapsing');
        window.setTimeout(() => {
            elBody.classList.remove('collapsing');
            elBody.classList.add('collapse');
            elBody.style.display = '';
            elBody.style.height = '';
            elBody.style.transition = '';
            elBody.style.overflow = '';
        }, this._config.duration);
    }
    toggle(el) {
        el.classList.contains('accordion__item_show') ? this.hide(el) : this.show(el);
    }
}
const accordions = document.querySelectorAll('.accordion');
accordions.forEach(accordion => {
    new Accordion(accordion, {
        alwaysOpen: false
    });
})