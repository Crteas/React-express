import express from "express";
import path from "path";
import cors from "cors";

const app = express();
const PORT = 4500;
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "myapp/build")));

const book = [
  {
    name: "hi",
    index: 1,
  },
  {
    name: "hi",
    index: 2,
  },
];

app.post("/", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});
app.get("/api/book", (req, res) => {
  console.log("someone GET This");
  res.send(book);
});
app.post("/api/book", (req, res) => {
  const bookObj = req.body;
  bookObj.index = book.length + 1;
  book.push(req.body);
  res.send(book);
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "myapp/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`MY APP LISTENING ON http://localhost:${PORT}`);
});
