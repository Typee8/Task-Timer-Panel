import RemoveBtn from "./RemoveBtn";
import SaveBtn from "./SaveBtn";

export default function TaskRemover() {
  return (
    <section className>
      <h2 className>What would you like to do with this task?</h2>
      <div className>
        <SaveBtn />
        <RemoveBtn />
      </div>
    </section>
  );
}
