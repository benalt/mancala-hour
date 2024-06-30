import mancalaBoardClasses from "./MancalaBoard.module.css";

type PocketParams = {
  stonesCount: number;
  onPocketSelect(): void;
};

export default function Pocket({ stonesCount, onPocketSelect }: PocketParams) {
  return (
    <div
      className={`${mancalaBoardClasses.pocket}`}
      data-stones={stonesCount}
      onClick={onPocketSelect}
    >
      <span className={mancalaBoardClasses.stones_array}>
        {new Array(stonesCount).fill("").map(() => (
          <span className={mancalaBoardClasses.stone}></span>
        ))}
      </span>
      {stonesCount > 9 && (
        <span className={mancalaBoardClasses.count}>+ {stonesCount - 9}</span>
      )}
    </div>
  );
}
