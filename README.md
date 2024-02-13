# Crewmate Companion

Crewmate Companion is a web application designed to help players stay organized while playing Among Us. It allows users to keep track of players and their status.

## Table of Contents

- [Installation](#installation)
  - [Forking the Repository](#forking-the-repository)
  - [Cloning the Repository](#cloning-the-repository)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Features](#features)

## Installation

### Forking the Repository

To contribute to this project or customize it for your own use, you can start by forking the repository. Follow these steps:

1. Go to the repository on GitHub: [Link to Repository](https://github.com/dineshkharah/among-us-crewmate-companion.git)
2. Click the "Fork" button in the top right corner of the page.
3. Wait for the forking process to complete.

### Cloning the Repository

Once you've forked the repository, you can clone it to your local machine. Open your terminal and execute the following command:

```bash
git clone https://github.com/yourusername/crewmate-companion.git
```

### Running the Application

1. Navigate to the project directory:

```bash
cd crewmate-companion
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

4. Open your web browser and go to http://localhost:3000 to view the application.

## Usage

- Upon opening the application, users can see the main interface which displays columns representing different aspects of the game.
- Input player names and associate them with colours.
- Users can drag and drop cards within and between columns to organize players and their status.
- Use the "New game" button to reset positions of players to the “Unknown” column while retaining player information.
- Use the "Reset game" button to reset positions of players to the “Unknown” column and clear player information.

## Tech Stack

- HTML: Markup language used for structuring web pages.
- CSS: Styling language used for styling HTML elements.
- React: JavaScript library for building user interfaces.
- React Beautiful DnD: React implementation of the drag and drop library for beautiful and accessible drag and drop interactions.

## Features

- Drag and drop players between different categories.
- Input player names and associate them with colours of their character.
- Organize players into categories such as " Unknown", "Dead", "Suspect", or "Innocent".
- Responsive Design.
- Local storage integration to save user input and state.
