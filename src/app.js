// *******************************************************
// ******** Setup Modules ********************************
// *******************************************************
// ** Load Core Modules **********************************
const path = require('path')
const fs = require('fs')
// ** Load NPM Modules ***********************************
const express = require('express')
const cors = require('cors')
// *******************************************************
// ******** End of Modules *******************************
// *******************************************************

// *******************************************************
// *******************************************************
// ******** Beginning of Code ****************************
// *******************************************************
// *******************************************************

// *******************************************************
// ******** Declare Program Variables ********************
// *******************************************************
const pubDirPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(pubDirPath))

let list
// *******************************************************
// ******** Declare Program Functions ********************
// *******************************************************

// Function to get Customer List from cList.json

let getCustomer = () => {
  list = JSON.parse(fs.readFileSync('cList.json').toString())
  return list
}

// Route and Function to Find Selected User from userList.json

app.get('/ulookup', (req, res) => {
  let parameter = req.query.custID
  let file = JSON.parse(fs.readFileSync('userList.json'))
  let result
  let info

  if (parameter) {
    result = file.filter((record) => record.custID == parameter)
    console.log(result)
    result.forEach((element) => {
      info = element
    })

    if (info == 'undefined') {
    }
    console.log(typeof info)
    res.send(info)
  } else {
    result = [
      {
        err: 'Ivalid ID',
      },
    ]
    result.forEach((element) => {
      info = element
    })
    console.log(info)
    res.send(info)
  }
})

// *******************************************************
// ******** Create /clist route **************************
// *******************************************************

app.get('/clist', (req, res) => {
  getCustomer()
  res.send(list)
})

// *******************************************************
// ******** Create /ulookup route ************************
// *******************************************************

// *******************************************************
// ******** Start the Server *****************************
// *******************************************************
app.listen(port, () => {
  console.log(`The Server is Up and Running on Port ${port}`)
})

// *******************************************************
// ******** End of Code **********************************
// *******************************************************

// Instructor: Denis Billette
