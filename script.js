const mainFilters = document.querySelector(".main-filters");
const technicalCategoryFilters = Array.from(
  document.querySelectorAll(".technical-category-filters")
);
const processCategoryFilters = Array.from(
  document.querySelectorAll(".process-category-filters")
);
const filtersContainer = document.querySelectorAll(".filters-container");
const technicalSkillsFilterbuttons = document.querySelectorAll(
  ".technical-skills-filter"
);
const processSkillsFilterButtons = document.querySelectorAll(
  ".process-skills-filter"
);
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
function buttonListener(buttons) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      if (filter === "all-technical-skills") {
        clearFilters(technicalSkillsFilterbuttons, technicalSkills);
      } else if (filter === "all-process-skills") {
        clearFilters(processSkillsFilterButtons, processSkills);
      }

      const isMainFilter =
        button.classList.contains("technical-skills-filter") &&
        mainFilters.contains(button);

      const isProcessCategoryFilter = processCategoryFilters.some((filter) =>
        filter.contains(button)
      );
      const isTechnicalCategoryFilter = technicalCategoryFilters.some(
        (filter) => filter.contains(button)
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
      }

      applyFilters(
        button.classList.contains("technical-skills-filter")
          ? "technical"
          : "process"
      );
    });
  });
}

function applyFilters(skillsType) {
  if (skillsType === "process") {
    const activeCategoryFilter = processCategoryFilters
      .find((filter) => filter.querySelector("button.active"))
      ?.querySelector("button.active");

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
  } else if (skillsType === "technical") {
    const activeMainFilter = mainFilters.querySelector("button.active");

    const activeCategoryFilter = technicalCategoryFilters
      .find((filter) => filter.querySelector("button.active"))
      ?.querySelector("button.active");

    technicalSkills.forEach((skill) => {
      let shouldShow = true;

      if (skillsType === "technical" && activeMainFilter) {
        const mainFilter = activeMainFilter.dataset.filter;
        if (mainFilter === "mentored" && skill.dataset.mentored !== "true") {
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
  return;
}

function clearFilters(buttons, skills) {
  buttons.forEach((b) => {
    b.classList.remove("active");
    b.setAttribute("aria-pressed", "false");
  });
  skills.forEach((skill) => {
    skill.classList.remove("hidden");
  });
  return;
}

buttonListener(technicalSkillsFilterbuttons);
buttonListener(processSkillsFilterButtons);
