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

/* This code handles common search and filtering features for dining and study pages. */
function setupCardSearch(
  formSelector,
  inputSelector,
  filterSelector,
  cardSelector,
  dataAttribute,
  itemName,
  filterMatches
) {
  const form = document.querySelector(formSelector);

  if (!form) {
    return;
  }

  const input = document.querySelector(inputSelector);
  const filter = document.querySelector(filterSelector);

  if (!input || !filter) {
    return;
  }

  const status = document.createElement("p");
  status.classList.add("text-muted", "mt-2");
  status.setAttribute("aria-live", "polite");
  form.insertAdjacentElement("afterend", status);

  /* This code displays items that match the search and selected filter. */
  function filterCards() {
    const searchTerm = input.value.toLowerCase().trim();
    const selectedFilter = filter.value;
    let count = 0;

    document.querySelectorAll(cardSelector).forEach((card) => {
      const textMatches = card.textContent
        .toLowerCase()
        .includes(searchTerm);

      const filterValue = card.dataset[dataAttribute] || "";
      const selectedMatches = filterMatches(
        filterValue,
        selectedFilter
      );

      const showCard = textMatches && selectedMatches;

      card.classList.toggle("d-none", !showCard);

      if (showCard) {
        count++;
      }
    });

    /* This code tells users how many items match their search. */
    if (count === 0) {
      status.textContent =
        `No ${itemName} found. Try changing your search or filters.`;
    } else {
      status.textContent =
        `${count} ${itemName} found.`;
    }
  }

  /* This code updates the results when the search form is submitted. */
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    filterCards();
  });

  /* This code updates the results when users type or change a filter. */
  input.addEventListener("input", filterCards);
  filter.addEventListener("change", filterCards);

  /* This code displays all items when the page first loads. */
  filterCards();
}

/* This code lets users search dining options and filter by meal type. */
function setupDiningSearch() {
  setupCardSearch(
    "#dining-search-form",
    "#dining-search",
    "#meal-type",
    ".dining-item",
    "meals",
    "dining options",
    (meals, selectedMeal) =>
      selectedMeal === "all" ||
      meals.split(" ").includes(selectedMeal)
  );
}

/* This code lets users search study spaces and filter by space type. */
function setupStudySearch() {
  setupCardSearch(
    "#study-search-form",
    "#study-search",
    "#study-type",
    ".study-item",
    "type",
    "study spaces",
    (type, selectedType) =>
      selectedType === "all" ||
      type === selectedType
  );
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
