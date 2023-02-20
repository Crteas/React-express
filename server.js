import express from "express";
import path from "path";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

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

let book = [];
let index = 0;

app.post("/", (req, res) => {
  console.log(req.body);
  return res.redirect("/");
});
app.get("/api/book", (req, res) => {
  console.log("someone GET This");
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
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("click", (msg) => {
    console.log("Who?" + msg);
  });
  socket.on("ping", () => {
    io.emit("pong");
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "myapp/build/index.html"));
});

server.listen(PORT, () => {
  console.log(`MY APP LISTENING ON http://localhost:${PORT}`);
});
