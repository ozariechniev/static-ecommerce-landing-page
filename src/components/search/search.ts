import './search.css';

class Search {
    searchBlockSelector: string = '.js-search-block';
    searchBlockElement: HTMLElement | null;
    searchTriggerSelector: string = '.js-search-trigger';
    searchTriggerElement: HTMLElement | null;

    constructor() {
        this.searchBlockElement = document.querySelector(
            this.searchBlockSelector,
        );
        this.searchTriggerElement = document.querySelector(
            this.searchTriggerSelector,
        );

        if (this.searchTriggerElement && this.searchBlockElement) {
            this.bindEvents();
        }
    }

    protected toggleSearchBlock() {
        document.body.classList.toggle('search-active');
        this.searchBlockElement?.classList.toggle('active');
        this.searchTriggerElement?.classList.toggle('active');
    }

    protected bindEvents() {
        this.searchTriggerElement?.addEventListener('click', () => {
            this.toggleSearchBlock();
        });

        document.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            const isClickInsideSearchBlock =
                this.searchBlockElement?.contains(target);
            const isClickInsideSearchTrigger =
                this.searchTriggerElement?.contains(target);

            if (
                !isClickInsideSearchBlock &&
                !isClickInsideSearchTrigger &&
                this.searchBlockElement?.classList.contains('active')
            ) {
                this.toggleSearchBlock();
            }
        });
    }
}

export default Search;
