import React from 'react'
import './css/header.css'
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AppsIcon from '@mui/icons-material/Apps';
import { Avatar } from '@mui/material';
function Header({photoURL}) {
  return (
    <div className="header"> 
        <div className='header_logo'>
            <img src="data:image/png;base64,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" alt='logo' height={40}/>
            <span>Google Drive</span>
        </div>
        <div className='header_search'>
            <SearchIcon />
            <input type='text' placeholder='Search in Drive'></input>
            <FormatAlignCenterIcon />
        </div>
        <div className='header_icons'>
            <span>
                <HelpOutlineIcon />
                <SettingsIcon />
            </span>
            <span>
                <AppsIcon />
                <Avatar src={photoURL}/>
            </span>
        </div>
    </div>
  )
}

export default Header