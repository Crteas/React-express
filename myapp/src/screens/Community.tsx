import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 30px;
`;
const Wrapper = styled.div``;
const Contents = styled.div`
  pre {
    white-space: normal;
  }
  width: 100%;
`;
const UDbox = styled.div``;

function Community() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const nodeURL = `http://localhost:4500/community/${params.id}`;
  useEffect(() => {
    async function call() {
      const res = await axios.get(nodeURL);
      setTitle(res.data.name);
      setContent(res.data.contents);
    }
    call();
  });

  return (
    <Wrapper>
      <Title>{title}</Title>
      <Contents>
        <pre>{content}</pre>
      </Contents>
      <UDbox>
        <Link to="edit">
          <button>수정</button>
        </Link>
        <button>삭제</button>
      </UDbox>
    </Wrapper>
  );
}

export default Community;
