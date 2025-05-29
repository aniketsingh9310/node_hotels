const express = require('express')
const app = express()
const PORT = 3000
const connectdb = require('./db.js')


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.send('hello world')
})


const parsonRoutes = require('./routes/personRoutes.js')
const menuRoutes = require('./routes/menuRoutes.js')


app.use('/person',parsonRoutes)
app.use('/menuitems',menuRoutes)

connectdb().then(()=>{
    app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})

})











// const jsonString = '{"name":"John","age":30,"city":"New york"}';
// const jsonObject = JSON.parse(jsonString);
// console.log(jsonObject.name)



// const fs = require('fs')
// const os = require('os')

// const user = os.userInfo();
// console.log(user)

// fs.appendFile('greeting.txt','hii'+user.username+'!\n',()=>{
//     console.log('file is created')
// })

// const notes = require('./notes.js')
// const _ = require('lodash')


// const data = ['person','person',1,2,1,2,'name','age'];
// const filter = _.uniq(data)

// console.log(filter)

// console.log(_.isString(0)) 