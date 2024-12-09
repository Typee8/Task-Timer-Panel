import binIcon from "../../images/bin_icon.svg";

export default function RemoveBtn({ className, onClick, isDisabled = false }) {
  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      <img className="btn__sign" src={binIcon} alt="remove sign" />
    </button>
  );
}
