const express = require('express')

const app = express()

app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.use(express.static('public'))

app.listen(3000, () => {
    console.log('html express server at port 3000')
})