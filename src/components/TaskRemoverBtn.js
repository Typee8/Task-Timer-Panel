import crossIcon from "../images/cross_icon.svg";

export default function TaskRemoverBtn({
  className,
  onClick,
  isDisabled = false,
}) {
  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      <img className="btn__sign" src={crossIcon} alt="cross sign" />
    </button>
  );
}
