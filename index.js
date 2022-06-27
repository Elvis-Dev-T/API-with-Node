const express = require('express')
let mysql     = require('mysql2');

const app = express()

const port = 3000

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '########',
  database : '########'
});

connection.connect()


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Service to found a category
app.get('/new_system/v1/category', (req, res) => {
  connection.query('SELECT id, name FROM new_system.category', function(err, rows, fields) {
    if (err) throw err;
    
    res.send(rows)

  });
})


app.get('/new_system/v1/category/:categoryid/news', (req, res) => {

  connection.query('SELECT id, title FROM new_system.news WHERE categoryid = ' + req.params.categoryid, function(err, rows, fields) {
    if (err) throw err;
    
    res.send(rows)

  });
})

app.get('/new_system/v1/category/:categoryid/news/:newsid', (req, res) => {

  connection.query('SELECT id, title, content FROM new_system.news WHERE categoryid = ' + req.params.categoryid + ' AND id = ' + req.params.newsid, function(err, rows, fields) {
    if (err) throw err;
    
    res.send(rows[0])

  });
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})