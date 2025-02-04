if (!customElements.get("c-mobile-menu")) {
  customElements.define(
    "c-mobile-menu",
    class ComponentMobileMenu extends HTMLElement {
      constructor() {
        super();

      }

      connectedCallback() {
        this.header = document.querySelector("s-header");
        this.body = document.querySelector("body");
        window.PubSub.subscribe("mobile-menu", this.mobileMenuHandler);
        window.addEventListener("resize", this.calculateHeight)
      }

      disconnectedCallback() {
        window.removeEventListener("resize", this.calculateHeight)
      }

      mobileMenuHandler = (active) => {
        this.calculateHeight();

        if(active) {
          this.body.classList.remove("modal-open")
          this.classList.remove("is-active")
        } else {
          this.body.classList.add("modal-open")
          this.classList.add("is-active")
        }
      }

      calculateHeight = () => {
        if(!this.header) return;

        let rect = this.header.getBoundingClientRect();

        this.style.top = rect.top + rect.height + "px";
        this.style.height = `calc(100dvh - ${rect.top + rect.height}px)`
      }
    }
  );
}
