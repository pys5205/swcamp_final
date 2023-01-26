import React from 'react'
import './topbar.css'
import { Link } from "react-router-dom";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
import LanguageIcon from '@mui/icons-material/Language';
import { useLocation } from 'react-router-dom';


export default function Topbar() {
    const location = useLocation();
    
    // console.log((location.pathname).substr(6));
        return (
            <div className="topbar">
                <div className="topbarWrapper">
                    <div className="topLeft">
                        <span className="logo"><Link to ="/" style={{ textDecoration: "none",color:"darkblue" }}>Dashboard</Link></span>
                    </div>
                <div className="topRight">
                system : {(location.pathname).substr(6)}
                 <div className="topbarIconContainer">
                   <NotificationsNoneIcon />
                   <span className="topIconBadge">2</span>
                 </div>
                 
                 <div className="topbarIconContainer">
                   <LanguageIcon />
                   <span className="topIconBadge">2</span>
                 </div>
                 
                 <div className="topbarIconContainer">
                   <SettingsIcon />
                 </div>
                 
                </div>
                
                </div>
            </div>
            )
}