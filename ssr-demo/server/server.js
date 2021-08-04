const path = require("path")
const express = require("express")
const app = express()
const fs = require("fs")

const pathToIndex = path.join(__dirname, "../build/index.html")
app.get("/", (req, res) => {
    const raw = fs.readFileSync(pathToIndex);
    const tags =`<meta charset="UTF-8">
                    <meta name="description" content="A Demo Meta Tag">
                    <meta name="keywords" content="React.Js, Redux">
                    <meta name="author" content="Lakshya Sethi">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">`;

    const updated = raw.toString().replace("{{meta tags}}", tags);
    res.send(updated)
})

app.use(express.static(path.join(__dirname, "../build")))
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../build/index.html"))
)
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})