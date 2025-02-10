document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".filter-btn");
  const sections = document.querySelectorAll(".brand-section");
  const clearBtn = document.querySelector(".brand-section-clear");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      buttons.forEach((btn) => btn.classList.remove("filter-btn-active"));
      this.classList.add("filter-btn-active");
      clearBtn.classList.add("brand-section-clear-show");
      const letter = this.dataset.letter;
      sections.forEach((section) => {
        section.style.display =
          section.dataset.letter === letter ? "block" : "none";
      });
    });
  });

  clearBtn.addEventListener("click", () => {
    buttons.forEach((button) => {
      button.classList.remove("filter-btn-active");
    });
    sections.forEach((section) => {
      section.style.display = "block";
    });
    clearBtn.classList.remove("brand-section-clear-show");
  });

  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");

  input.addEventListener("input", function () {
    const query = input.value.trim();
    if (query.length < 2) {
      resultsContainer.style.display = "none";
      return;
    }

    fetch(
      `/search/suggest.json?q=${encodeURIComponent(
        query
      )}&resources[type]=product,collection&resources[limit]=5`
    )
      .then((res) => res.json())
      .then((data) => {
        resultsContainer.innerHTML = "";

        const products = data.resources.results.products;
        const collections = data.resources.results.collections;

        if (products.length === 0 && collections.length === 0) {
          resultsContainer.style.display = "none";
          return;
        }

        products.forEach((product) => {
          const link = document.createElement("a");
          link.href = product.url;
          link.textContent = `🛒 ${product.title}`;
          resultsContainer.appendChild(link);
        });

        collections.forEach((collection) => {
          const link = document.createElement("a");
          link.href = collection.url;
          link.textContent = `📁 ${collection.title}`;
          resultsContainer.appendChild(link);
        });

        resultsContainer.style.display = "block";
      })
      .catch((err) => console.error("Search error:", err));
  });

  document.addEventListener("click", function (event) {
    if (!resultsContainer.contains(event.target) && event.target !== input) {
      resultsContainer.style.display = "none";
    }
  });
});
