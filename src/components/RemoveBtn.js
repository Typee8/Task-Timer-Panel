import crossIcon from "../images/cross_icon.svg";

export default function RemoveBtn({ className, onClick, isDisabled }) {
  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      <img className="btn__sign" src={crossIcon} alt="cross sign" />
    </button>
  );
}
