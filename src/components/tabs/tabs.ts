import './tabs.css';

class Tabs {
    protected customEvent: CustomEvent = new CustomEvent('tabs:switched', {
        detail: {
            activeTab: null,
        },
    });
    private readonly tabsSelector: string;
    private readonly tabsActionSelector: string;
    private readonly tabsTabSelector: string;
    private readonly tabsElement: HTMLDivElement | null = null;
    private readonly tabsActionElements: NodeListOf<HTMLElement> | null = null;
    private readonly tabsTabElements: NodeListOf<HTMLElement> | null = null;
    private readonly tabsInitialActiveTab: number;

    constructor(
        selector = '.js-tabs',
        actionSelector = '[data-tab]',
        tabSelector = '[aria-labelledby]',
        initialActiveTab = 1,
    ) {
        this.tabsSelector = selector;
        this.tabsActionSelector = actionSelector;
        this.tabsTabSelector = tabSelector;
        this.tabsElement = document.querySelector(this.tabsSelector);
        this.tabsInitialActiveTab = initialActiveTab;

        if (!this.tabsElement) {
            throw new Error(
                `Wrong tabs initialization. Please, check ${this.tabsSelector} selector.`,
            );
        }

        this.tabsActionElements = this.tabsElement.querySelectorAll(
            this.tabsActionSelector,
        );

        this.tabsTabElements = this.tabsElement.querySelectorAll(
            this.tabsTabSelector,
        );

        this.init();
        this.bindTabs();
    }

    protected init() {
        if (
            !(
                this.tabsActionElements &&
                this.tabsTabElements &&
                this.tabsActionElements.length === this.tabsTabElements.length
            )
        ) {
            throw new Error(
                `Wrong tabs initialization. Please, check ${this.tabsSelector}, ${this.tabsTabSelector} selectors. The number of tabs actions and tab panes should be equal.`,
            );
        }

        if (
            this.tabsInitialActiveTab < 1 ||
            this.tabsInitialActiveTab > this.tabsActionElements.length
        ) {
            throw new Error(
                `Initial active tab index is out of range. Max index is: ${this.tabsActionElements.length}.`,
            );
        }

        [...this.tabsActionElements].forEach((action, index) => {
            action.classList.toggle(
                'tabs-action-active',
                index + 1 === this.tabsInitialActiveTab,
            );

            action.setAttribute(
                'aria-selected',
                index + 1 === this.tabsInitialActiveTab ? 'true' : 'false',
            );
        });

        [...this.tabsTabElements].forEach((tab, index) => {
            tab.classList.toggle(
                'tabs-pane-active',
                index + 1 === this.tabsInitialActiveTab,
            );

            tab.setAttribute(
                'aria-hidden',
                index + 1 === this.tabsInitialActiveTab ? 'false' : 'true',
            );
        });
    }

    protected switchTab(action: HTMLElement) {
        if (
            !(
                this.tabsActionElements &&
                this.tabsTabElements &&
                this.tabsActionElements.length === this.tabsTabElements.length
            )
        ) {
            throw new Error(
                `Wrong tabs initialization. Please, check ${this.tabsSelector}, ${this.tabsTabSelector} selectors. The number of tabs actions and tab panes should be equal.`,
            );
        }

        [...this.tabsActionElements].forEach((item) => {
            item.classList.toggle('tabs-action-active', item === action);
            item.setAttribute(
                'aria-selected',
                item === action ? 'true' : 'false',
            );
        });

        [...this.tabsTabElements].forEach((tab) => {
            tab.classList.toggle(
                'tabs-pane-active',
                tab.getAttribute('aria-labelledby') ===
                    action.getAttribute('id'),
            );

            tab.setAttribute(
                'aria-hidden',
                tab.getAttribute('aria-labelledby') ===
                    action.getAttribute('id')
                    ? 'false'
                    : 'true',
            );
        });

        /**
         * Dispatch a custom event when the tab is switched.
         * The event contains the active tab index.
         * Useful when you need to update the slider size, for example.
         */
        const activeTabIndex = [...this.tabsActionElements].indexOf(action);
        const customEvent = new CustomEvent('tabs:switched', {
            detail: {
                activeTab: activeTabIndex + 1,
            },
        });

        window.dispatchEvent(customEvent);
    }

    protected bindTabs() {
        if (!(this.tabsActionElements && this.tabsTabElements)) {
            throw new Error('Wrong tabs initialization.');
        }

        this.tabsActionElements.forEach((action) => {
            action.addEventListener('click', () => {
                if (!action.classList.contains('tabs-action-active')) {
                    this.switchTab(action);
                }
            });
        });
    }
}

export default Tabs;
