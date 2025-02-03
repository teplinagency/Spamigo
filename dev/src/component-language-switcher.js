if (!customElements.get("c-language-switcher")) {
  customElements.define(
    "c-language-switcher",
    class LanguageSwitcher extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector("form");
        this.switcherList = this.querySelector(".js-language-switcher__list");
      }

      connectedCallback() {
        this.switcherList.addEventListener("change", this.handleSwitch);
        this.form.addEventListener("submit", this.handleFormSubmit);
      }

      disconnectedCallback() {
        this.switcherList.removeEventListener("change", this.handleSwitch);
        this.form.removeEventListener("submit", this.handleFormSubmit);
      }

      handleSwitch = (event) => {
        const submitEvent = new Event("submit", {
          bubbles: true,
          cancelable: true,
        });

        this.form.dispatchEvent(submitEvent);
      };

      handleFormSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.formSubmit();
      };

      formSubmit = () => {
        this.form.removeEventListener("submit", this.handleFormSubmit);

        this.form.submit();
      };
    }
  );
}
