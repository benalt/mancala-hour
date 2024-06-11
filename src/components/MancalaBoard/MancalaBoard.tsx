import Store from "./Store"
import Pocket from "./Pocket"
import './MancalaBoard.css'
import { useState } from "react";

export default function MancalaBoard(){

  const [gameState, setGameState] = useState({
    pockets : [ 
      4, 4, 4, 4, 4, 4,
      4, 4, 4, 4, 4, 4,
    ], 
    stores: [0, 0],
    activePlayer: 0,
    gameOver: false,
  });

  function selectPocket(pocketIdx:number):void{
    // player can only select a pocket on thier side
    const playerCanSelectPocket = gameState.activePlayer === 0 ? pocketIdx < 6 : pocketIdx > 5;
    if (gameState.gameOver || gameState.pockets[pocketIdx] === 0 || !playerCanSelectPocket)  {
      return
    }

    const newGameState = structuredClone(gameState);

    let numberOfStones = newGameState.pockets[pocketIdx];
    console.log(`distributing ${numberOfStones}`)
    let shouldSwitchActivePlayer = true;

    // take all the stones from the selcected pocket
    newGameState.pockets[pocketIdx] = 0;
    
    while(numberOfStones > 0) {
      // should we add it to the active player's store?
      if ( (pocketIdx === 0 && newGameState.activePlayer === 0) || 
            (pocketIdx === 6 && newGameState.activePlayer === 1)) {
          console.log('adding to store')
          numberOfStones -= 1;
          newGameState.stores[newGameState.activePlayer] +=1;

          // we landed on the AP's store, so they get to go again
          if (numberOfStones === 0) {
            shouldSwitchActivePlayer = false;
            continue;
          }
      } 
      
      pocketIdx = pocketIdx === 0 ? 11 : pocketIdx - 1;
      numberOfStones -= 1;
      newGameState.pockets[pocketIdx] += 1;
      
      // if we added to an empty pocket take from the opposite pocket
      if (numberOfStones === 0 && newGameState.pockets[pocketIdx] === 1) {
        const oppositeIdx =  Math.abs(pocketIdx - 11);
        const newStore = 1 + newGameState.stores[newGameState.activePlayer] + newGameState.pockets[oppositeIdx];
        newGameState.stores[newGameState.activePlayer] = newStore;    
        newGameState.pockets[pocketIdx] = 0;
        newGameState.pockets[oppositeIdx] = 0;
      }
    }
    
    // end the game if either side is all 0 
    const isGameOver = (
      newGameState.pockets.slice(0,6).every( val => val === 0) || 
      newGameState.pockets.slice(6).every( val => val === 0));

    if (isGameOver) {
      newGameState.gameOver = true;
      // add all pocketedStones to the proper store
      for (let i = 0; i<newGameState.pockets.length; i++) {
        newGameState.stores[ (i < 6) ? 0 : 1 ] += newGameState.pockets[i];
        newGameState.pockets[i] = 0;
      }
    } else if (shouldSwitchActivePlayer) {
      newGameState.activePlayer = newGameState.activePlayer === 0 ? 1 : 0;
    }
    setGameState( newGameState );
  }

  return (<>
  
    <h1>Player {gameState.activePlayer + 1 }'s Turn ({gameState.activePlayer === 0 ? "red" : "blue"}) { gameState.gameOver ? "Game Over": ""}</h1>
    
    <div id="mancala-board">

      <Pocket stonesCount={gameState.pockets[0]} onPocketSelect={() => selectPocket(0)} />
      <Pocket stonesCount={gameState.pockets[1]} onPocketSelect={() => selectPocket(1)} />
      <Pocket stonesCount={gameState.pockets[2]} onPocketSelect={() => selectPocket(2)} />
      <Pocket stonesCount={gameState.pockets[3]} onPocketSelect={() => selectPocket(3)} />
      <Pocket stonesCount={gameState.pockets[4]} onPocketSelect={() => selectPocket(4)} />
      <Pocket stonesCount={gameState.pockets[5]} onPocketSelect={() => selectPocket(5)} />
      <Store stonesCount={gameState.stores[0]} />

      <Pocket stonesCount={gameState.pockets[6]} onPocketSelect={() => selectPocket(6)} />
      <Pocket stonesCount={gameState.pockets[7]} onPocketSelect={() => selectPocket(7)} />
      <Pocket stonesCount={gameState.pockets[8]} onPocketSelect={() => selectPocket(8)} />
      <Pocket stonesCount={gameState.pockets[9]} onPocketSelect={() => selectPocket(9)} />
      <Pocket stonesCount={gameState.pockets[10]} onPocketSelect={() => selectPocket(10)} />
      <Pocket stonesCount={gameState.pockets[11]} onPocketSelect={() => selectPocket(11)} />
      <Store stonesCount={gameState.stores[1]} />
      
    </div>   
    <p className="subtitle">
      Join us for mancala hour.
    </p>
    </>)
}