import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import './app.css'
import Home from './pages/home/Home'
import ServerList from './pages/serverList/ServerList'
import ServerCPU from './pages/server_cpu/ServerCPU'
import ServerMEM from './pages/server_mem/ServerMem'
import ServerDISK from './pages/server_disk/ServerDisk'
import ServerNET from './pages/server_net/ServerNet'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch("/data", {
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json === undefined) {
          alert("오류");
        } else {
          //////////////////////////////////여기부터보자
          // console.log(json);
          this.setState({
            isLoaded: true,
            data: json
          })
        }
      });
  }
  render() {
    const listItems = this.state.data.map((data) => (
      <Route path={`/list/${data.system}`} element={<ServerList />} />
    ));
    const listCPU = this.state.data.map((data) => (
      <Route path={`/list/${data.system}/cpu`} element={<ServerCPU />} />
    ));
    const listMEM = this.state.data.map((data) => (
      <Route path={`/list/${data.system}/mem`} element={<ServerMEM />} />
    ));
    const listDISK = this.state.data.map((data) => (
      <Route path={`/list/${data.system}/disk`} element={<ServerDISK />} />
    ));
    // const nameDISK = this.state.data.map((data) => (
    //   <Route path={`/list/${data.system}/disk/${data.disk_io_name}`} element={<ServerDISK />} />
    // ));
    const listNET = this.state.data.map((data) => (
      <Route path={`/list/${data.system}/net`} element={<ServerNET />} />
    ));
    return (
      // <div className="App">
      <Router>
        <Topbar />
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/serverlist" element={<ServerList />} />
            {listItems}
            {listCPU}
            {listMEM}
            {listDISK}
            {listNET}
          </Routes>
      </Router>
    )
  }
}

