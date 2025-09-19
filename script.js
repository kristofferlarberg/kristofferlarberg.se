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
const skills = document.querySelectorAll(".skill");

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

      const isContextFilterButton = contextFilters.includes(button);

      const isMainFilterButton = mainFilters.includes(button);

      const isProcessCategoryFilterButton =
        processCategoryFilters.includes(button);

      const isTechnicalCategoryFilterButton =
        technicalCategoryFilters.includes(button);

      const isCurrentlyActive = button.classList.contains("active");

      if (isCurrentlyActive) {
        if (isMainFilterButton) {
          hideCategoryFilters(button, false);
          // Clear any active category filters when main filter is clicked
          technicalCategoryFilters.forEach((filter) => {
            filter.classList.remove("active");
            filter.setAttribute("aria-pressed", "false");
          });
          processCategoryFilters.forEach((filter) => {
            filter.classList.remove("active");
            filter.setAttribute("aria-pressed", "false");
          });
        }
        button.classList.remove("active");
        button.setAttribute("aria-pressed", "false");
      } else {
        if (isMainFilterButton) {
          hideCategoryFilters(button, true);
          mainFilters.forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-pressed", "false");
          });
          // Clear any active category filters when main filter is clicked
          technicalCategoryFilters.forEach((filter) => {
            filter.classList.remove("active");
            filter.setAttribute("aria-pressed", "false");
          });
          processCategoryFilters.forEach((filter) => {
            filter.classList.remove("active");
            filter.setAttribute("aria-pressed", "false");
          });
        } else if (isContextFilterButton) {
          contextFilters.forEach((b) => {
            b.classList.remove("active");
            b.setAttribute("aria-pressed", "false");
          });
        } else if (
          isTechnicalCategoryFilterButton ||
          isProcessCategoryFilterButton
        ) {
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

  const activeContextFilter = contextFilters.find((filter) =>
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
        activeMainFilter === "technical" &&
        skill.classList.contains("technical") !== true
      ) {
        shouldShow = false;
      } else if (
        activeMainFilter === "process" &&
        skill.classList.contains("process") !== true
      ) {
        shouldShow = false;
      }
    }

    if (!!activeContextFilter) {
      if (
        activeContextFilter === "mentored" &&
        skill.dataset.mentored !== "true"
      ) {
        shouldShow = false;
      } else if (
        activeContextFilter === "future" &&
        skill.dataset.future !== "true"
      ) {
        shouldShow = false;
      } else if (
        activeContextFilter === "collaborated" &&
        skill.dataset.collaborated !== "true"
      ) {
        shouldShow = false;
      }
    }

    // Apply category filter if active and shouldShow hasn't been set to false
    if (!!activeCategoryFilter && shouldShow) {
      if (skill.dataset.category !== activeCategoryFilter) {
        shouldShow = false;
      }
    }

    // If the skill should be shown, remove the hidden class, otherwise add it
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
  buttons.forEach((b) => {
    b.classList.remove("active");
    b.setAttribute("aria-pressed", "false");
    b.classList.remove("hidden");
  });
  skills.forEach((skill) => {
    skill.classList.remove("hidden");
  });
  return;
}

buttonListener();
