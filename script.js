const mainFilters = Array.from(document.querySelectorAll(".filter.main"));
// const categoryFilters = Array.from(document.querySelectorAll(".filter"));

const technicalCategoryFilters = Array.from(
  Array.from(document.querySelectorAll(".filter.technical"))
);
const processCategoryFilters = Array.from(
  document.querySelectorAll(".filter.process")
);
const filtersContainer = document.querySelectorAll(".filters-container");
const technicalSkillsFilterbuttons = document.querySelectorAll(
  ".technical-skills-filter"
);
const processSkillsFilterButtons = document.querySelectorAll(
  ".process-skills-filter"
);
const buttons = document.querySelectorAll("button");
const skills = document.querySelectorAll(".skill");

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

function buttonListener() {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const isClearFiltersButton =
        button === document.querySelector(".clear-filters");

      if (isClearFiltersButton) {
        clearFilters();
        return;
      }

      const isMainFilterButton = mainFilters.includes(button);

      const isProcessCategoryFilterButton =
        processCategoryFilters.includes(button);
      const isTechnicalCategoryFilter =
        technicalCategoryFilters.includes(button);

      const isCurrentlyActive = button.classList.contains("active");

      if (isCurrentlyActive) {
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      } else {
        if (isMainFilterButton) {
          mainFilters.forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-pressed", "false");
          });
        } else if (isTechnicalCategoryFilter || isProcessCategoryFilterButton) {
          technicalCategoryFilters.forEach((filter) => {
            filter.classList.remove("active");
            filter.setAttribute("aria-pressed", "false");
          });
          processCategoryFilters.forEach((filter) => {
            filter.classList.remove("active");
            filter.setAttribute("aria-pressed", "false");
          });
        }
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
      }
      applyFilters();
    });
  });
}

function applyFilters() {
  const activeMainFilter = mainFilters.find((filter) =>
    filter.classList.contains("active")
  )?.dataset.filter;

  const activeCategoryFilter =
    processCategoryFilters.find((filter) => filter.classList.contains("active"))
      ?.dataset.filter ||
    technicalCategoryFilters.find((filter) =>
      filter.classList.contains("active")
    )?.dataset.filter;

  skills.forEach((skill) => {
    let shouldShow = true;

    if (!!activeMainFilter) {
      if (
        activeMainFilter === "mentored" &&
        skill.dataset.mentored !== "true"
      ) {
        shouldShow = false;
      } else if (
        activeMainFilter === "future" &&
        skill.dataset.future !== "true"
      ) {
        shouldShow = false;
      } else if (
        activeMainFilter === "collaborated" &&
        skill.dataset.collaborated !== "true"
      ) {
        shouldShow = false;
      }
    }

    if (!!activeCategoryFilter && shouldShow) {
      if (skill.dataset.category !== activeCategoryFilter) {
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

function clearFilters() {
  buttons.forEach((b) => {
    b.classList.remove("active");
    b.setAttribute("aria-pressed", "false");
  });
  skills.forEach((skill) => {
    skill.classList.remove("hidden");
  });
  return;
}

buttonListener();
