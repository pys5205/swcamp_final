import ReactDOM from "react-dom";
import React, { Component } from "react";


export default class disk_io_select extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iodata: []
    };
  }

  componentDidMount() {
    fetch("/disk/io/name", {
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
            iodata: json
          })
        }
      });
  }

  render() {
    // console.log(this.state.data);
    const Data = this.state.iodata;

    const handleChange = (event) => {
      alert(event.target.value);
    }

    const content = this.state.iodata.map((iodata) => (
      <option value={iodata.disk_io_name} name={iodata.disk_io_name}>{iodata.disk_io_name}</option>
    ));

    //  console.log(Data);
    return (
      <select onChange={handleChange}>
        {content}
      </select>
    )
  }
}