import equalsIcon from "../../images/equals_icon.svg";

export default function PauseBtn({ className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      <img className="btn__sign" src={equalsIcon} alt="pause sign" />
    </button>
  );
}
