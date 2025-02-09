if (!customElements.get("s-benefits")) {
  customElements.define(
    "s-benefits",
    class SectioBenefits extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        this.initThumbSlider();
        this.initMainSlider();
        this.updateThumbSliderState();

        window.addEventListener("resize", () => this.updateThumbSliderState());

        // Переключение основного слайда при клике на миниатюру
        this.thumbSlider.slides.forEach((slide, index) => {
          slide.addEventListener("click", () => {
            this.slider.slideTo(index);
          });
        });

        // Прокрутка миниатюр при смене основного слайда (только если нужно)
        this.slider.on("slideChange", () => {
          if (!this.isThumbnailsScrollable()) return;

          const activeThumb = this.thumbSlider.slides[this.slider.activeIndex];
          const thumbContainer = this.thumbSlider.el;

          if (activeThumb) {
            const thumbRect = activeThumb.getBoundingClientRect();
            const containerRect = thumbContainer.getBoundingClientRect();

            if (thumbRect.left < containerRect.left || thumbRect.right > containerRect.right) {
              activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
            }
          }
        });
      }

      initThumbSlider() {
        this.thumbSlider = new Swiper(".js-benefits__thumbnail", {
          spaceBetween: 16,
          slidesPerView: "auto",
          freeMode: true,
          watchSlidesProgress: true,
        });
      }

      initMainSlider() {
        this.slider = new Swiper(".js-benefits__main-slider", {
          spaceBetween: 0,
          navigation: true,
          thumbs: {
            swiper: this.thumbSlider,
          },
        });
      }

      isThumbnailsScrollable() {
        const thumbContainer = this.thumbSlider.el;
        const totalSlidesWidth = Array.from(this.thumbSlider.slides).reduce((acc, slide) => acc + slide.offsetWidth, 0);
        return totalSlidesWidth > thumbContainer.offsetWidth;
      }

      updateThumbSliderState() {
        if (this.isThumbnailsScrollable()) {
          this.thumbSlider.params.freeMode = true;
          this.thumbSlider.params.allowTouchMove = true;
          this.thumbSlider.el.classList.remove("is-static");
        } else {
          this.thumbSlider.params.freeMode = false;
          this.thumbSlider.params.allowTouchMove = false;
          this.thumbSlider.el.classList.add("is-static");
        }
        this.thumbSlider.update(); // Обновляем Swiper после изменений параметров
      }

      disconnectedCallback() {
        window.removeEventListener("resize", this.updateThumbSliderState);
      }
    }
  );
}
