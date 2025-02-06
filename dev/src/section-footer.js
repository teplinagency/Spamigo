if (!customElements.get("s-footer")) {
  customElements.define(
    "s-footer",
    class SectioFooter extends HTMLElement {
      constructor() {
        super();

      }

      connectedCallback() {
        this.details = Array.from(this.querySelectorAll(".js-footer__details"));

        this.resizeHandler();
        window.addEventListener("resize", this.resizeHandler);
      }

      disconnectedCallback() {
        window.removeEventListener("resize", this.resizeHandler)
      }

      resizeHandler = () => {
        if(window.innerWidth >= 992) {
          this.details.forEach(el => el.setAttribute("open", ""))
        } else {
          this.details.forEach(el => el.removeAttribute("open"))
          this.details[0]?.setAttribute("open", "");
        }
      }
     }
  );
}
