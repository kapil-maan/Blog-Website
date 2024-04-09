const express = require('express')
const articleRouter = require("./routes/articles")
const Article = require('./models/article')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()


mongoose.connect(`mongodb+srv://kapilmaan0123:7879%40Kapilmongodb@cluster0.kswphur.mongodb.net/BlogWebsite?retryWrites=true&w=majority&appName=Cluster0`)
/*
mongoose.connect('mongodb://localhost/BlogWebsite')
*/

var db = mongoose.connection
db.on('error', ()=> console.log("Error in connecting to the Database"))
db.once('open', () => console.log("Connected to Database"))

app.set("views", "./view")
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.get('/', async(req, res) => {
    const articles =await Article.find().sort({ createdAt:'desc'})
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(3000)

console.log("Listening on port 3000")









/*const express = require('express')
const articleRouter = require("./routes/articles")
const mongoose = require('mongoose');

const app=express();

app.set('view engine','ejs')

app.get("/",(req,res)=>{
    const articles =[{
        title: 'Test Article 1',
        createdAt: new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article 2',
        createdAt: new Date(),
        description: 'Test description'
    }]
    res.render('articles/index',{articles:articles});
})

app.use('/articles',articleRouter)

app.listen(3000);*/