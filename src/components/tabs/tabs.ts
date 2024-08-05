import './tabs.css';

class Tabs {
    protected customEvent: CustomEvent = new CustomEvent('tabs:switched', {
        detail: {
            activeTab: null,
        },
    });

    tabsSelector = '.js-tabs';
    tabsElement: HTMLElement | null = null;
    tabsActionSelector = '[data-tab]';
    tabsActionElements: NodeListOf<HTMLElement> | null = null;
    tabsTabSelector = '[aria-labelledby]';
    tabsTabElements: NodeListOf<HTMLElement> | null = null;

    constructor(selector = this.tabsSelector) {
        this.tabsSelector = selector;
        this.tabsElement = document.querySelector(selector);

        if (!this.tabsElement) {
            throw new Error(`Element with selector ${selector} not found.`);
        }

        this.tabsActionElements = this.tabsElement.querySelectorAll(
            this.tabsActionSelector,
        );

        this.tabsTabElements = this.tabsElement.querySelectorAll(
            this.tabsTabSelector,
        );

        if (
            !this.tabsActionElements ||
            !this.tabsTabElements ||
            this.tabsActionElements.length !== this.tabsTabElements.length
        ) {
            throw new Error('Wrong tabs initialization.');
        }

        this.init(this.tabsActionElements, this.tabsTabElements);
        this.bindTabs(this.tabsActionElements, this.tabsTabElements);
    }

    protected init(
        actions: NodeListOf<HTMLElement>,
        tabs: NodeListOf<HTMLElement>,
    ) {
        [...actions].forEach((action) => {
            if (action.classList.contains('tabs-action-active')) {
                action.setAttribute('aria-selected', 'true');
            } else {
                action.setAttribute('aria-selected', 'false');
            }
        });

        [...tabs].forEach((tab) => {
            if (tab.classList.contains('tabs-pane-active')) {
                tab.setAttribute('aria-hidden', 'false');
            } else {
                tab.setAttribute('aria-hidden', 'true');
            }
        });
    }

    protected bindTabs(
        actions: NodeListOf<HTMLElement>,
        tabs: NodeListOf<HTMLElement>,
    ) {
        actions.forEach((action) => {
            action.addEventListener('click', () => {
                if (!action.classList.contains('tabs-action-active')) {
                    this.switchTab(actions, tabs, action);
                }
            });
        });
    }

    protected switchTab(
        actions: NodeListOf<HTMLElement>,
        tabs: NodeListOf<HTMLElement>,
        action: HTMLElement,
    ) {
        [...actions].forEach((item) => {
            if (item === action) {
                item.classList.add('tabs-action-active');
                item.setAttribute('aria-selected', 'true');
            } else {
                item.classList.remove('tabs-action-active');
                item.setAttribute('aria-selected', 'false');
            }
        });

        [...tabs].forEach((tab) => {
            if (
                tab.getAttribute('aria-labelledby') ===
                action.getAttribute('data-tab')
            ) {
                tab.classList.add('tabs-pane-active');
                tab.setAttribute('aria-hidden', 'false');
                tab.style.display = 'block';
            } else {
                tab.classList.remove('tabs-pane-active');
                tab.setAttribute('aria-hidden', 'true');
                tab.style.display = 'none';
            }
        });

        /**
         * Dispatch a custom event when the tab is switched.
         * The event contains the active tab index.
         * Useful when you need to update the slider size, for example.
         */
        const activeTabIndex = [...actions].indexOf(action);
        const customEvent = new CustomEvent('tabs:switched', {
            detail: {
                activeTab: activeTabIndex + 1,
            },
        });

        window.dispatchEvent(customEvent);
    }
}

export default Tabs;
