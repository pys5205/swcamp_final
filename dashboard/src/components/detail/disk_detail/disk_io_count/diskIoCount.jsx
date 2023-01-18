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
  const server = current.split('/')[4];
    const interval = setInterval(async () => {
      fetch("/disk/io_count", { 
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
    // console.log(Data.ts_create);
    return(
          <div className="mixed-chart">
            <Chart
             type="line"
             height="275"
            series={ [
                { name: "io읽기",
                  data: Data.read_count,
                },
                { name: "io쓰기",
                  data: Data.write_count,
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
                  range:5
                }
            }}
            />
          </div>
    )
  }
}