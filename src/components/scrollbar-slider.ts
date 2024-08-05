import { SwiperOptions } from 'swiper/types';
import Swiper from 'swiper';
import { Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import './scrollbar-slider.css';

class ScrollbarSlider {
    swiperSelector = '.js-scrollbar-slider';
    swiperElement: HTMLElement | null = null;
    swiperParentElement: HTMLElement | null = null;
    swiperOptions: SwiperOptions = {
        slidesPerView: 'auto',
        spaceBetween: 10,
        breakpoints: {
            768: {
                spaceBetween: 20,
            },
            1024: {
                spaceBetween: 30,
            },
        },
        scrollbar: {
            el: `${this.swiperSelector} .swiper-scrollbar`,
            draggable: true,
        },
        modules: [Scrollbar],
    };
    swiperInstance: Swiper | null = null;

    constructor(
        selector: string = this.swiperSelector,
        options: SwiperOptions = this.swiperOptions,
    ) {
        this.swiperSelector = selector;
        this.swiperElement = document.querySelector(selector);
        this.swiperParentElement = this.swiperElement?.parentElement || null;

        if (!this.swiperElement) {
            throw new Error(`Element with selector ${selector} not found.`);
        }

        if (!this.swiperParentElement) {
            throw new Error(`Parent element of ${selector} not found.`);
        }

        if (options) {
            options = { ...this.swiperOptions, ...options };
        }

        this.createScreenTestElement(
            this.swiperParentElement,
            (swiperScreenTestElement) => {
                this.setSliderPosition(
                    swiperScreenTestElement,
                    this.swiperParentElement,
                );

                this.bindWindowResize(
                    swiperScreenTestElement,
                    this.swiperParentElement,
                );

                this.bindIntersectionObserver(
                    swiperScreenTestElement,
                    this.swiperParentElement,
                );

                this.init(selector, options);
            },
        );
    }

    /**
     * In order to align the slider with the container left edge, we need
     * to create a screen test element to track the left position.
     *
     * @param swiperParentElement - Insert the screen test element before this element.
     * @param callback - Set the slider position after the screen test element is created.
     */
    createScreenTestElement(
        swiperParentElement: HTMLElement,
        callback: (swiperScreenTestElement: HTMLElement) => void,
    ) {
        const swiperScreenTestElementHTML: string = `
            <div class="container relative mx-auto">
                <div class="swiper-screen-test left-[15px] right-[15px]  absolute h-[1px]"></div>
            </div>
        `;

        swiperParentElement.insertAdjacentHTML(
            'beforebegin',
            swiperScreenTestElementHTML,
        );

        const swiperScreenTestElementContainer =
            swiperParentElement.previousElementSibling as HTMLElement | null;

        const swiperScreenTestElement: HTMLElement | null =
            swiperScreenTestElementContainer
                ? swiperScreenTestElementContainer.querySelector(
                      '.swiper-screen-test',
                  )
                : null;

        if (swiperScreenTestElement) {
            callback(swiperScreenTestElement);
        }
    }

    /**
     * Set parent element padding-left property to align the slider
     * with the container left edge.
     *
     * @param swiperScreenTestElement
     * @param swiperParentElement
     */
    setSliderPosition(
        swiperScreenTestElement: HTMLElement,
        swiperParentElement: HTMLElement | null,
    ) {
        const leftPosition =
            swiperScreenTestElement.getBoundingClientRect().left;

        if (!swiperParentElement) {
            throw new Error('Parent element not found.');
        }

        swiperParentElement.style.setProperty(
            'padding-left',
            `${leftPosition}px`,
        );
    }

    bindWindowResize(
        swiperScreenTestElement: HTMLElement,
        swiperParentElement: HTMLElement | null,
    ) {
        window.addEventListener('resize', () => {
            this.setSliderPosition(
                swiperScreenTestElement,
                swiperParentElement,
            );
        });
    }

    bindIntersectionObserver(
        swiperScreenTestElement: HTMLElement,
        swiperParentElement: HTMLElement | null,
    ) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.setSliderPosition(
                        swiperScreenTestElement,
                        swiperParentElement,
                    );
                }
            });
        });

        observer.observe(swiperScreenTestElement);
    }

    init(selector: string, options: SwiperOptions) {
        if (this.swiperInstance) {
            throw new Error('Swiper instance already exists.');
        }

        this.swiperInstance = new Swiper(selector, options);
    }
}

export default ScrollbarSlider;
