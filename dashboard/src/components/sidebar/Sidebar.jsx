import React from 'react'
import './sidebar.css'
import { Link } from "react-router-dom";
import BusinessIcon from '@mui/icons-material/Business';
import StorageIcon from '@mui/icons-material/Storage';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
export default function sidebar() {
    return(
    <div className="sidebar">
        <div className="sidebarWrapper">
            <div className="sidebarMenu">
                <h3 className="sidebarTitle">Dashboard</h3>
                <ul className="sidebarList">
                    <li className="sidebarListItem active">
                        <BusinessIcon className="sidebarIcon" />
                        <Link to="/">home</Link>
                    </li>
                    <li className="sidebarListItem">
                        <StorageIcon className="sidebarIcon" />
                        <Link to="/serverlist">serverlist</Link>
                    </li>
                    <li className="sidebarListItem">
                        <AddToPhotosIcon className="sidebarIcon" />
                        serverAdd
                    </li>
                    
                </ul>
            </div>
        </div>
                
    </div>
     )
}