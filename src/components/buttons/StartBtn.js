import greaterThanIcon from "../../images/greaterThan_icon.svg";

export default function StartBtn({ className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      <img className="btn__sign" src={greaterThanIcon} alt="start sign" />
    </button>
  );
}
