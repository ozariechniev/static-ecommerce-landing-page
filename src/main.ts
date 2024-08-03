import HeroSlider from './components/hero-slider.ts';

class App {
    constructor() {
        new HeroSlider('.js-hero-slider', {
            autoplay: {
                delay: 7000,
            },
        });
    }
}

new App();
