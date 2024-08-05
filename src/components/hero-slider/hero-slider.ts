import { SwiperOptions } from 'swiper/types';
import Swiper from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import './hero-slider.css';

class HeroSlider {
    swiperSelector = '.js-hero-slider';
    swiperOptions: SwiperOptions = {
        loop: true,
        pagination: {
            el: `${this.swiperSelector} .swiper-pagination`,
            clickable: true,
        },
        navigation: {
            nextEl: `${this.swiperSelector} .swiper-button-next`,
            prevEl: `${this.swiperSelector} .swiper-button-prev`,
        },
        modules: [Autoplay, Navigation, Pagination],
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
        this.swiperOptions = options;

        if (!document.querySelector(this.swiperSelector)) {
            throw new Error(`Element with selector ${selector} not found.`);
        }

        if (options) {
            options = { ...this.swiperOptions, ...options };
        }

        this.init(selector, options);
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
    }
}

export default HeroSlider;
