# painikepeli

## About
- This is an **preliminary assignment / exercise project** for Vincit (the assignment can be found [here](https://koodarijahti.fi/Ennakkotehtava_2020_Painikepeli.pdf))
- The project is a multiplayer browser game on a single page website
- The general idea of the game is to smash a button for points
- The game is live at https://painikebli.herokuapp.com/
  - **Note:** Heroku sets the server to sleep after 30 minutes of inactivity
    - Every time this happens the player.json is reseted so the players' scores reset aswell
    - Loading of the page can take for a while if the server was asleep

## Setting up
- Download and install [Git](https://git-scm.com/downloads)
- Download and install [Node.js](https://nodejs.org/en/download/)
- Open the folder where you want the game with terminal and use the command `git clone https://github.com/Brutukseni/painikepeli.git` to clone the project
- Navigate to the folder **.../painikepeli/backend** with terminal and then use the command `npm install` to install backend's dependencies
- Navigate to the folder **.../painikepeli/frontend** with terminal and then use the command `npm install` to install frontend's dependencies and then use the command `npm run build` to build the frontend

## Running
- Navigate to the folder **.../painikepeli/backend** with terminal and then use the command `node index.js` or `npm start` to start the server
- Wait until the game opens in your default browser or open it manually by going to the url http://localhost:5000/

## Features
- **Username**
  - Upon entering the website for the first time the player is asked to enter an username
  - The username can only be between 1-8 characters long
  - The player can play the game only after submitting an allowed username
- **Points**
  - In the beginning the player has 20 points
  - Every click of the **PLAY** button costs the player 1 point
  - The player can win points depending on the total click count between all players that is not visible to them (but the amount of remaining clicks to the next win is visible)
    - Every 10th click -> 5 points
    - Every 100th click -> 40 points
    - Every 500th click -> 250 points
  - The player is notified if he won points
  - If the player runs out of points he can then click the **START OVER** button to gain 20 points
- **Highscores**
  - The top 5 players' names and points are visible for all of the other players
  
## Notes
- This was my first time using React
  - I decided to not use Redux and rather focus on learning the basics of React
  - The file structure / dividing of components could most likely be better
- The players' points, name and id are saved to a JSON file, which is kind of a quick and dirty way of saving things compared to other databases
