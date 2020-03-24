const express = require ("express")
const nunjucks = require("nunjucks")

const server = express()
const movies = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar: "img/me.jpg",
        name: "Diego Nascimento",
        role: 'Studant at <a href="https://rocketseat.com.br" target="_blank">RocketSeat</a>',
        description: "Focado nas principais tecnologias do mercado como: Node.js, React e React Native.",
        links: [
            {name: "GitHub", url:"https://github.com"},
            {name: "Youtube", url:"https://youtube.com"},
            {name: "Linkedin", url:"https://br.linkedin.com"}
        ]
    }

    return res.render("about", {about})
})

server.get("/portfolio", function(req, res){
    return res.render("portfolio", {itens: movies})
})

server.get("/movie", function(req, res){
    const id = req.query.id

    const movie = movies.find(function(movie){
        return movie.id == id
        
    })

    if (!movie){
        return res.send("Video not found!")
    }

    return res.render("movie", { item: movie })
})

server.listen(5000, function(){
    console.log("server is running")
})