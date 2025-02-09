if (!customElements.get("s-hero-banner")) {
  customElements.define(
    "s-hero-banner",
    class SectioHeroBanner extends HTMLElement {
      constructor() {
        super();

      }

      connectedCallback() {
        this.swiper = new Swiper(this, {
          slidesPerView: 1,
          spaceBetween: 0,
          speed: 400
        })

        this.toTop = this.classList.contains("js-hero-banner--to-top");

        if(this.toTop) {
          this.toTopHandler();
          window.addEventListener("resize", this.toTopHandler)
        }
      }

      disconnectedCallback() {
        window.removeEventListener("resize", this.toTopHandler)
      }

      toTopHandler = () => {
        let header = document.querySelector("s-header") || null;
        let main = document.querySelector("#main-content") || null;

        console.log(header, main)

        if (header && main && window.innerWidth >= 992) {
          main.style.marginTop = `-${header.offsetHeight}px`
        } else {
          main.style.marginTop = `0`
        }
      }
    }
  );
}
