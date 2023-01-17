import React from 'react'

export default class detailcpuavg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){
  const current = decodeURI(window.location.href);
  const server = current.split('/')[4];
  
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
                      isLoaded: true,
                     data : json
                    })
                  }
      });
  }
  render() {
    
    // console.log(this.state.data);
    const Data = this.state.data;
    console.log(Data.mem_total);
    //console.log(Data);
    return(
           <div className="circle">
                
           </div>
    )
  }
}