function filterButtons() {
  const mainFilters = document.querySelector(".main-filters");
  const categoryFilters = Array.from(
    document.querySelectorAll(".category-filters")
  );
  const filtersContainer = document.querySelectorAll(".filters-container");
  const buttons = document.querySelectorAll("button");
  const skills = document.querySelectorAll(".skill");
  const technicalSkills = document.querySelectorAll(".skill.technical");
  const processSkills = document.querySelectorAll(".skill.process");

  function checkWidthAndShowFilters() {
    if (window.innerWidth >= 250) {
      filtersContainer.forEach((element) => {
        element.style.display = "flex";
      });
    } else {
      filtersContainer.forEach((element) => {
        element.style.display = "none";
      });
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
      const isCategoryFilter = categoryFilters.some((filter) =>
        filter.contains(button)
      );
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
          categoryFilters.forEach((filter) => {
            filter.querySelectorAll("button").forEach((b) => {
              b.classList.remove("active");
              b.setAttribute("aria-pressed", "false");
            });
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
    const activeCategoryFilter = categoryFilters
      .find((filter) => filter.querySelector("button.active"))
      ?.querySelector("button.active");

    if (
      activeCategoryFilter &&
      (activeCategoryFilter.dataset.filter === "practices" ||
        activeCategoryFilter.dataset.filter === "process-tooling")
    ) {
      processSkills.forEach((skill) => {
        let shouldShow = true;

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
    } else {
      technicalSkills.forEach((skill) => {
        if (skill.classList.contains("technical")) {
          let shouldShow = true;

          if (activeMainFilter) {
            const mainFilter = activeMainFilter.dataset.filter;
            if (
              mainFilter === "mentored" &&
              skill.dataset.mentored !== "true"
            ) {
              shouldShow = false;
            } else if (
              mainFilter === "mentored-process" &&
              skill.dataset.mentoredProcess !== "true"
            ) {
              shouldShow = false;
            } else if (
              mainFilter === "mentored-process" &&
              skill.dataset.mentoredProcess !== "true"
            ) {
              shouldShow = false;
            } else if (
              mainFilter === "future" &&
              skill.dataset.future !== "true"
            ) {
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
        }
      });
    }
  }
}

filterButtons();
