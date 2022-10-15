const express = require("express") 
const rateLimiter = require("express-rate-limit")
const app = express() 
const apiRouter = require("./routes/api.js") 
require("dotenv").config() 
const constants = require("./constants")
require("ejs") // required for auto setup on replit 

const apiLimiter = rateLimiter({
    windowMs: 1000 * 60,  
    max: 60,
    standardHeaders: true, 
    legacyHeaders: false, 
    message: {"status": "429", "message": "too many api calls"}
})


app.set("view engine", "ejs")
app.set("views", "./web")

app.use(express.static("./web"))
app.use("/api", apiLimiter, apiRouter)  


app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/features", (req, res) => {
    res.render("features.ejs")
})

app.get("/download", (req, res) => {
    res.render("download.ejs")
})

app.get("/download/latest", (req, res) => {
    res.download(`./web/versions/PaddyAddons-${constants.MOD_VERSION}.jar`) 
})


const port = process.env.PORT || 3000 
app.listen(port, (err) => {
    if(err) {
        console.error(err)
    } else {
        console.log(`Server listening on port ${port}`)
    }
})


process.on("uncaughtException", (e) => console.error(e))
process.on("unhandledRejection", (e) => console.error(e))
