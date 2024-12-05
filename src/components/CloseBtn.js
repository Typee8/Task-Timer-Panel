import crossIcon from "../images/cross_icon.svg";

export default function CloseBtn({ className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      <img className="btn__sign" src={crossIcon} alt="cross sign" />
    </button>
  );
}
