function filterButtons(process = false) {
  const mainFilters = document.querySelector(
    process ? ".main-filters.process" : ".main-filters"
  );
  const categoryFilters = document.querySelector(
    process ? ".category-filters.process" : ".category-filters"
  );
  const filtersContainer = document.querySelector(
    process ? ".filters-container.process" : ".filters-container"
  );
  const buttons = document.querySelectorAll("button");
  const skills = document.querySelectorAll(
    process ? ".skill.process" : ".skill"
  );

  function checkWidthAndShowFilters() {
    if (window.innerWidth >= 250) {
      filtersContainer.style.display = "flex";
    } else {
      filtersContainer.style.display = "none";
    }
  }

  checkWidthAndShowFilters();

  window.addEventListener("resize", checkWidthAndShowFilters);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      if (filter === "all") {
        buttons.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
        skills.forEach((skill) => {
          skill.classList.remove("hidden");
        });
        return;
      }

      const isMainFilter = mainFilters.contains(button);
      const isCategoryFilter = categoryFilters.contains(button);
      const isCurrentlyActive = button.classList.contains("active");

      if (isCurrentlyActive) {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      } else {
        if (isMainFilter) {
          mainFilters.querySelectorAll("button").forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-pressed", "false");
          });
        } else if (isCategoryFilter) {
          categoryFilters.querySelectorAll("button").forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-pressed", "false");
          });
        }

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
      }

      applyFilters();
    });
  });

  function applyFilters() {
    const activeMainFilter = mainFilters.querySelector("button.active");
    const activeCategoryFilter = categoryFilters.querySelector("button.active");

    skills.forEach((skill) => {
      let shouldShow = true;

      if (activeMainFilter) {
        const mainFilter = activeMainFilter.dataset.filter;
        if (mainFilter === "taught" && skill.dataset.taught !== "true") {
          shouldShow = false;
        } else if (mainFilter === "future" && skill.dataset.future !== "true") {
          shouldShow = false;
        } else if (
          mainFilter === "collaborated" &&
          skill.dataset.collaborated !== "true"
        ) {
          shouldShow = false;
        }
      }

      if (activeCategoryFilter && shouldShow) {
        const categoryFilter = activeCategoryFilter.dataset.filter;
        if (skill.dataset.category !== categoryFilter) {
          shouldShow = false;
        }
      }

      if (shouldShow) {
        skill.classList.remove("hidden");
      } else {
        skill.classList.add("hidden");
      }
    });
  }
}

filterButtons();
filterButtons(true);
