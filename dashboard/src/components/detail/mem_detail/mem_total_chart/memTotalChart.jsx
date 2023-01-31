import React from 'react'
import './memtotalchart.css'
import Loding from '../../../main/loding'
export default class detailcpuavg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: true,
      data: []
    };
  }
  
 componentDidMount(){
  const current = decodeURI(window.location.href);
  const server = current.split('/')[4];
  const interval = setInterval(async () => {
  fetch("/memory", { 
      method: "post", //통신방법햣
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        'system' : server
      }
        ),
    })
      .then((res) => res.json())
      .then((json) => {
       if (json === undefined) {
                    alert("오류");
                  } else {
                  //////////////////////////////////여기부터보자
                  // console.log(json);
                    this.setState({
                      isLoaded: false,
                     data : json
                    })
                  }
      });
 }, 2000);
    return () => clearInterval(interval);
  }
  render() {
    
    // console.log(this.state.data);
    const Data = this.state.data;
    // console.log(Data.total/1024/1024);
    const dd = Data.total/1024/1024
    //console.log(Data);
    return(
      <>
      {this.state.isLoaded ? 
    <Loding /> :
           <div className="circle">
                {dd} GB
           </div>
      }
      </>
    )
  }
}