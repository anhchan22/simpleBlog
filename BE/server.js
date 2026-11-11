const express = require("express")
const cors = require("cors")
const countries = require("./data/countries")
const blogPosts= require("./data/blogPosts")
const app = express()
const PORT = 3000
app.use(cors({
    origin : "http://localhost:5173"
}))
app.use(express.json())

app.get("/", function(req, res){
    res.send("HEllO anhchan")
})

app.post("/login", function(req, res){
    const {username, password} = req.body

    if (username=="admin" && password=="123"){
        return res.status(200).json({
            message: "Dang nhap thanh cong",
            user: { username }
        })
    }

    return res.status(401).json({
        message: "Sai tai khoan hoac mat khau."
    })
})


app.get("/countries", function(req, res){
    res.json({
        error : false,
        message : "Lay danh sach thanh cong",
        data : countries
    })
})

app.get("/countries/:id", function(req, res){
    const id = Number(req.params.id)
    const country = countries.find(function(item){
        return item.id==id
    })
    if(!country){
        return res.status(404).json({
            error : true,
            message : "Khong tim thay country",
            data : null
        })
    }

    res.status(200).json({
        error : false,
        message : "Lay country thanh cong",
        data : country
    })
})

app.get("/posts", function(req, res){
    res.json({
        message: "Lay danh sach bai dang thanh cong",
        data: blogPosts
    })
})

app.get("/posts/:slug", function(req, res){
    const slug = req.params.slug
    const post = blogPosts.find((item)=> item.slug==slug)
    if(!post){
        return res.status(404).json({
            message: "Khong tim thay post",
            data: null
        })
    }
    res.status(200).json({
        message: "Lay post thanh cong",
        data: post
    })
})

app.put("/posts/:slug", function(req, res){
    const post = blogPosts.find((item) => item.slug == req.params.slug)
    if(!post){
        return res.status(404).json({ 
            message: "Khong tim thay post" 
        })
    }

    const { title, description } = req.body
    if(!title || !description){
        return res.status(400).json({ 
            message: "Title va description la bat buoc" 
        })
    }

    post.title = title
    post.description = description
    res.json({ 
        message: "Cap nhat post thanh cong", 
        data: post })
})

app.delete("/posts/:slug", function(req, res){
    const index = blogPosts.findIndex((item) => item.slug == req.params.slug)
    if(index === -1){
        return res.status(404).json({ 
            message: "Khong tim thay post" 
        })
    }

    blogPosts.splice(index, 1)
    res.json({ 
        message: "Xoa post thanh cong" 
    })
})

app.post("/posts", function(req, res){
    const {slug, title, description} = req.body
    if(!slug || !title || !description){
        return res.status(400).json({
            message: "Missing required fields"
        })
    }

    const exitingPost = blogPosts.find(function(i){
        return i.slug==slug
    })

    if(exitingPost){
        return res.status(409).json({
            message: "Slug da ton tai"
        })
    }

    const post = {
        slug,
        title,
        description
    }

    blogPosts.push(post)
    res.status(200).json({
        message: "them post thanh cong",
        data: post
    })
})

app.listen(PORT, function(){
    console.log(`Sever running at http://localhost:${PORT}`)
})
