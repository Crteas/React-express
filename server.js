import express from "express";
import path from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import "./db";
import Book from "./models/Book";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

const PORT = 4500;
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "myapp/build")));

//fake DB
let book = [];
let index = 0;

app.post("/", (req, res) => {
  console.log(req.body);
  return res.redirect("/");
});
app.get("/api/book", async (req, res) => {
  //DB뿌리기
  console.log("someone GET This");
  const book = await Book.find({});
  // Book.create({
  //   name: "hello",
  //   content: "hi bor",
  // });
  console.log(book);
  return res.send(book);
});
app.post("/api/book", (req, res) => {
  const bookObj = req.body;
  console.log(bookObj);
  bookObj.index = index;
  index++;
  book.push(req.body);
  console.log(book);
  return res.send(book);
});
app.post("/api/book/delete", (req, res) => {
  const { text } = req.body;
  if (book.length > 0) {
    const result = book.filter((key) => key?.index !== Number(text));
    book = result;
  }
  return res.send(book);
});
app.get("/community/:id", (req, res) => {
  const { id } = req.params;
  const content = book.find((book) => book.index === Number(id));
  return res.send(content);
});

//Socket IO for chat
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("click", (msg) => {
    console.log("Who?" + msg);
  });
  socket.on("text", (msg) => {
    console.log(msg);
    socket.emit("serverSay", `나 : ${msg}`);
    socket.to("1").emit("serverSay", `상대 : ${msg}`);
  });
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(socket.rooms);
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "myapp/build/index.html"));
});

server.listen(PORT, () => {
  console.log(`MY APP LISTENING ON http://localhost:${PORT}`);
});
