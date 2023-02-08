import React from 'react'
import './topbar.css'
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useLocation } from 'react-router-dom';
import Cloud from './cloud.png'
import Erroricon from './error';
import Modals from '../main/server_err/modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Topbar() {
    const current = decodeURI(window.location.href);
    const server = current.split('/')[4];
    console.log(server);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    var servers;
    if (server != null) {
        servers =
            <>
                {
                    <div>서버 : {server}</div>
                }
            </>
    }
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <div className="cloud">
                        <img src={Cloud} width='180' height='100' alt='cloud' />
                    </div>
                    <div className="text">
                        <span className="logo"><Link to="/" style={{ textDecoration: "none", color: "white" }}>Dashboard</Link></span>
                    </div>
                </div>
                <div className="topRight">

                    {servers}
                    <div className="icons" onClick={handleOpen}>
                        <Erroricon />
                    </div>

                </div>
            </div>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Modals setOpen={setOpen} />
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}