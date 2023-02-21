import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const navigate = useNavigate();
  const [nameInput, setNameInput] = useState("");
  const nodeURL = "http://localhost:4500/api/book";
  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.currentTarget.value);
  };
  const postUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = (event.currentTarget[0] as HTMLInputElement).value;
    const contents = (event.currentTarget[1] as HTMLInputElement).value;
    if (name === "") return;
    await axios.post(nodeURL, { name, contents });
    setNameInput("");
    navigate("/");
  };
  console.log(nameInput);
  return (
    <div>
      <form id="postForm" method="post" onSubmit={postUser}>
        <input
          type="text"
          name="name"
          placeholder="Create"
          /*value={nameInput}*/
          onChange={handleChangeInput}
        />
        <textarea spellCheck="false" form="postForm" name="content" />
        <button type="submit">게시</button>
      </form>
    </div>
  );
}

export default UploadPage;
