if (!customElements.get("s-tabs")) {
  customElements.define(
    "s-tabs",
    class SectioTabs extends HTMLElement {
      constructor() {
        super();

      }

      connectedCallback() {
        this.btnPrev = this.querySelector(".js-tabs__slider-btn--prev");
        this.btnNext = this.querySelector(".js-tabs__slider-btn--next");

        this.pagination = Array.from(this.querySelectorAll(".js-tabs__trigger"));

        this.swiper = new Swiper(".js-tabs__slider", {
          slidesPerView: 1,
          spaceBetween: 20,
          speed: 400
        })

        this.swiper.on("slideChange", this.slideChange)

        this.btnNext.addEventListener("click", this.slideNext);
        this.btnPrev.addEventListener("click", this.slidePrev);

        this.pagination.forEach(el => {
          el.addEventListener("click", this.slideTo.bind(this, el))
        })
      }

      disconnectedCallback() {
      }

      slideChange = (event) => {
        let index = event.activeIndex;

        this.pagination.forEach(el => {
          el.classList.remove("is-active");
          if (el.dataset.index == index) el.classList.add("is-active");
        })
      }

      slideNext = () => {
        this.swiper.slideNext()
      }

      slidePrev = () => {
        this.swiper.slidePrev()
      }

      slideTo = (el) => {
        let index = el.dataset.index;

        this.swiper.slideTo(index)
      }
    }
  );
}
