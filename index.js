const express = require('express')
const open = require('open')
var childProcess = require('child_process'); 

const app = express()
const port = 3110;

console.log(process.argv[2])

app.get('', (req, res) => {
    res.sendFile(__dirname + '/public/index1.html')
})
app.use(express.static('public'))

app.listen(port, () => {
    console.log(`html express server at port ${port}`)
    // open("http://localhost:3000", { app: ["google chrome"] });
    if(process.argv[2] === undefined) {
        childProcess.exec(`start chrome "http://localhost:${port}"`);
    }
    else if(process.argv[2] === 'kiosk'){
        childProcess.exec(`start chrome "http://localhost:${port}" --user-data-dir="c:\\temp" --kiosk`);
    }
})

