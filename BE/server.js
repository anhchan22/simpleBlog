const express = require("express")
const cors = require("cors")
const countries = require("./countries")
const app = express()
const PORT = 3000
app.use(cors({
    origin : "http://localhost:5173"
}))

app.get("/", function(req, res){
    res.send("HEllO anhchan")
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
        res.status(404).json({
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

app.listen(PORT, function(){
    console.log(`Sever running at http://localhost:${PORT}`)
})