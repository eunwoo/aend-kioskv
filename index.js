const express = require('express')
const open = require('open')
var childProcess = require('child_process'); 

const app = express()

app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})
app.use(express.static('public'))

app.listen(3110, () => {
    console.log('html express server at port 3110')
    // open("http://localhost:3000", { app: ["google chrome"] });
    childProcess.exec('start chrome "http://localhost:3110"');

})

