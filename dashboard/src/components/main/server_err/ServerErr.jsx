import React, { useState } from 'react'
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import { red } from '@mui/material/colors';
import Modalcomp from './modalcomp';
import './serverErr.css'
import Loding from '../loding';
export default class servererror extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoaded: true
    };
  }
  componentDidMount() {
    const interval = setInterval(async () => {
      fetch("/server/error", {
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
              isLoaded: false,
              data: json
            })
          }
        });
    }, 10000);
    return () => clearInterval(interval);
  }
  render() {
    const Data = this.state.data;
    // console.log(Data.cnt_system);

    return (
      <>
      <div>
        <div className="servererr">
        {this.state.isLoaded ?
        <Loding /> :
          <div className="count">
            {Data.cnt_system} EA
            <div className="server">
              <p>Error</p>
            </div>
          </div>
        }
          <div className="icon">
            <NewReleasesOutlinedIcon sx={{ color: red[500], fontSize: 70 }} />
          </div>
        </div>
        <div className="button">
          <Modalcomp />
        </div>
      </div>
      </>
    )
  }
}