if (!customElements.get("s-header")) {
  customElements.define(
    "s-header",
    class SectioHeader extends HTMLElement {
      constructor() {
        super();

      }

      connectedCallback() {
        this.mobileMenuButton = this.querySelector(".js-header__burger-button");

        this.mobileMenuButton.addEventListener("click", this.mobileMenuHandler)
      }

      disconnectedCallback() {
        this.mobileMenuButton.removeEventListener("click", this.mobileMenuHandler)
      }

      mobileMenuHandler = (event) => {
        event.preventDefault();

        window.PubSub.publish("mobile-menu", this.mobileMenuButton.classList.contains("is-active"))

        if(this.mobileMenuButton.classList.contains("is-active")) {
          this.mobileMenuButton.classList.remove("is-active")
        } else {
          this.mobileMenuButton.classList.add("is-active")
        }
      }
    }
  );
}
