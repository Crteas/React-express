import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4500");

function Book() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("pong", () => {
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const sendPing = () => {
    socket.emit("ping");
  };
  const disconnect = () => {
    //socket.emit("disconnect"); 이거 안도미.
    socket.disconnect();
  };

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
      <button onClick={disconnect}>out</button>
      <form>
        <input type="text" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default Book;
