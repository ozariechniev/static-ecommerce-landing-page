import Search from './components/search/search.ts';
import Modal from './components/modal/modal.ts';
import HeroSlider from './components/hero-slider/hero-slider.ts';
import ScrollbarSlider from './components/scrollbar-slider/scrollbar-slider.ts';
import Tabs from './components/tabs/tabs.ts';

class App {
    constructor() {
        // Header

        new Search();
        new Modal();

        // Content

        new HeroSlider();
        new Tabs();

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
