const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require("dotenv").config({ path: "../.env" });
const app = express();
const port = 3001;

// const dfd = require("danfojs-node");

const conn = new mysql.createConnection({
      host: process.env.host,
      user: process.env.user,
      password: process.env.password,
      database: process.env.database
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.post('/data', (req,res) => {
    conn.query('SELECT * FROM tbl_sys_info', (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      console.log(data);
      res.send(data);
    }
    })
})
app.post('/server', (req,res) => {
  var resData = {};
    conn.query('SELECT * FROM tbl_cpu where system="system" order by ts_create asc', (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      // console.log(data);
      resData.cpu_per =[];
      resData.cpu_user =[];
      resData.ts_insert =[];
      resData.ts_create = [];
      if(data[0]){
        resData.ok = "true";
        data.forEach(function(val){
          resData.cpu_per.push(val.cpu_per);
          resData.cpu_user.push(val.cpu_user);
          resData.ts_insert.push(val.ts_insert);
          resData.ts_create.push(val.ts_create);
        });
      }else{
        resData.ok="false"
      }
      // var df = new dfd.DataFrame(data)
      // console.log(df)
      
    }
    console.log(resData);
    return res.json(resData);
    })
})

app.post('/memory', (req,res) => {
  var resData = {};
    conn.query('SELECT * FROM tbl_memory where system="system" order by ts_create asc', (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      // console.log(data);
      resData.mem_total =[];
      resData.mem_used =[];
      resData.ts_insert =[];
      resData.ts_create = [];
      if(data[0]){
        resData.ok = "true";
        data.forEach(function(val){
          resData.mem_total.push(val.mem_total);
          resData.mem_used.push(val.mem_used);
          resData.ts_insert.push(val.ts_insert);
          resData.ts_create.push(val.ts_create);
        });
      }else{
        resData.ok="false"
      }
      // var df = new dfd.DataFrame(data)
      // console.log(df)
      
    }
    console.log(resData);
    return res.json(resData);
    })
})

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/text", (req, res) => {
  const user_id = req.body.inText;
  // console.log(user_id);
  //////query문 추가할 곳/////
  
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;