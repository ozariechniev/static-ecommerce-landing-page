import { SwiperOptions } from 'swiper/types';
import Swiper from 'swiper';
import 'swiper/css';
import './hero-slider.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

class HeroSlider {
    private readonly swiperSelector: string;
    private readonly swiperOptions: SwiperOptions;
    private readonly swiperDefaultOptions: SwiperOptions;
    private swiperInstance: Swiper | null = null;

    constructor(
        selector: string = '.js-hero-slider',
        options: SwiperOptions = {},
    ) {
        this.swiperSelector = selector;

        const swiperElement = document.querySelector<HTMLDivElement>(
            this.swiperSelector,
        );

        if (!swiperElement) {
            throw new Error(
                `Element with selector ${this.swiperSelector} not found.`,
            );
        }

        this.swiperDefaultOptions = {
            autoplay: {
                delay: 7000,
            },
            loop: true,
            pagination: {
                el: `${selector} .swiper-pagination`,
                clickable: true,
            },
            navigation: {
                nextEl: `${selector} .swiper-button-next`,
                prevEl: `${selector} .swiper-button-prev`,
            },
            modules: [Autoplay, Navigation, Pagination],
        };

        this.swiperOptions = { ...this.swiperDefaultOptions, ...options };

        this.init();
    }

    protected init() {
        if (this.swiperInstance) {
            throw new Error('Swiper instance already exists.');
        }

        this.swiperInstance = new Swiper(
            this.swiperSelector,
            this.swiperOptions,
        );
    }
}

export default HeroSlider;
