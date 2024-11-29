export default function Task({ id, title }) {
  console.log(id);
  return (
    <section id={id}>
      <header>
        <div>{title}</div>
        <div>ShowTime</div>
      </header>
      <footer>Btn Start/Pause</footer>
    </section>
  );
}
