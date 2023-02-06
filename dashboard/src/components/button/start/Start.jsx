import React from 'react'
import Button from '@mui/material/Button';

export default class start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
   handleclick = () => {
    const current = decodeURI(window.location.href);
    const server = current.split('/')[4];
    window.location.reload();
    fetch("/start", { 
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
      return;
      
   };
  render() {
    return(
        <Button variant="outlined" onClick ={this.handleclick}>start</Button>
    )
  }
}