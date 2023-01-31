import React from 'react'
import Chart from "react-apexcharts";
import Loding from '../../../main/loding';
export default class netiobytes extends React.Component {
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
      fetch("/network/io_bytes", { 
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
    // console.log(Data);
    return(
      <>
      {this.state.isLoaded ? 
    <Loding /> :
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
             type="line"
             height="250"
            series={ [
                { name: "받기",
                  data: Data.bytes_sent,
                },
                { name: "보내기",
                  data: Data.bytes_recv,
                },
                ]}
            options={{    
                legend: {
                  position:"top",
                  horizontalAlign:"left'"
                },
                 stroke: { //선의 커브를 부드럽게 하고, 두께를 3으로 지정
                    curve: "smooth",
                    width: 1,
                },
                tooltip: {
                  x: {
                    format: "dd/MM/yy HH:mm",
                  },
                },
                grid: { //격자 없앰
                    show:false,
                },
                xaxis: {
                  categories: Data.ts_create,
                  labels: { show: false },
                  range:8,
                },
                yaxis: [
                  {
                    title:{
                      text:"받기"
                    },
                  },{
                    opposite: true,
                    title: {
                      text: "보내기"
                    }
                  }
                ]
            }}
            />
          </div>
        </div>
      </div>
      }
      </>
    )
  }
}