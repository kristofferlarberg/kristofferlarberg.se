const mainFilters = Array.from(
  Array.from(document.querySelectorAll(".filter.main"))
);
const technicalCategoryFilters = Array.from(
  Array.from(document.querySelectorAll(".filter.technical"))
);
const processCategoryFilters = Array.from(
  document.querySelectorAll(".filter.process")
);

const contextFilters = Array.from(document.querySelectorAll(".filter.context"));
const filterButtonsContainer = document.querySelectorAll(".filters-container");
const buttons = document.querySelectorAll("button");

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

  console.log(filtersContainer);
  console.log(filters);

  filtersContainer.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      const filterType = e.target.name;
      const value = e.target.value;
      const isChecked = e.target.checked;

      const activeMainCategoryFilter =
        filterType === "main-category" && isChecked ? value : null;

      if (!!activeMainCategoryFilter) {
        // todo: Add logic to hide sub-category filters options when main filter is clicked
        // hideCategoryFilters(button, true);

        // Clear sub-category filter based on main filter
        filters.forEach((checkbox) => {
          if (
            activeMainCategoryFilter === "technical" &&
            checkbox.classList.contains("technical") === false
          ) {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event("change", { bubbles: false }));
          } else if (
            activeMainCategoryFilter === "process" &&
            checkbox.classList.contains("process") === false
          ) {
            checkbox.checked = false;
            checkbox.dispatchEvent(new Event("change", { bubbles: false }));
          }
          return;
        });
      }
      applyFilters();
    }
  });

  filtersContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("clear-filters")) {
      clearFilters();
    }
    applyFilters();
  });
}

function applyFilters() {
  const skills = Array.from(document.querySelectorAll(".skill"));
  const filters = Array.from(
    document.querySelectorAll("input[type='checkbox']")
  );

  const activeProcessCategoryFilters = filters.filter(
    (filter) => filter.checked === true && filter.name === "process-category"
  );

  const activeTechnicalCategoryFilters = filters.filter(
    (filter) => filter.checked === true && filter.name === "technical-category"
  );

  const activeSkillCategoryFilters = filters.filter(
    (filter) =>
      (filter.checked === true && filter.name === "process-category") ||
      (filter.checked === true && filter.name === "technical-category")
  );

  const activeContextualCategoryFilters = filters.filter(
    (filter) => filter.checked === true && filter.name === "contextual-category"
  );

  console.log(activeSkillCategoryFilters);

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

function hideCategoryFilters(button, hideFilters) {
  if (hideFilters) {
    if (button.dataset.filter === "technical") {
      processCategoryFilters.forEach((filter) => {
        filter.classList.add("hidden");
      });
      // Make sure technical filters are visible
      technicalCategoryFilters.forEach((filter) => {
        filter.classList.remove("hidden");
      });
    } else if (button.dataset.filter === "process") {
      technicalCategoryFilters.forEach((filter) => {
        filter.classList.add("hidden");
      });
      // Make sure process filters are visible
      processCategoryFilters.forEach((filter) => {
        filter.classList.remove("hidden");
      });
    }
  } else {
    // Show all category filters when no main filter is active
    technicalCategoryFilters.forEach((filter) => {
      filter.classList.remove("hidden");
    });
    processCategoryFilters.forEach((filter) => {
      filter.classList.remove("hidden");
    });
  }
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

function hideAllSkills() {
  const skills = document.querySelectorAll(".skill");
  skills.forEach((skill) => {
    skill.classList.add("hidden");
  });
}

filterListener();
