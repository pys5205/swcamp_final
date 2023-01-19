import React from 'react'
import DesktopWindowsOutlinedIcon from '@mui/icons-material/DesktopWindowsOutlined';
import { green } from '@mui/material/colors';
import './serverCnt.css'
export default class servercnt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){

  fetch("/list/os", { 
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
                     data : json
                    })
                  }
      });
  }
  render() {
    const Data = this.state.data;
    console.log(Data.count_os);
    return(
        <div className="servercnt">
                <div className="count">
                    {Data.count_os} EA 
                    <div className="server">
                        <p>Server</p>
                    </div>
                </div>
                <div className="icon">
                    <DesktopWindowsOutlinedIcon sx={{ color:green[500], fontSize: 70 }}  />
                </div>
           
        </div>
    )

  }
}