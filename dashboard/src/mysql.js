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
      // console.log(data);
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
    // console.log(resData);
    return res.json(resData);
    })
})

app.post('/memory', (req,res) => {
  var resData = {};
    conn.query('SELECT mem_total,mem_used,mem_free,mem_buffer,mem_cached,max(ts_create) as ts_create FROM tbl_memory where system="system"', (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      // console.log(data);
      resData.total = [];
      resData.server_memory =[];
      resData.time = [];
      if(data[0]){
        resData.ok = "true";
        data.forEach(function(val){
          resData.total.push(val.mem_total);
          resData.server_memory.push(val.mem_used);
          resData.server_memory.push(val.mem_free);
          resData.server_memory.push(val.mem_buffer);
          resData.server_memory.push(val.mem_cached);
          resData.time.push(val.ts_create);
        });
      }else{
        resData.ok="false"
      }
      // var df = new dfd.DataFrame(data)
      // console.log(df)
      
    }
    // console.log(resData);
    return res.json(resData);
    })
})

app.post('/disk', (req,res) => {
  var resData = {};
    conn.query(
      'select disk_io_read_bytes/1024/1024 as read_bytes, disk_io_write_bytes/1024/1024 as write_bytes, ts_create from tbl_disk_io where system="system" and disk_io_name=""\"nvme0n1\""" ', (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      // console.log(data);
      resData.read_bytes = [];
      resData.write_bytes = [];
      resData.ts_create = [];
      if(data[0]){
        resData.ok = "true";
        data.forEach(function(val){
          resData.read_bytes.push(val.read_bytes);
          resData.write_bytes.push(val.write_bytes);
          resData.ts_create.push(val.ts_create);
        });
      }else{
        resData.ok="false"
      }
      // var df = new dfd.DataFrame(data)
      // console.log(df)
      
    }
    //console.log(resData);
    return res.json(resData);
    })
})

app.post('/process', (req,res) => {
  var resData = {};
    conn.query('SELECT procs_username, procs_name, procs_pid, procs_ppid, procs_status, procs_mem_full_uss, ts_create FROM tbl_procs_doc where ts_create = (select max(ts_create) from tbl_procs_doc)', (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      // console.log(data);
      resData.procs_username = [];
      resData.procs_name = [];
      resData.procs_pid = [];
      resData.procs_ppid = [];
      resData.procs_status = [];
      resData.procs_mem_full_uss = [];
      resData.ts_create = [];
      if(data[0]) {
        resData.ok = "true";
        data.forEach(function(val){
          resData.procs_username.push(val.procs_username);
          resData.procs_name.push(val.procs_name);
          resData.procs_pid.push(val.procs_pid);
          resData.procs_ppid.push(val.procs_ppid);
          resData.procs_status.push(val.procs_status);
          resData.procs_mem_full_uss.push(val.procs_mem_full_uss);
          resData.ts_create.push(val.ts_create);
        });
      }else {
        resData.ok = "false";
      }
    }
    // console.log(resData);
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