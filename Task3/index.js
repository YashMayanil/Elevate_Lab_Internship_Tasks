import express from "express";
import dotenv from "dotenv"
const app = express();

dotenv.config();

const PORT = process.env.PORT || 8000

app.use(express.json());

let book = [
    {
        id:1,
        title: "Atomic Habits",
        author: "James Clear"
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho"
    }
]


// this api is used for get all books
app.get("/book",(req,res)=>{
    res.status(200).json(book);
})


//this api is used to store book in memory
app.post("/create-book",(req,res)=>{
    const {id,title,author} = req.body;
    
    if(!id || !title || !author){
        res.status(400).json({
            success:false,
            message:"Please provide all fields"
        })
    }

    const newBook = {
        id,title,author
    }

    book.push(newBook);

    res.status(200).json(book);
})

//put api is used to update some data....
app.put("/book/:id", (req, res) => {

    const id = Number(req.params.id);

    const b = book.find((item) => item.id === id);

    if (!b) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author } = req.body;

    if (title) {
        b.title = title;
    }

    if (author) {
        b.author = author;
    }

    res.json({
        message: "Book Updated",
        book: b
    });

});

// this is delete api 
app.delete("/book/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = book.findIndex((item) => item.id === id);

    if (index === -1) {

        return res.status(404).json({
            message: "Book not found"
        });

    }

    const deletedBook = book.splice(index, 1);

    res.json({
        message: "Book Deleted",
        deletedBook
    });

});


app.listen(PORT,()=>{
    console.log("server is running....")
})