# Campus Life Super App

## Project Description

Campus Life Super App is a student focused website that is designed to help college students find campus events, dining options, and study spaces. The website has four connected pages Home, Events, Dining, and Studying.

The purpose of this project is to create an easy to use website that organizes useful campus information in one place. Students can search for events, filter dining options by meal type, and find study spaces based on their preferences.

## Technologies Used

- HTML5 for page structure and semantic elements.
- CSS3 for custom styling and responsive layouts.
- Bootstrap 5.3.8 for responsive components and page layouts.
- JavaScript for search features, filtering, buttons, and API requests.
- JSONPlaceholder API for sample announcement data.
- Git and GitHub for version control and project hosting.
- GitHub Pages for website deployment.

## Features

### Home Page
- Introduces the Campus Life Super App.
- Provides navigation to the other pages.
- Displays sample announcement data retrieved from JSONPlaceholder.

### Events Page
- Displays sample campus events.
- Allows users to search events by keyword.
- Filters events by category.
- Updates the displayed results when the category changes.
- Shows the number of matching events.

### Dining Page
- Displays sample dining options.
- Allows users to search by keyword.
- Filters dining options by meal type.
- Updates results when users type or change the selected filter.
- Displays the number of matching options or a message when no results are found.

### Studying Page
- Displays sample study locations.
- Allows users to search by keyword.
- Filters study spaces by type.
- Updates results when users type or change the selected filter.
- Displays the number of matching spaces or a message when no results are found.

### Responsive Design and Accessibility
- Uses Bootstrap and custom CSS to support different screen sizes.
- Includes navigation links between the four pages.
- Uses semantic HTML elements and form labels.
- Uses descriptive image alternative text where appropriate.

## Project Structure

Campus_Life_Super_App/
├── index.html
├── events.html
├── dining.html
├── studying.html
├── README.md
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    └── campus-logo.png

## How to Run Locally

1. Download or clone the GitHub repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` in a browser, or use the Live Server extension.
4. Navigate between the pages and test the search and filtering features.

No build tools are required.

## Deployment

The project is hosted using GitHub Pages.

To deploy the project:

1. Push the latest changes to the `main` branch.
2. Open the repository on GitHub.
3. Navigate to Settings and then Pages.
4. Under Build and deployment, select Deploy from a branch.
5. Select the `main` branch and the root folder (`/`).
6. Save the settings and open the published website.

The deployed website is available at:

https://mcarroll23-source.github.io/Campus_Life_Super_App/

The source code is available at:

https://github.com/mcarroll23-source/Campus_Life_Super_App

## Limitations and Future Improvements

The event, dining, and study information currently consists of sample content rather than verified campus information. JSONPlaceholder supplies demonstration announcement data and is not a real campus announcement service.
Improvements in the future could include connecting to a verified campus events API, adding real dining menus and operating hours, providing map links for campus locations, and expanding accessibility testing.

Other improvements could include more detailed event information, improved search options, and further testing across desktop, tablet, and mobile devices.