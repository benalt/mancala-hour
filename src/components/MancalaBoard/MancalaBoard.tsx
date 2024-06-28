import Store from "./Store"
import Pocket from "./Pocket"
//import './MancalaBoard.css'
import { useState } from "react";

import mancalaBoardClasses from "./MancalaBoard.module.css"

type MancalaBoardParams = {
  onGameMessageLog(msg:string):void
}

type GameState = {
  pockets: Array<number>,
  stores: [number, number],
  activePlayer: 0 | 1,
  lastExplaination: string
}

const NEW_GAME:GameState = {
  pockets : [ 
    4, 4, 4, 4, 4, 4,
    4, 4, 4, 4, 4, 4,
  ], 
  stores: [0, 0],
  activePlayer: 0,
  lastExplaination: ''
};

function isGameOver(pockets:Array<number>):boolean {
  return (
    pockets.slice(0,6).every( val => val === 0) || 
    pockets.slice(6).every( val => val === 0))
}

function applyTurnGameState(gameState: GameState, pocketIdx:number): GameState {
  
    let numberOfSeeds = gameState.pockets[pocketIdx];
    let whatJustHappened = "";
  
    let shouldSwitchActivePlayer = true;

    // take all the stones from the selcected pocket
    gameState.pockets[pocketIdx] = 0;
    
    while(numberOfSeeds > 0) {
      // should we add it to the active player's store?
      if ( (pocketIdx === 0 && gameState.activePlayer === 0) || 
            (pocketIdx === 6 && gameState.activePlayer === 1)) {
          numberOfSeeds -= 1;
          gameState.stores[gameState.activePlayer] +=1;

          // we landed on the AP's store, so they get to go again
          if (numberOfSeeds === 0) {
            whatJustHappened = `Player ${gameState.activePlayer + 1}'s last seed went into their mancala, they get to go again.`;
            shouldSwitchActivePlayer = false;
            continue;
          }
      } 
      
      pocketIdx = pocketIdx === 0 ? 11 : pocketIdx - 1;
      numberOfSeeds -= 1;
      gameState.pockets[pocketIdx] += 1;
      
      // if we added to an empty pocket take from the opposite pocket
      if (numberOfSeeds === 0 && gameState.pockets[pocketIdx] === 1) {
        const oppositeIdx =  Math.abs(pocketIdx - 11);
        const newStore = 1 + gameState.stores[gameState.activePlayer] + gameState.pockets[oppositeIdx];

        whatJustHappened = `Player ${gameState.activePlayer + 1}'s last seed went into an empty pocket, they get to keep that seed and they capture seeds from the opposite pocket.`;

        gameState.stores[gameState.activePlayer] = newStore;    
        gameState.pockets[pocketIdx] = 0;
        gameState.pockets[oppositeIdx] = 0;
      }
    }
    
    // end the game if either side is all 0 
    const postUpdateGameOver = isGameOver(gameState.pockets);

    if (postUpdateGameOver) {
      
    // add all pocketedStones to the proper store
    const adds = [0, 0];
    for (let i = 0; i<gameState.pockets.length; i++) {
      adds[ (i < 6) ? 0 : 1 ] += gameState.pockets[i];
      gameState.pockets[i] = 0;
    }
    
    gameState.stores[0] += adds[0];
    gameState.stores[1] += adds[1];

    whatJustHappened = `Player 1 added ${adds[0]} seed from their side, and Player 2 added ${adds[1]} seeds from their side.`

  } else if (shouldSwitchActivePlayer) {
    gameState.activePlayer = gameState.activePlayer === 0 ? 1 : 0;
  }
  gameState.lastExplaination = whatJustHappened;
  return gameState;
}

export default function MancalaBoard({onGameMessageLog}:MancalaBoardParams){
  const [gameState, setGameState] = useState(structuredClone(NEW_GAME));
  const gameOver = isGameOver(gameState.pockets);

  function selectPocket(pocketIdx:number):void{

    // player can only select a pocket on thier side
    const playerCanSelectPocket = gameState.activePlayer === 0 ? pocketIdx < 6 : pocketIdx > 5;
    if (gameState.pockets[pocketIdx] === 0 || !playerCanSelectPocket)  {
      onGameMessageLog(`Player ${gameState.activePlayer + 1} is trying to make an illegal move!`);
      return;
    }

    setGameState(gameStateWas => {
      return applyTurnGameState(structuredClone(gameStateWas), pocketIdx);
    });
  }

  let winningPlayerTitle = <></>;
  if (gameOver) {
    winningPlayerTitle = <p className="conclusion">Game Over {(gameState.stores[0] === gameState.stores[1] ) ? "Tie!" : (gameState.stores[0] > gameState.stores[1] )? "Player 1 Wins" : "Player 2 Wins"}</p>
  }

  let activePlayerClassname = (gameOver) ? "" : gameState.activePlayer == 0 ? mancalaBoardClasses.active_player_1 : mancalaBoardClasses.active_player_2;
  
  return (<>
    <h1>Mancala Hour</h1>
    <div className={`${mancalaBoardClasses.mancala_board} ${activePlayerClassname} ${mancalaBoardClasses.player_orientation_1}`} >
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
    { gameOver && winningPlayerTitle }
    <p className={mancalaBoardClasses.subtitle}>
      {gameState.lastExplaination}
    </p>
  </>)
}
