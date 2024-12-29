async function fetchDataAndCreateLists() {
  try {
    const response = await fetch("./data.json");

    if (!response.ok)
      throw new Error(`Failed to load data: ${response.status}`);

    const data = await response.json();

    const categories = Object.keys(data);

    const placeholder = document.getElementById("skill-description");
    placeholder.remove();

    categories.forEach((category, i) => {
      const div = document.getElementById(category);

      if (i === 0) {
        div.classList.add("skills-one");
      }

      if (i === 1) {
        div.classList.add("skills-two");
      }

      if (i === 2) {
        div.classList.add("skills-three");
      }

      if (i === 3) {
        div.classList.add("skills-four");
      }

      const h3 = document.createElement("h3");
      h3.textContent = category;
      div.appendChild(h3);

      const ul = document.createElement("ul");
      div.appendChild(ul);

      if (!div) {
        console.error(`No <div> found with id '${category}'`);
        return;
      }

      if (!Array.isArray(data[category])) {
        console.error(`Data for '${category}' is missing or not an array`);
        return;
      }

      data[category].forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
    });
  } catch (error) {
    console.error("Error fetching or creating lists:", error);
  }
}

fetchDataAndCreateLists();
