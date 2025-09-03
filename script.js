function createFilterButtons() {
  const mainFilters = document.querySelector(".main-filters");
  const categoryFilters = document.querySelector(".category-filters");
  const filtersContainer = document.querySelector(".filters-container");
  const buttons = document.querySelectorAll("button");
  const skills = document.querySelectorAll(".skill");

  // Function to check width and show/hide filters
  function checkWidthAndShowFilters() {
    if (window.innerWidth >= 250) {
      filtersContainer.style.display = "flex";
    } else {
      filtersContainer.style.display = "none";
    }
  }

  // Initial check
  checkWidthAndShowFilters();

  // Add resize event listener
  window.addEventListener("resize", checkWidthAndShowFilters);

  // Add click handlers
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });

      if (button.dataset.filter !== "all") {
        button.classList.add("active");
      }
      button.setAttribute("aria-pressed", "true");

      const filter = button.dataset.filter;
      console.log(filter);

      skills.forEach((skill) => {
        console.log(skill.dataset.category);
        if (filter === "all") {
          skill.classList.remove("hidden");
        } else if (filter === "taught" && skill.dataset.taught === "true") {
          skill.classList.remove("hidden");
        } else if (filter === "future" && skill.dataset.future === "true") {
          skill.classList.remove("hidden");
        } else if (
          filter === "collaborated" &&
          skill.dataset.collaborated === "true"
        ) {
          skill.classList.remove("hidden");
        } else if (
          filter === "languages" &&
          skill.dataset.category === "languages"
        ) {
          skill.classList.remove("hidden");
        } else if (
          filter === "frameworks-libraries" &&
          skill.dataset.category === "frameworks-libraries"
        ) {
          skill.classList.remove("hidden");
        } else if (
          filter === "backend-data" &&
          skill.dataset.category === "backend-data"
        ) {
          skill.classList.remove("hidden");
        } else if (
          filter === "testing" &&
          skill.dataset.category === "testing"
        ) {
          skill.classList.remove("hidden");
        } else if (
          filter === "tooling" &&
          skill.dataset.category === "tooling"
        ) {
          skill.classList.remove("hidden");
        } else {
          skill.classList.add("hidden");
        }
      });
    });
  });
}

createFilterButtons();
