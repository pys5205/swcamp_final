import React from 'react'
import Chart from "react-apexcharts";


export default class diskiocount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){
   const current = decodeURI(window.location.href);
   // console.log(current.split('/')[4])
   const system = current.split('/')[4];
  fetch("/disk/io_count", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        'system' : system
      }),
    })
      .then((res) => res.json())
      .then((json) => {
       if (json === undefined) {
                    alert("오류");
                  } else {
                  //////////////////////////////////여기부터보자
                    this.setState({
                      isLoaded: true,
                     data : json
                     
                    })
                    // console.log(json);
                  }
      });
  }
  render() {
    // console.log(this.state.data);
    const Data = this.state.data;
    //console.log(Data);
    return(
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
             type="line"
            series={ [
                { name: "io읽기",
                  data: Data.read_count,
                },
                { name: "io쓰기",
                  data: Data.write_count,
                },
                ]} 
            options={{    
                chart : {
                    height: 300,
                    width: 300,                    
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
                type: "datetime",
                  categories: Data.ts_create
                }
            }}
            />
          </div>
        </div>
      </div>
    )
  }
}