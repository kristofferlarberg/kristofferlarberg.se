const filterButtonsContainer = document.querySelectorAll(".filters-container");

function handleVisibility() {
  if (window.innerWidth <= 375) {
    const skills = document.querySelectorAll(".skill");
    let skillsContainer = document.querySelectorAll(".skills");
    const sortedSkills = Array.from(skills).sort(
      (a, b) =>
        parseFloat(b.style.getPropertyValue("--x")) +
        parseFloat(b.style.getPropertyValue("--y")) -
        (parseFloat(a.style.getPropertyValue("--x")) +
          parseFloat(a.style.getPropertyValue("--y")))
    );
    skillsContainer[0].replaceChildren(...sortedSkills);
  }
}

handleVisibility();
selectAllFilters();
applyFilters();

window.addEventListener("resize", handleVisibility);
document.querySelector(".filters-container").style.display = "flex";

function filterListener() {
  const filtersContainer = document.querySelector(".filters-container");

  filtersContainer.addEventListener("change", (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      applyFilters();
    }
  });

  filtersContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("clear-filters")) {
      clearFilters();
    } else if (e.target.classList.contains("all-filters")) {
      selectAllFilters();
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
            (filter.value === "interesting" &&
              skill.dataset.interesting === "true") ||
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

  toggleContextualCategoryFilters();
}

function clearFilters() {
  const filters = Array.from(
    document.querySelectorAll("input[type='checkbox']")
  );

  filters.forEach((checkbox) => {
    checkbox.checked = false;
    checkbox.dispatchEvent(new Event("change", { bubbles: false }));
  });

  toggleContextualCategoryFilters();
}

function selectAllFilters() {
  const filters = Array.from(
    document.querySelectorAll("input[type='checkbox']")
  );

  filters.forEach((checkbox) => {
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event("change", { bubbles: true }));
  });

  toggleContextualCategoryFilters();
}

function toggleContextualCategoryFilters() {
  const filters = Array.from(
    document.querySelectorAll("input[type='checkbox']")
  );

  const activeSkillCategoryFilters = filters.some(
    (filter) =>
      (filter.checked === true && filter.name === "process-category") ||
      (filter.checked === true && filter.name === "technical-category")
  );

  const contextualCategoryFilters = filters.filter(
    (filter) => filter.name === "contextual-category"
  );

  if (!!activeSkillCategoryFilters) {
    // toggle visibility of contextual categories if skill categories are selected
    contextualCategoryFilters.forEach((filter) => {
      filter.disabled = false;
    });
  } else if (!activeSkillCategoryFilters) {
    contextualCategoryFilters.forEach((filter) => {
      filter.disabled = true;
    });
  }
}

filterListener();
