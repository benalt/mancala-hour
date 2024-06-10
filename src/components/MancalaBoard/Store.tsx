export default function Store({stonesCount}) {
  return (<div className="store">
    <span className="count">{stonesCount > 0 ? stonesCount : ""}</span>
  </div>);
}