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

    /**
     * @constructor
     * @param selector
     * @param options
     */
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
                    this.swiperElement,
                );

                this.bindWindowResize(
                    swiperScreenTestElement,
                    this.swiperElement,
                );

                this.bindIntersectionObserver(
                    swiperScreenTestElement,
                    this.swiperElement,
                );

                this.init(selector, options);
            },
        );
    }

    /**
     * Screen test element is created to calculate the slider negative margin
     * from the right side.
     *
     * @param swiperParentElement - Insert the screen test element before this element.
     * @param callback - Set the slider position after the screen test element is created.
     * @protected
     */
    protected createScreenTestElement(
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
     * @param swiperScreenTestElement
     * @param swiperElement
     * @protected
     */
    protected setSliderPosition(
        swiperScreenTestElement: HTMLElement,
        swiperElement: HTMLElement | null,
    ) {
        const leftPosition =
            swiperScreenTestElement.getBoundingClientRect().left;

        if (!swiperElement) {
            throw new Error('Parent element not found.');
        }

        swiperElement.style.setProperty('margin-right', `-${leftPosition}px`);
    }

    /**
     * @param swiperScreenTestElement
     * @param swiperElement
     * @protected
     */
    protected bindWindowResize(
        swiperScreenTestElement: HTMLElement,
        swiperElement: HTMLElement | null,
    ) {
        window.addEventListener('resize', () => {
            this.setSliderPosition(swiperScreenTestElement, swiperElement);
        });
    }

    /**
     * @param swiperScreenTestElement
     * @param swiperElement
     * @protected
     */
    protected bindIntersectionObserver(
        swiperScreenTestElement: HTMLElement,
        swiperElement: HTMLElement | null,
    ) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    this.setSliderPosition(
                        swiperScreenTestElement,
                        swiperElement,
                    );
                }
            });
        });

        observer.observe(swiperScreenTestElement);
    }

    /**
     * @param selector
     * @param options
     * @protected
     */
    protected init(selector: string, options: SwiperOptions) {
        if (this.swiperInstance) {
            throw new Error('Swiper instance already exists.');
        }

        this.swiperInstance = new Swiper(selector, options);

        /**
         * Update scrollbar size when the tab is switched
         * to avoid scrollbar issues.
         */
        window.addEventListener(
            'tabs:switched',
            (event: Event) => {
                const customEvent = event as CustomEvent;
                const { activeTab } = customEvent.detail;

                if (!activeTab || !this.swiperElement) {
                    return;
                }

                const hasParentTab = this.swiperElement.closest(
                    `[aria-labelledby="tab-${activeTab}-action"]`,
                );

                if (hasParentTab && this.swiperInstance instanceof Swiper) {
                    this.swiperInstance.scrollbar?.updateSize();
                }
            },
            false,
        );
    }
}

export default ScrollbarSlider;
