import React from 'react'
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import { red } from '@mui/material/colors';
import { Button } from "@material-ui/core";
import './serverErr.css'
export default class servererror extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){

  fetch("/list/os", { 
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
                     data : json
                    })
                  }
      });
  }
  render() {
    const Data = this.state.data;
    console.log(Data.count_os);
    return(
      <div>
        <div className="servererr">
                <div className="count">
                    {Data.count_os} EA 
                    <div className="server">
                        <p>Error</p>
                    </div>
                </div>
                <div className="icon">
                    <NewReleasesOutlinedIcon sx={{ color:red[500], fontSize: 70 }}  />
                </div>
        </div>
          <div className="button">
            <Button variant="contained" color="secondary">
            Error server
            </Button>
          </div>
        </div>
    )

  }
}