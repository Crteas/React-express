import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Book {
  index: number;
  name: string;
}

function Home() {
  const [books, setBook] = useState<Book[]>([]);
  const [test, setTest] = useState("");
  const [nameInput, setNameInput] = useState("");
  const url = "/book";
  const nodeURL = "http://localhost:4500/api/book";

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setNameInput(event.currentTarget.value);
  };

  const postUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = (event.currentTarget[0] as HTMLInputElement).value;
    const res = await axios.post(nodeURL, { name });
    setBook(res.data);
    setNameInput("");
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
          value={nameInput}
          onChange={handleChangeInput}
        />
        <button type="submit">선택</button>
      </form>

      <div>
        {books.map((item) => <h1 key={item?.index}>{item?.name}</h1>).reverse()}
      </div>
    </div>
  );
}

export default Home;
