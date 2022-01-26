const express = require ('express')
const exphbs =  require ('express-handlebars')
const mysql = require('mysql')
const app = express()
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get ('/', (req,res)=>{

    res.render('home')

})

app.get('/books/edit/:id',(req,res)=>{

    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id= ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const book = data[0]

        res.render('edit', {book:book})
        console.log(book)

    })

})




app.get('/books/:id',(req,res)=>{

    const id = req.params.id

    const sql = `SELECT * FROM BOOKS WHERE id= ${id}`

    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
        const book = data[0]

        res.render('book', {book:book})

    })

})


app.get('/books', (req,res)=>{
    const sql = "SELECT * FROM books"

    conn.query(sql, function(err, data){

        if(err){
            console.log(err)
            return
        }

        const books = data

        res.render('books', {books})
    })

})

app.post('/books/insertbook', (req, res)=>{

    const title = req.body.title
    const pageqty = req.body.pageqty
    const sql = `INSERT INTO books(title, pageqty) VALUES('${title}','${pageqty}')` 

    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')

    })

})

app.post('/books/updatebook', (req, res)=>{

    const id = req.body.id    
    const title = req.body.title
    const pageqty = req.body.pageqty
    const sql = `UPDATE books SET pageqty='${pageqty}', title='${title}' WHERE id=${id}` 
    
    conn.query(sql, function(err){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/books')

    })

})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'

})

conn.connect(function(err){

    if (err){
        console.log(err)
    }
    else{
        app.listen(3000)
        console.log('Conectado ao banco de dados mySql')
    }

})
