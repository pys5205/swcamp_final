import React from 'react'
import './topbar.css'
import { Link } from "react-router-dom";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import { useLocation } from 'react-router-dom';
import Cloud from './cloud.png'
import Erroricon from './error';

export default function Topbar() {
    const location = useLocation();
        return (
            <div className="topbar">
                <div className="topbarWrapper">
                    <div className="topLeft">
                        <div className="cloud">
                        <img src={Cloud}  width='180'height='90'  alt='cloud' />
                        </div>
                        <div className="text">
                        <span className="logo"><Link to ="/" style={{ textDecoration: "none",color:"white" }}>Dashboard</Link></span>
                        </div>
                    </div>
                    <div className="topRight">
                    {(location.pathname).substr(6)}
                        <div className="icons">
                            <Erroricon />
                        </div>
                        
                    </div>
                </div>
            </div>
            )
}