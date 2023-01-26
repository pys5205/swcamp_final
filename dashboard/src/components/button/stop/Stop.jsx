import React from 'react'
import Button from '@mui/material/Button';

export default class stop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
   handleclick = () => {
    fetch("/stop", { 
        method: "get", //통신방법
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
                    // console.log(json);
                      this.setState({
                        isLoaded: true,
                       data : json
                      })
                  }
        });
      return;
   };
  render() {
    const Data = this.state.data;
    return(
        <Button variant="outlined" onClick ={this.handleclick} color="error">stop</Button>
    )
  }
}