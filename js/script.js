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

  box.textContent = "Loading sample announcement...";

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    if (!response.ok) {
      throw new Error("Announcement request failed");
    }

    const data = await response.json();

    if (!data.title) {
      throw new Error("Announcement title is missing");
    }

    box.textContent = data.title;
  } catch (error) {
    box.textContent =
      "Sample announcement could not be loaded. Please try again later.";

    console.error("Announcement loading error:", error);
  }
}

/* This code handles common search and filtering features for campus pages. */
function setupCardSearch(
  formSelector,
  inputSelector,
  filterSelector,
  cardSelector,
  dataAttribute,
  itemName,
  filterMatches,
  clearButtonSelector = null,
  extraMessage = "",
  statusSelector = null
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

  const clearButton = clearButtonSelector
    ? document.querySelector(clearButtonSelector)
    : null;

  let status = statusSelector
    ? document.querySelector(statusSelector)
    : null;

  /* This code creates a status message if the page does not already have one. */
  if (!status) {
    status = document.createElement("p");
    status.classList.add("text-muted", "mt-2");
    status.setAttribute("aria-live", "polite");
    status.setAttribute("role", "status");
    form.insertAdjacentElement("afterend", status);
  }

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
      status.textContent = `${count} ${itemName} found.`;
    }

    /* This code adds an optional note about sample content. */
    if (extraMessage) {
      status.textContent += ` ${extraMessage}`;
    }
  }

  /* This code updates the results when the search form is submitted. */
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    filterCards();
  });

  /* This code updates results when users type or change a filter. */
  input.addEventListener("input", filterCards);
  filter.addEventListener("change", filterCards);

  /* This code clears the search and resets the selected filter. */
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      input.value = "";
      filter.value = "all";
      filterCards();
    });
  }

  /* This code displays all matching items when the page loads. */
  filterCards();
}

/* This code lets users search events and filter them by category. */
function setupEventSearch() {
  setupCardSearch(
    "#event-search-form",
    "#event-search",
    "#event-category",
    ".event-item",
    "category",
    "events",
    (category, selectedCategory) =>
      selectedCategory === "all" ||
      category === selectedCategory,
    "#clear-event-search",
    "These are sample events, not live campus listings.",
    "#event-status"
  );
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
