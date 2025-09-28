const filterButtonsContainer = document.querySelectorAll(".filters-container");

function checkWidthAndShowFilters() {
  if (window.innerWidth >= 250) {
    filterButtonsContainer.forEach((element) => {
      element.style.display = "flex";
    });
  } else {
    filterButtonsContainer.forEach((element) => {
      element.style.display = "none";
    });
  }
}

checkWidthAndShowFilters();
// todo: set random checkboxes to checked
hideAllSkills();

window.addEventListener("resize", checkWidthAndShowFilters);

function filterListener() {
  const filtersContainer = document.querySelector(".filters-container");
  const filters = Array.from(
    document.querySelectorAll("input[type='checkbox']")
  );

  filtersContainer.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      const activeSkillCategoryFilters = filters.some(
        (filter) =>
          (filter.checked === true && filter.name === "process-category") ||
          (filter.checked === true && filter.name === "technical-category")
      );

      const contextualCategoryFilters = filters.filter(
        (filter) => filter.name === "contextual-category"
      );

      const hiddenContextualCategoryFilters = contextualCategoryFilters.some(
        (filter) => filter.classList.contains("hidden")
      );

      const contextualCategoryFiltersContainer = document.querySelector(
        "#contextual-filters"
      );

      if (!!activeSkillCategoryFilters) {
        // toggle visibility of contextual categories if skill categories are selected
        contextualCategoryFiltersContainer.classList.remove("hidden");
      } else if (
        !activeSkillCategoryFilters &&
        !hiddenContextualCategoryFilters
      ) {
        contextualCategoryFiltersContainer.classList.add("hidden");
      }

      applyFilters();
    }
  });

  const inactiveTechnicalCategoryFilters = filters.filter(
    (filter) => filter.checked !== true && filter.name === "technical-category"
  );
  const inactiveProcessCategoryFilters = filters.filter(
    (filter) => filter.checked !== true && filter.name === "process-category"
  );

  filtersContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("clear-filters")) {
      clearFilters();
    } else if (e.target.classList.contains("all-filters")) {
      if (e.target.classList.contains("technical")) {
        selectAllFilters(inactiveTechnicalCategoryFilters);
      }
      if (e.target.classList.contains("process")) {
        selectAllFilters(inactiveProcessCategoryFilters);
      }
    }
    applyFilters();
  });
}

function applyFilters() {
  const skills = Array.from(document.querySelectorAll(".skill"));
  const filters = Array.from(
    document.querySelectorAll("input[type='checkbox']")
  );

  const activeSkillCategoryFilters = filters.filter(
    (filter) =>
      (filter.checked === true && filter.name === "process-category") ||
      (filter.checked === true && filter.name === "technical-category")
  );

  const activeContextualCategoryFilters = filters.filter(
    (filter) => filter.checked === true && filter.name === "contextual-category"
  );

  skills.forEach((skill) => {
    let shouldShow = false;

    if (activeSkillCategoryFilters.length > 0) {
      const matchesCategory = activeSkillCategoryFilters.some(
        (filter) => filter.value === skill.dataset.category
      );
      shouldShow = matchesCategory;
    }

    if (shouldShow && activeContextualCategoryFilters.length > 0) {
      const matchesContextualCategoryFilters =
        activeContextualCategoryFilters.every((filter) => {
          return (
            (filter.value === "future" && skill.dataset.future === "true") ||
            (filter.value === "collaborated" &&
              skill.dataset.collaborated === "true")
          );
        });
      shouldShow = matchesContextualCategoryFilters;
    }

    if (shouldShow) {
      skill.classList.remove("hidden");
    } else {
      skill.classList.add("hidden");
    }
  });
}

function clearFilters() {
  const filters = Array.from(
    document.querySelectorAll("input[type='checkbox']")
  );

  filters.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event("change", { bubbles: false }));
  });
}

function selectAllFilters(filters) {
  filters.forEach((checkbox) => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));
  });
}

function hideAllSkills() {
  const skills = document.querySelectorAll(".skill");
  skills.forEach((skill) => {
    skill.classList.add("hidden");
  });
}

filterListener();
