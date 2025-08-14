import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import { BsChatDotsFill } from 'react-icons/bs';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

import './SideBar.css';

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="upperpart">
        <div className="tooltip-wrapper">
          <ChatIcon />
          <span className="tooltip">Chats</span>
        </div>
        <div className="tooltip-wrapper">
          <DataUsageIcon />
          <span className="tooltip">Status</span>
        </div>
        <div className="tooltip-wrapper">
          <BsChatDotsFill />
          <span className="tooltip">Community</span>
        </div>
        <div className="tooltip-wrapper">
          <Groups2OutlinedIcon />
          <span className="tooltip">Groups</span>
        </div>
      </div>

      <div className="lowerpart">
        <div className="tooltip-wrapper">
          <SettingsOutlinedIcon />
          <span className="tooltip">Settings</span>
        </div>
        <div className="tooltip-wrapper">
          <AccountCircleOutlinedIcon />
          <span className="tooltip">Profile</span>
        </div>
      </div>

    </div>
  );
};

export default SideBar;
