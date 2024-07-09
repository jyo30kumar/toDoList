import express from "express";
import bodyParser from "body-parser";
const app = express();
const port = 3000;
let id = 0;
let data = [];
let isServerStarted;
app.use(bodyParser.urlencoded({ extended: true })); // middleware for urlencoded data
app.use(bodyParser.json());  // middleware for json data

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        items: data, 
        id : id
    });
});
app.get("/reset", (req, res) =>{
    id = 0;
    data = [];
    res.redirect("/");
});
app.post("/submit", (req, res) => {
    const title = req.body["addTask"];
    if (req.body["addTask"].trim()) { // pushing it to array if it is not empty
        id = id + 1;
        data.push({id, title});
    }
    res.redirect("/"); // redirect to index page after click on submit
});
app.post("/edit", (req, res) => {
    const id = req.body.updatedItemId;
    const result = data.find((d) => d.id == id);
    const searchIndex = data.findIndex((index) => index.id == id);
    if(searchIndex!== -1){
        data[searchIndex] = {
            id : id,
            title: req.body.updatedItemTitle
        }
    res.redirect("/");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});