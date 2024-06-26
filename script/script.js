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
    const headerBurgerBtn = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.mobile-menu__close');

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
        }
    })
}
document.querySelectorAll('.hero__swiper').forEach((slider, index) => {
    new Swiper(slider, {
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: {
            nextEl: document.querySelectorAll('[data-button="hero-next"]')[index],
            prevEl: document.querySelectorAll('[data-button="hero-prev"]')[index],
        },
    });
})
const projectsSlider = new Swiper('.projects__swiper', {
    slidesPerView: 3,
    spaceBetween: 20,
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
            slidesPerView: 'auto',
            spaceBetween: 20,
        },
        1062: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
    },
});
const gallerySlider = new Swiper('.gallery__swiper', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    navigation: {
        nextEl: document.querySelector('[data-button="gallery-next"]'),
        prevEl: document.querySelector('[data-button="gallery-prev"]'),
    },
});

header();

const modalTabsPanel = document.querySelector('.modal__top');
const modalTabs = document.querySelectorAll('.modal__tab');
modalTabsPanel.addEventListener('click', (e) => {
    if (e.target.closest('.modal__tab')) {
        const btn = e.target.closest('.modal__tab');
        modalTabs.forEach(tab => {
            if (tab === btn) {
                tab.classList.add('active');
            } else {
                if (tab.classList.contains('active')) {
                    tab.classList.remove('active')
                }
            }
        })
    }
})

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

const selects = document.querySelectorAll('.select');
selects.forEach((select, index) => {
    select.addEventListener('click', () => {
        select.classList.toggle('active');
    })
})

const toggler = document.querySelector('.projects__toggler > label');

if (toggler) {
    const labels = document.querySelectorAll('.projects__toggler-label');
    const togglerContent = [
        document.querySelector('.projects__slider'),
        document.querySelector('.projects__map')
    ]
    toggler.addEventListener('click', () => {
        labels[0].classList.toggle('active');
        labels[1].classList.toggle('active');
        togglerContent[0].classList.toggle('active');
        togglerContent[1].classList.toggle('active');
    })
}