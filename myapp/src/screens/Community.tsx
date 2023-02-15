import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Community() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const nodeURL = `http://localhost:4500/community/${params.id}`;
  useEffect(() => {
    async function call() {
      const res = await axios.get(nodeURL);
      setTitle(res.data.name);
    }
    call();
  });

  return <h1>{title}</h1>;
}

export default Community;
