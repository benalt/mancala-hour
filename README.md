# mancala-hour
Mancala UI written in React.js, as a prototype.



# first run

This app uses Vite as a development server 

```
npm install
npm run dev
```

# Playing Mancala 

**Set up**
Place four stones or seeds in each of the six pits on your side of the board, excluding the Mancala ( also called a store) on your right. The color, shape, and material used as seeds has no specific signifigance to game play or scoring.

**Take a turn**
To take a turn, a player chooses a non-empty pit from their side of the board and picks up all the stones in it. Then, starting with the next pit, the player drops one stone in each pit in a counterclockwise direction, including the Mancala, but not their opponent's Mancala. This is called "sowing" the seeds. If a player reaches the end of a row, they continue sowing in the other row in a counterclockwise direction. If while sowing seeds, a player places thier last seed in their own Mancala, they get to go again. 

**Capture stones**
If a player places the last stone of their turn into an empty pit on their side, they capture all the stones in the directly opposite pit on their opponent's side. The player then takes the captured stones and the capturing stone and places them in their Mancala. 

**End of game**
The game ends when all six spaces on one side of the board are empty. The player with the most stones in their Mancala wins. If a player still has stones on their side of the board when the game ends, they capture all of those stones and add them to thier store.
