if (!customElements.get("s-marquee")) {
  customElements.define(
    "s-marquee",
    class SectioMarquee extends HTMLElement {
      constructor() {
        super();

      }

      connectedCallback() {
        this.swiper = new Swiper(this, {
          slidesPerView: "auto",
          spaceBetween: 40,
          loop: true,
          breakpoints: {
            1200: {
              spaceBetween: 70,
            }
          }
        })
      }

      disconnectedCallback() {

      }
    }
  );
}
