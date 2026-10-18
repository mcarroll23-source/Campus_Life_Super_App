/* This code starts the website features after the page content loads. */
document.addEventListener("DOMContentLoaded", () => {
  loadAnnouncement();
  setupEventSearch();
  setupDiningSearch();
  setupStudySearch();
  setupActionButtons();
});

/* This code loads sample announcement data from JSONPlaceholder. */
async function loadAnnouncement() {
  const box = document.querySelector("#announcement-content");

  if (!box) {
    return;
  }

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    box.textContent = data.title;
  } catch (error) {
    box.textContent =
      "Sample announcement unavailable. A real campus announcement feed can be connected later.";

    console.error(error);
  }
}

/* This code lets users search events and filter them by category. */
function setupEventSearch() {
  const form = document.querySelector("#event-search-form");

  if (!form) {
    return;
  }

  const input = document.querySelector("#event-search");
  const category = document.querySelector("#event-category");
  const status = document.querySelector("#event-status");
  const clearButton = document.querySelector("#clear-event-search");

  /* This code displays only events that match the search and category. */
  function filterEvents() {
    let count = 0;

    document.querySelectorAll(".event-item").forEach((card) => {
      const searchMatches = card.textContent
        .toLowerCase()
        .includes(input.value.toLowerCase().trim());

      const categoryMatches =
        category.value === "all" ||
        card.dataset.category === category.value;

      const showCard = searchMatches && categoryMatches;

      card.classList.toggle("d-none", !showCard);

      if (showCard) {
        count++;
      }
    });

    if (status) {
      status.textContent =
        `Showing ${count} sample event(s); these are not live campus listings.`;
    }
  }

  /* This code runs the event filter when the form is submitted. */
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    filterEvents();
  });

  /* This code updates the event list when the category changes. */
  category.addEventListener("change", filterEvents);

  /* This code resets the event search and shows all categories. */
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      input.value = "";
      category.value = "all";
      filterEvents();
    });
  }
}

/* This code lets users search dining options and filter by meal type. */
function setupDiningSearch() {
  const form = document.querySelector("#dining-search-form");

  if (!form) {
    return;
  }

  const input = document.querySelector("#dining-search");
  const mealType = document.querySelector("#meal-type");

  /* This code displays dining options that match the search and meal type. */
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = input.value.toLowerCase().trim();
    const selectedMeal = mealType.value;

    document.querySelectorAll(".dining-item").forEach((card) => {
      const textMatches = card.textContent
        .toLowerCase()
        .includes(searchTerm);

      const mealMatches =
        selectedMeal === "all" ||
        card.dataset.meals.split(" ").includes(selectedMeal);

      card.classList.toggle(
        "d-none",
        !(textMatches && mealMatches)
      );
    });
  });
}

/* This code lets users search study spaces and filter by space type. */
function setupStudySearch() {
  const form = document.querySelector("#study-search-form");

  if (!form) {
    return;
  }

  const input = document.querySelector("#study-search");
  const studyType = document.querySelector("#study-type");

  /* This code displays study spaces that match the search and selected type. */
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = input.value.toLowerCase().trim();
    const selectedType = studyType.value;

    document.querySelectorAll(".study-item").forEach((card) => {
      const textMatches = card.textContent
        .toLowerCase()
        .includes(searchTerm);

      const typeMatches =
        selectedType === "all" ||
        card.dataset.type === selectedType;

      card.classList.toggle(
        "d-none",
        !(textMatches && typeMatches)
      );
    });
  });
}

/* This code sets up buttons for event details, menus, and study locations. */
function setupActionButtons() {
  /* This code displays a message when a sample event button is clicked. */
  document.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", () => {
      alert(
        `${button.dataset.title}: sample event details. Add real dates and locations later.`
      );
    });
  });

  /* This code displays a message when a sample dining menu button is clicked. */
  document.querySelectorAll(".menu-button").forEach((button) => {
    button.addEventListener("click", () => {
      alert(
        `${button.dataset.title}: menu information is a placeholder for now.`
      );
    });
  });

  /* This code displays a message when a study location button is clicked. */
  document.querySelectorAll(".location-button").forEach((button) => {
    button.addEventListener("click", () => {
      alert(
        `${button.dataset.title}: add the actual building location or map link later.`
      );
    });
  });
}
