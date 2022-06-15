export function Create({ onCreate }) {
  return (
    <article>
      <h2>Create</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const body = e.target.body.value;
          onCreate(title, body);
        }}
      >
        <input name="title" type="text" placeholder="title" />
        <textarea name="body" placeholder="body" />
        <button type="submit">Create</button>
      </form>
    </article>
  );
}
