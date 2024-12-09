import plusIcon from "../../images/plus_icon.svg";

export default function AddBtn({ className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      <img className="btn__sign" src={plusIcon} alt="add sign" />
    </button>
  );
}
