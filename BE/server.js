const express = require("express")
const cors = require("cors")
const countries = require("./data/countries")
const { BlogPosts: posts } = require("./data/post")
const app = express()
const PORT = 3000
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use(express.json());


app.get("/", function (req, res) {
    res.send("HEllO anhchan")
})

app.post("/login", function (req, res) {
    const { username, password } = req.body

    if (username === "admin" && password === "123") {
        return res.status(200).json({
            message: "Login successful",
            user: { username }
        })
    }

    return res.status(401).json({
        message: "Sai tài khoản hoặc mật khẩu"
    })
})

app.get("/countries", function (req, res) {
    res.json({
        error: false,
        message: "Lay danh sach thanh cong",
        data: countries
    })
})

app.get("/countries/:id", function (req, res) {
    const id = Number(req.params.id)
    const country = countries.find(function (item) {
        return item.id == id
    })
    if (!country) {
        return res.status(404).json({
            message: "Khong tim thay country"
        })
    }

    res.status(200).json({
        error: false,
        message: "Lay country thanh cong",
        data: country
    })
})

app.get("/posts", function (req, res) {
    res.json({
        error: false,
        message: "Lay du lieu thanh cong",
        data: posts
    })
})

app.get("/posts/:slug", function(req, res){
    const slug = req.params.slug
    const post = posts.find(function(item){
        return item.slug == slug
    })
    if(!post){
        return res.status(404).json({
            message: "khong tim thay post"
        })
    }
    res.status(200).json({
        error: false,
        message: "Lay du lieu thanh cong",
        data: post
    })
})

app.post("/posts", function(req, res){
    const {slug, title, description} = req.body
    if(!slug || !title || !description){
        return res.status(400).json({
            message: "Missing required fields"
        })
    }

    const existingPost = posts.find(function(item){
        return item.slug == slug
    })

    if(existingPost){
        return res.status(409).json({
            message: "Slug da ton tai"
        })
    }

    const post = {
        slug,
        title,
        description
    }

    posts.push(post)

    res.status(201).json({
        message: "Them post thanh cong",
        data: post
    })
})

app.listen(PORT, function () {
    console.log(`Sever running at http://localhost:${PORT}`)
})
