import React from 'react'
import Chart from "react-apexcharts";
import './diskPart.css'

export default class diskpart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
componentDidMount(){
  const current = decodeURI(window.location.href);
  const server = current.split('/')[4];
    const interval = setInterval(async () => {
      fetch("/memory", { 
      method: "post", //통신방법
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
    }, 2000);
    return () => clearInterval(interval);
}
  render() {
    // console.log(this.state.data);
    const Data = this.state.data;
    const test = Data.server_memory;
    // console.log(test);
    return(
      <div className="app">
        <div className="row">
          <div className="donut">
            <Chart
             type="pie"
             height="250"
              series={test } 
            options={{
                labels: ['사용중', '빈공간', '버퍼', '캐시']
            }}
            />
          </div>
        </div>
      </div>
    )
  }
}