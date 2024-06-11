type StoreParams = {
  stonesCount: number
};

export default function Store({stonesCount}:StoreParams) {
  return (<div className="store">
    <span className="count">{stonesCount > 0 ? stonesCount : ""}</span>
  </div>);
}