# mancala-hour
Mancala UI written in React.js, as a prototype.



# first run

This app uses Vite as a development server 

```
npm install
npm run dev
```

The app will be running at [http://localhost:5173/](http://localhost:5173/)

# Playing Mancala 

**Set up**
Place four stones or seeds in each of the six pockets (also called pits) on your side of the board, excluding the Mancala (also called a store) on your right. The color, shape, and material used as seeds has no specific signifigance to game play or scoring.

**Take a turn**
To take a turn, a player chooses a non-empty pocket from their side of the board and picks up all the stones in it. Then, starting with the next pocket, the player drops one stone in each pocket in a counterclockwise direction, including the Mancala, but not their opponent's Mancala. This is called "sowing" the seeds. If a player reaches the end of a row, they continue sowing in the other row in a counterclockwise direction. If while sowing seeds, a player places thier last seed in their own Mancala, they get to go again. 

**Capture stones**
If a player places the last stone of their turn into an empty pocket on their side, they get to move that one stone to their Mancala, and also capture all the stones in the directly opposite pocket on their opponent's side and add them to their Mancala.

**End of game**
The game ends when all six spaces on one side of the board are empty. The player with the most stones in their Mancala wins. If a player still has stones on their side of the board when the game ends, they capture all of those stones and add them to thier store.
