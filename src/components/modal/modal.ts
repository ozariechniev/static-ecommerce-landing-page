import './modal.css';

class Modal {
    private readonly modalSelector: string;
    private readonly modalElement: HTMLDivElement | null;
    private readonly modalCloseSelector: string;
    private readonly modalOpenSelector: string;
    private modalOpenElement: HTMLButtonElement | null = null;
    private isOpen: boolean;

    constructor(
        selector: string = '.js-modal',
        closeSelector: string = '.js-modal-close',
        openSelector: string = '.js-modal-open',
    ) {
        this.modalSelector = selector;
        this.modalCloseSelector = closeSelector;
        this.modalOpenSelector = openSelector;
        this.modalElement = document.querySelector<HTMLDivElement>(
            this.modalSelector,
        );

        if (!this.modalElement) {
            throw new Error(
                `Element with selector ${this.modalSelector} not found.`,
            );
        }

        this.isOpen = false;
        this.bindEvents();
    }

    protected bindEvents() {
        document.addEventListener('click', this.handleToggleModal.bind(this));
    }

    protected handleToggleModal(event: MouseEvent) {
        const target = event.target as HTMLElement;

        if (!target) {
            return;
        }

        const action = this.isOpen
            ? target.closest(this.modalCloseSelector) ||
              target.classList.contains(this.modalCloseSelector.slice(1)) ||
              !target.closest(this.modalSelector)
            : target.closest(this.modalOpenSelector) ||
              target.classList.contains(this.modalOpenSelector.slice(1));

        if (!action) {
            return;
        }

        if (this.modalOpenElement) {
            this.modalOpenElement.setAttribute('aria-expanded', 'false');
        }

        this.modalOpenElement = this.isOpen
            ? null
            : (action as HTMLButtonElement);

        this.toggleModal();
    }

    protected toggleModal() {
        document.body.classList.toggle('modal-active', !this.isOpen);

        this.modalElement?.setAttribute(
            'aria-hidden',
            this.isOpen ? 'true' : 'false',
        );

        this.modalOpenElement?.setAttribute(
            'aria-expanded',
            this.isOpen ? 'false' : 'true',
        );

        this.isOpen = !this.isOpen;
    }
}

export default Modal;
