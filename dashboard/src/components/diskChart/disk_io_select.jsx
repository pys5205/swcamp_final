import React from "react";
import Chart from "react-apexcharts";
import Loding from '../main/loding'

export default class disk_io_select extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      iodata: []
    };
  }

componentDidMount(){
  const current = decodeURI(window.location.href);
  const server = current.split('/')[4];
  const name = "testtest";
      fetch("/disk/io/name", { 
      method: "post", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        'system' : server,
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
            iodata: json
          })
        }
      });
}
  render() {
    const test = null;
    const handleChange = (event) => {
      // console.log(event.target.value);
      const current = decodeURI(window.location.href);
      const server = current.split('/')[4];
      let selectName = event.target.value;
      console.log(selectName);
              fetch("/disk/io_count", { 
              method: "post", //통신방법
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                'ioName' : selectName,
                'system' : server
              }
                ),
            })
            .then((res) => res.json())
            .then((json) => {
                if (json === undefined) {
                  alert("오류");
                } else {
                  this.setState({
                    isLoaded: true,
                    data: json
                  })
                }
              });
    }

    const Data = this.state.data;
    const Name = this.state.iodata;
    const content = this.state.iodata.map((iodata) => (
      <option value={iodata.disk_io_name} name={iodata.disk_io_name}>{iodata.disk_io_name}</option>
    ));

   //  console.log(Data);
    return(
      <div>
        <select onChange={handleChange} id="diskname" defaultValue={Name[0]}>
          <option value = "nvme0n1p1" selected>test</option>
          {content}
        </select>
      </div>
    )
  }
}