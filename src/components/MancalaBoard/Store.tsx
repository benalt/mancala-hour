import mancalaBoardClasses from "./MancalaBoard.module.css"

type StoreParams = {
  stonesCount: number
};

export default function Store({stonesCount}:StoreParams) {
  return (<div className={mancalaBoardClasses.store}>
    <span className={mancalaBoardClasses.stones_array}>
      {new Array(stonesCount).fill('').map( () => (<span className={mancalaBoardClasses.stone}></span>))}
    </span>
    {stonesCount > 24 && <span className={mancalaBoardClasses.count}>+ {stonesCount - 24}</span>}
  </div>);
}