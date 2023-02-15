import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Book {
  index: number;
  name: string;
}
function Home() {
  const [books, setBook] = useState<Book[]>([]);
  // const [textInput, setTextInput] = useState("");

  const nodeURL = "http://localhost:4500/api/book";

  // const handleChangeNameInput = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTextInput(event.currentTarget.value);
  // };

  // const deleteUser = async (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const text = (event.currentTarget[0] as HTMLInputElement).value;
  //   if (text === "") return;
  //   const res = await axios.post(nodeURL + "/delete", { text });
  //   setBook(res.data);
  //   setTextInput("");
  // };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(nodeURL);
      setBook(res.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      {/* <form method="post" onSubmit={deleteUser}>
        <input
          type="text"
          name="text"
          placeholder="Delete Index"
          value={textInput}
          onChange={handleChangeNameInput}
        />
        <button type="submit">삭제</button>
      </form> */}
      <div>
        {books
          .map((item) => (
            <li key={item?.index}>
              <Link to={`/community/${item?.index}`}>{item?.name}</Link>
            </li>
          ))
          .reverse()}
      </div>
    </div>
  );
}

export default Home;
