import bookmarkIcon from "../../images/bookmark_icon.svg";

export default function SaveBtn({ className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      <img className="btn__sign" src={bookmarkIcon} alt="save sign" />
    </button>
  );
}
