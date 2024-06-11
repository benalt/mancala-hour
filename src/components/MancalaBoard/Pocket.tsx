type PocketParams = {
  stonesCount: number,
  onPocketSelect() :void
};

export default function Pocket({stonesCount, onPocketSelect}:PocketParams) {

  return (<div className="pocket" onClick={onPocketSelect}>
    <span className="count">{stonesCount > 0 ? stonesCount : ""}</span>
    
  </div>);
}