import { useState } from "react";

import mancalaBoardClasses from "./MancalaBoard.module.css";
import Pocket from "./Pocket";
import Store from "./Store";
import {
  MancalaTurnStep,
  applyTurnGameState,
  newMancalaGameState,
  playerCanMakeMove,
} from "mancala-gameplay";

type MancalaBoardParams = {
  onGameMessageLog(msg: string): void;
};

export default function MancalaBoard({ onGameMessageLog }: MancalaBoardParams) {
  const [gameState, setGameState] = useState(newMancalaGameState());
  const [pocketsAndStoresState, setPocketsAndStoresState] = useState({
    pockets: [...gameState.pockets],
    stores: [...gameState.stores],
  } as MancalaTurnStep);

  function selectPocket(pocketIdx: number): void {
    // player can only select a pocket on thier side

    if (!playerCanMakeMove(gameState, pocketIdx)) {
      onGameMessageLog(
        `Player ${
          gameState.activePlayer + 1
        } is trying to make an illegal move!`
      );
      return;
    }

    const newGameState = applyTurnGameState(gameState, pocketIdx);
    const updates = [...newGameState.lastTurnSteps];
    setGameState(newGameState);

    const update = updates.shift();
    if (update) {
      setPocketsAndStoresState(update);
    }

    const updateInterval = setInterval(() => {
      if (updates.length === 0) {
        clearInterval(updateInterval);
      } else {
        const update = updates.shift();
        if (update) {
          setPocketsAndStoresState(update);
        }
      }
    }, 200);
  }

  let winningPlayerTitle = <></>;
  if (gameState.resolution) {
    winningPlayerTitle = (
      <p className="conclusion">
        Game Over{" "}
        {gameState.resolution?.winner == null
          ? "Tie!"
          : `Player ${gameState.resolution.winner + 1} Wins`}
      </p>
    );
  }

  let activePlayerClassname = gameState.resolution
    ? ""
    : gameState.activePlayer == 0
    ? mancalaBoardClasses.active_player_1
    : mancalaBoardClasses.active_player_2;

  let explaination = <></>;
  if (gameState.turns.length > 0) {
    explaination = (
      <p className={mancalaBoardClasses.subtitle}>
        {gameState.turns[gameState.turns.length - 1].explanation}
      </p>
    );
  }

  return (
    <>
      <h1>Mancala Hour</h1>
      <div
        className={`${mancalaBoardClasses.mancala_board} ${activePlayerClassname} ${mancalaBoardClasses.player_orientation_2}`}
      >
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[0]}
          onPocketSelect={() => selectPocket(0)}
        />
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[1]}
          onPocketSelect={() => selectPocket(1)}
        />
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[2]}
          onPocketSelect={() => selectPocket(2)}
        />
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[3]}
          onPocketSelect={() => selectPocket(3)}
        />
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[4]}
          onPocketSelect={() => selectPocket(4)}
        />
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[5]}
          onPocketSelect={() => selectPocket(5)}
        />
        <Store stonesCount={pocketsAndStoresState.stores[0]} />

        <Pocket
          stonesCount={pocketsAndStoresState.pockets[6]}
          onPocketSelect={() => selectPocket(6)}
        />
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[7]}
          onPocketSelect={() => selectPocket(7)}
        />
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[8]}
          onPocketSelect={() => selectPocket(8)}
        />
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[9]}
          onPocketSelect={() => selectPocket(9)}
        />
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[10]}
          onPocketSelect={() => selectPocket(10)}
        />
        <Pocket
          stonesCount={pocketsAndStoresState.pockets[11]}
          onPocketSelect={() => selectPocket(11)}
        />
        <Store stonesCount={pocketsAndStoresState.stores[1]} />
      </div>
      {winningPlayerTitle}
      {explaination}
    </>
  );
}
