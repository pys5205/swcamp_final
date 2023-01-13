import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import './app.css'
import Home from './pages/home/Home'
import ServerList from './pages/serverList/ServerList'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount(){
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
                  console.log(json);
                    this.setState({
                      isLoaded: true,
                     data : json
                    })
                  }
      });
  }
  render() {
      const listItems = this.state.data.map((data) => (
        <Route path={`/list/${data.company}`} element={<ServerList /> } />
        ));
  return (
  // <div className="App">
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home /> } />
            <Route path="/serverlist" element={<ServerList /> } />
            {listItems}
          </Routes>
      </div>
    </Router>
  )
}
}

