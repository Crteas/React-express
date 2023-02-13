import axios from "axios";
import { FormEvent, useEffect, useState } from "react";

interface Book {
  index: number;
  name: string;
}

function App() {
  const [books, setBook] = useState<Book[]>([]);
  const url = "/book";
  const postUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = (event.currentTarget[0] as HTMLInputElement).value;
    axios.post(url, { name });
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(url);
      setBook(res.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <form method="post" onSubmit={postUser}>
        <input type="text" name="name" />
        <button type="submit">선택</button>
      </form>

      <div>
        {books.map((item) => (
          <h1 key={item.index}>{item.name}</h1>
        ))}
      </div>
    </div>
  );
}

export default App;
