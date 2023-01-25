import React from 'react'
import Button from '@mui/material/Button';

export default class detailcpuwait extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
 componentDidMount(){
  const current = decodeURI(window.location.href);
  const server = current.split('/')[4];

  fetch("/start", { 
      method: "get", //통신방법
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
      }
        ),
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
  }
  render() {
    return(
        <Button variant="outlined" color="error">stop</Button>
    )
  }
}