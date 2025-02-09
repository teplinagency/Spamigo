if (!customElements.get("s-collections-slider")) {
  customElements.define(
    "s-collections-slider",
    class SectioCollectionsSlider extends HTMLElement {
      constructor() {
        super();

      }

      connectedCallback() {
        this.swiper = new Swiper(this, {
          slidesPerView: 1.5,
          spaceBetween: 16,
          speed: 400,
          breakpoints: {
            560: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            992: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 5,
            },
          }
        })
      }

      disconnectedCallback() {
      }
    }
  );
}
