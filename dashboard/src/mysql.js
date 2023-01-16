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
  // console.log(req);
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
  var sys = req.body.system;
  console.log(sys);
  var resData = {};
    conn.query('SELECT * FROM tbl_cpu where system=? order by ts_create asc',[sys], (err, data)=> {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      // console.log(data);
      resData.cpu_sys =[];
      resData.cpu_per =[];
      resData.cpu_user =[];
      resData.ts_insert =[];
      resData.ts_create = [];
      if(data[0]){
        resData.ok = "true";
        data.forEach(function(val){
          resData.cpu_sys.push(val.cpu_sys);
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
  var input = req.body.system;
    conn.query('SELECT mem_total,mem_used,mem_free,mem_buffer,mem_cached,max(ts_create) as ts_create FROM tbl_memory where system=?',[input], (err, data) => {
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
  var input = req.body.system;

    conn.query(
      'select disk_io_read_bytes/1024/1024 as read_bytes, disk_io_write_bytes/1024/1024 as write_bytes, ts_create from tbl_disk_io where system=? and disk_io_name="nvme0n1p1"',[input], (err, data) => {
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
          resData.read_bytes.push(parseInt(val.read_bytes));
          resData.write_bytes.push(parseInt(val.write_bytes));
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

app.post('/disk/io/name', (req,res) => {
    conn.query(
      'select distinct(disk_io_name) from tbl_disk_io where system="system"', (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      // console.log(data);
      res.send(data);
    }
    })
})

app.post('/network', (req,res) => {
  var resData = {};
  var input = req.body.system;
    conn.query(
      'select round(net_bytes_sent/1024/1024, 2) as net_bytes_sent, round(net_bytes_recv/1024/1024, 2) as net_bytes_recv, ts_create from tbl_net_io where system = ?',[input], (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      // console.log(data);
      resData.bytes_sent = [];
      resData.bytes_recv = [];
      resData.ts_create = [];
      if(data[0]){
        resData.ok = "true";
        data.forEach(function(val){
          resData.bytes_sent.push(parseInt(val.net_bytes_sent));
          resData.bytes_recv.push(parseInt(val.net_bytes_recv));
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
  var input = req.body.system;
    conn.query('SELECT procs_username, procs_name, procs_pid, procs_ppid, procs_status, procs_mem_full_uss, ts_create FROM tbl_procs_doc where ts_create = (select max(ts_create) from tbl_procs_doc) and system = ?',[input], (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      // console.log(data);
      res.send(data);
    }
    })
})

app.post('/list/os', (req,res) => {
  var resData = {};
    conn.query('SELECT count(os) as cnt_os, os, company, ts_insert, ts_create FROM tbl_sys_info', (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
      // console.log(data);
      resData.os =[];
      resData.cnt_os =[];
      resData.company =[];
      resData.ts_insert =[];
      resData.ts_create = [];
      if(data[0]){
        resData.ok = "true";
        data.forEach(function(val){
          resData.cnt_os.push(val.cnt_os);
          resData.os.push(val.os);
          resData.company.push(val.company);
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

app.post('/list/cpu', (req,res) => {
   var resData = {};
    conn.query('SELECT cpu_per, max(ts_create) FROM tbl_cpu', (err, data) => {
      if (err) {
      console.log("데이터 가져오기 실패");
    } else {
     resData.cpu_per =[];
     if(data[0]){
        resData.ok = "true";
        data.forEach(function(val){
          resData.cpu_per.push(val.cpu_per);
        });
     }else{
        resData.ok="false"
      }
      // var df = new dfd.DataFrame(data)
      // console.log(df)
      
    }
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