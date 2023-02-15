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
    if (name === "") return;
    await axios.post(nodeURL, { name });
    setNameInput("");
    navigate("/");
  };
  return (
    <div>
      <form method="post" onSubmit={postUser}>
        <input
          type="text"
          name="name"
          placeholder="Create"
          value={nameInput}
          onChange={handleChangeInput}
        />
        <button type="submit">게시</button>
      </form>
    </div>
  );
}

export default UploadPage;
