import React from 'react'
import NewReleasesOutlinedIcon from '@mui/icons-material/NewReleasesOutlined';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import './serverErr.css'
import Modal from './modal'
export default class servererror extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isModalOpen: false,
    };
  }
  componentDidMount() {
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
            isLoaded: true,
            data: json
          })
        }
      });
  }
  openModal = () => {
    this.setState({ isModalOpen: true });
  };
  
  closeModal = () => {
    this.setState({ isModalOpen: false });
  };
  
  isModalOpen = (event) => {
    event.target.value = 1;
  }
  isModalClose = (event) => {
    event.target.value = 0;
  }
  
  asdfModal = (event) => {
    if (event.target.value == 1) {
      this.setState({ isModalOpen: true });
    } else {
      this.setState({ isModalOpen: false });
    }
  }
  render() {
    const Data = this.state.data;
    // console.log(Data.cnt_system);
    return (
      <div>
        <div className="servererr">
          <div className="count">
            {Data.cnt_system} EA
            <div className="server">
              <p>Error</p>
            </div>
          </div>
          <div className="icon">
            <NewReleasesOutlinedIcon sx={{ color: red[500], fontSize: 70 }} />
          </div>
        </div>
        <div className="button">
          <Button variant="outlined" color="error" value="1" onClick={this.asdfModal}>
            Error server
          </Button>
          <Modal isOpen={this.state.isModalOpen} value="0" close={this.closeModal} />
        </div>
      </div>
    )
  }
}