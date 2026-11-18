const express = require("express")
const cors = require("cors")
const countries = require("./data/countries")
const connectDB = require("./config/db")
const Post = require("./db/postModel")
const User = require("./db/userModel")
const app = express()
const PORT = 3000
connectDB()
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"]
}))
app.use(express.json())


app.get("/", function (req, res) {
    res.send("HEllO anhchan")
})

app.post("/register", async function (req, res) {
    const user = new User(req.body)
    try {
        await user.save()
        res.send({ data: user })
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post("/login", async function (req, res) {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        })
        if (!user) {
            return res.status(401).json({ message: "Sai tai khoan hoac mat khau." })
        }
        res.status(200).json({
            message: "Dang nhap thanh cong",
            user: { username: user.username, name: user.name }
        })
    } catch (error) {
        res.status(500).send(error)
    }
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
            error: true,
            message: "Khong tim thay country"
        })
    }
    res.status(200).json({
        error: false,
        message: "Lay country thanh cong",
        data: country
    })
})

app.get("/posts", async function (req, res) {
    try {
        const posts = await Post.find({})
        res.json({
            message: "Lay danh sach bai dang thanh cong",
            data: posts
        })
    } catch (error) {
        res.status(500).send({ error })
    }
})

app.get("/posts/:slug", async function (req, res) {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
        if (!post) {
            return res.status(404).json({
                message: "Khong tim thay post"
            })
        }
        res.status(200).json({
            message: "Lay post thanh cong",
            data: post
        })
    } catch (error) {
        res.status(500).send({ error })
    }
})


app.post("/posts", async function (req, res) {
    const post = new Post(req.body)
    try {
        await post.save()
        res.send({ data: post })
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put("/posts/:slug", async function (req, res) {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
        if (!post) {
            return res.status(404).json({
                message: "Khong tim thay post"
            })
        }
        post.title = req.body.title
        post.description = req.body.description
        await post.save()
        res.status(201).send(post)
    } catch (error) {
        console.log("Sua that bai", error)
        res.status(500).json({ message: "Sua bai viet that bai" })
    }
})

app.delete("/posts/:slug", async function (req, res) {
    try {
        const post = await Post.findOneAndDelete({ slug: req.params.slug })
        if (!post) {
            return res.status(404).json({
                message: "Khong tim thay post"
            })
        }
        res.status(204).send()
    } catch (error) {
        res.send({ error })
    }
})

app.post("/posts/:slug/comments", async function (req, res) {
    try {
        const post = await Post.findOne({ slug: req.params.slug })
        if (!post) {
            return res.status(404).send("Khong tim thay post")
        }
        post.comments.push({
            username: req.body.username,
            name: req.body.name,
            text: req.body.text
        })
        await post.save()
        res.send(post)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete("/posts/:slug/comments/:commentId", async function (req, res) {
    const post = await Post.findOneAndUpdate(
        { slug: req.params.slug },
        { $pull: { comments: { _id: req.params.commentId } } },
        { new: true }
    )
    res.send(post)
})
app.listen(PORT, function () {
    console.log(`Sever running at http://localhost:${PORT}`)
})



// app.post("/posts/:slug/comments/:commentId/replies", async function (req, res) {
//     const post = await Post.findOne({ slug: req.params.slug })
//     const comment = post.comments.id(req.params.commentId)

//     comment.replies.push({
//         username: req.body.username,
//         name: req.body.name,
//         text: req.body.text
//     })

//     await post.save()
//     res.send(post)
// })
