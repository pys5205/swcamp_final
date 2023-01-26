import React from "react";

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
        'name' : name,
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
    // console.log(this.state.data);
    // let navigate = useNavigate();
    const handleChange = (event) => {
        // alert(event.target.value);
        // navigate(`/list/${Data.system}/${event.target.value}`)
        // this.setState({
        //   [event.target.name]: event.target.value,
        // })
    }

    const content = this.state.iodata.map((iodata) => (
      <option value={iodata.disk_io_name} name={iodata.disk_io_name}>{iodata.disk_io_name}</option>
    ));

   //  console.log(Data);
    return(
      <select onChange={handleChange} id="diskname">

        {content}
      </select>
    )
  }
}