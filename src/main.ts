import HeroSlider from './components/hero-slider.ts';
import ScrollbarSlider from './components/scrollbar-slider.ts';
import Tabs from './components/tabs.ts';

class App {
    constructor() {
        // --------------------------------------------------------------------
        // Hero Slider
        // --------------------------------------------------------------------

        const heroSliderSelector = '.js-hero-slider';
        const heroSliderOptions = {
            autoplay: {
                delay: 7000,
            },
        };

        new HeroSlider(heroSliderSelector, heroSliderOptions);

        // --------------------------------------------------------------------
        // Tabs
        // --------------------------------------------------------------------

        const tabsSelector = '.js-tabs';

        new Tabs(tabsSelector);

        // --------------------------------------------------------------------
        // Scrollbar Slider
        // --------------------------------------------------------------------

        const scrollbarSliderSelector = '.js-scrollbar-slider';
        const scrollbarSliders = document.querySelectorAll(
            `[class*="${scrollbarSliderSelector.slice(1)}"]`,
        );

        if (scrollbarSliders.length > 0) {
            [...scrollbarSliders].forEach((_, index) => {
                new ScrollbarSlider(`${scrollbarSliderSelector}-${index + 1}`, {
                    scrollbar: {
                        el: `.swiper-scrollbar-${index + 1}`,
                        draggable: true,
                    },
                });
            });
        }
    }
}

new App();
