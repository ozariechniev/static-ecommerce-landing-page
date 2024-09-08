import './search.css';

class Search {
    private readonly searchBlockSelector: string;
    private readonly searchTriggerSelector: string;
    private readonly searchBlockElement: HTMLDivElement | null;
    private readonly searchTriggerElement: HTMLButtonElement | null;

    constructor(
        blockSelector: string = '.js-search-block',
        triggerSelector: string = '.js-search-trigger',
    ) {
        this.searchBlockSelector = blockSelector;
        this.searchTriggerSelector = triggerSelector;
        this.searchBlockElement = document.querySelector<HTMLDivElement>(
            this.searchBlockSelector,
        );
        this.searchTriggerElement = document.querySelector<HTMLButtonElement>(
            this.searchTriggerSelector,
        );

        if (!this.searchBlockElement) {
            throw new Error(
                `Element with selector ${this.searchBlockSelector} not found.`,
            );
        }

        if (!this.searchTriggerElement) {
            throw new Error(
                `Element with selector ${this.searchTriggerSelector} not found.`,
            );
        }

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
        this.searchTriggerElement?.addEventListener(
            'click',
            this.toggleSearchBlock.bind(this),
        );

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
