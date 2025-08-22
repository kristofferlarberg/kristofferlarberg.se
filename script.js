function createFilterButtons() {
  const filters = document.querySelector(".filters");
  const buttons = document.querySelectorAll("button");
  const skills = document.querySelectorAll(".skill");

  filters.style.display = "block";

  // Add click handlers
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      const filter = button.dataset.filter;

      skills.forEach((skill) => {
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
        } else {
          skill.classList.add("hidden");
        }
      });
    });
  });
}

createFilterButtons();
