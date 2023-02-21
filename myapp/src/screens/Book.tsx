import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRef } from "react";
const socket = io("http://localhost:4500");

function Book() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [a, setA] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [room, setRoom] = useState("");
  const [nickname, setNickname] = useState("");
  const socketRef = useRef(a);
  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("serverSay", (msg: string) => {
      setA((item) => [...item, msg]);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("serverSay");
    };
  }, []);
  const disconnect = () => {
    //socket.emit("disconnect"); 이거 안도미.
    socket.disconnect();
  };
  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };
  const handleRoom = (event: ChangeEvent<HTMLInputElement>) => {
    setRoom(event.currentTarget.value);
  };
  const handleNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNickname(event.currentTarget.value);
  };
  const sendText = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("text", text);
  };
  const joinRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("joinRoom", room);
  };
  console.log(a.map((item) => item + "임"));
  return (
    <>
      <p>Connected: {"" + isConnected}</p>
      <button onClick={disconnect}>out</button>
      <form onSubmit={joinRoom}>
        <input
          type="text"
          placeholder="방선택"
          value={room}
          onChange={handleRoom}
        />
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={handleNickname}
        />
        <input type="submit" />
      </form>
      <form onSubmit={sendText}>
        <input type="text" value={text} onChange={handleText} />
        <input type="submit" />
      </form>
      <div>
        {a.map((item, index) => (
          <h1 key={index}>{item}</h1>
        ))}
      </div>
    </>
  );
}

export default Book;
