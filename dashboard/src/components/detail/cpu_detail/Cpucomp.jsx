import React from 'react'
import Cpucha from './Cpucha.jsx'

export default class Cpucomp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const current = decodeURI(window.location.href);
    const server = current.split('/')[4];
    console.log(server);
    const interval = setInterval(async () => {
      fetch("/server", {
        method: "post", //통신방법
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          'system': server
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
              data: json
              
            })
            // console.log(json);
          }
        });
    }, 2000);
    return () => clearInterval(interval);
  }
  render() {
    console.log(this.state.data);
    return (
            <Cpucha data={this.state.data}> </Cpucha>
        );
  }
}