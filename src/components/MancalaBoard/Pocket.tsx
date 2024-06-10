export default function Pocket({stonesCount, onPocketSelect}) {

  return (<div className="pocket" onClick={onPocketSelect}>
    <span className="count">{stonesCount > 0 ? stonesCount : ""}</span>
    
  </div>);
}