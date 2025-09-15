const mainFilters = Array.from(document.querySelectorAll(".filter.main"));
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

const technicalSkills = document.querySelectorAll(".skill.technical");
const processSkills = document.querySelectorAll(".skill.process");

const allSkills = document.querySelectorAll(".skill");

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
      const isMainFilter = mainFilters.some((filter) =>
        filter.contains(button)
      );
      const isProcessCategoryFilter = processCategoryFilters.some((filter) =>
        filter.contains(button)
      );
      const isTechnicalCategoryFilter = technicalCategoryFilters.some(
        (filter) => filter.contains(button)
      );

      if (isClearFiltersButton) {
        clearFilters();
      } else if (isMainFilter) {
        mainFilters.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-pressed", "false");
        });
      } else if (isTechnicalCategoryFilter) {
        technicalCategoryFilters.forEach((filter) => {
          filter.querySelectorAll("button").forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-pressed", "false");
          });
        });
      } else if (isProcessCategoryFilter) {
        processCategoryFilters.forEach((filter) => {
          filter.querySelectorAll("button").forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-pressed", "false");
          });
        });
      }
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      applyMainFilter();
      applyCategoryFilter(technicalSkills);
      applyCategoryFilter(processSkills);
    });
  });
}

function applyMainFilter() {
  const activeMainFilter = mainFilters.find((filter) =>
    filter.classList.contains("active")
  )?.dataset.filter;

  console.log(activeMainFilter);

  if (!activeMainFilter) {
    return;
  }

  allSkills.forEach((skill) => {
    if (activeMainFilter === "mentored" && skill.dataset.mentored !== "true") {
      skill.classList.add("hidden");
    } else if (
      activeMainFilter === "future" &&
      skill.dataset.future !== "true"
    ) {
      skill.classList.add("hidden");
    } else if (
      activeMainFilter === "collaborated" &&
      skill.dataset.collaborated !== "true"
    ) {
      skill.classList.add("hidden");
    } else {
      skill.classList.remove("hidden");
    }
  });

  return;
}

function applyCategoryFilter(skills) {
  const categoryFilters = Array.from(
    document.querySelectorAll(".filter")
  ).filter(
    (filter) =>
      filter.classList.contains("technical") ||
      filter.classList.contains("process")
  );

  const activeCategoryFilter = categoryFilters.find((filter) =>
    filter.classList.contains("active")
  )?.dataset.filter;

  skills.forEach((skill) => {
    if (skill.dataset.category !== activeCategoryFilter) {
      skill.classList.add("hidden");
    } else {
      skill.classList.remove("hidden");
    }
  });

  return;
}

function clearFilters() {
  buttons.forEach((b) => {
    b.classList.remove("active");
    b.setAttribute("aria-pressed", "false");
  });
  allSkills.forEach((skill) => {
    skill.classList.remove("hidden");
  });
  return;
}

buttonListener();
