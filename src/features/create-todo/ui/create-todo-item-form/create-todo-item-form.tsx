export default function CreateTodoItemForm() {
  return (
    <form>
      <div>
        <input type="text" name="title" placeholder="제목" />
        <textarea name="content" placeholder="내용" />
        <button type="submit" disabled>
          추가
        </button>
      </div>
    </form>
  );
}
