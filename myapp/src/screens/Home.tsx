import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Book {
  index: number;
  name: string;
}

function Home() {
  const [books, setBook] = useState<Book[]>([]);
  const [textInput, setTextInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const nodeURL = "http://localhost:4500/api/book";

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.currentTarget.value);
  };
  const handleChangeNameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.currentTarget.value);
  };

  const postUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = (event.currentTarget[0] as HTMLInputElement).value;
    if (name === "") return;
    const res = await axios.post(nodeURL, { name });
    setBook(res.data);
    setNameInput("");
  };
  const deleteUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = (event.currentTarget[0] as HTMLInputElement).value;
    if (text === "") return;
    const res = await axios.post(nodeURL + "/delete", { text });
    setBook(res.data);
    setTextInput("");
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(nodeURL);
      setBook(res.data);
    };
    fetchData();
  }, []);
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
        <button type="submit">선택</button>
      </form>
      <form method="post" onSubmit={deleteUser}>
        <input
          type="text"
          name="text"
          placeholder="Delete Index"
          value={textInput}
          onChange={handleChangeNameInput}
        />
        <button type="submit">삭제</button>
      </form>
      <div>
        {books.map((item) => <h1 key={item?.index}>{item?.name}</h1>).reverse()}
      </div>
    </div>
  );
}

export default Home;
