import React from 'react';

const Header = props => {
    return (
      <div className="header">
        <h1 className="logo" onClick={props.handleLogoClick}>JAMBUDDY</h1>
        {props.currentUser ? (
          <div className="greeting">
            <p>Logged in as {props.currentUser.username}</p>
            <span className="messages-link" role="img" onClick={props.handleGetMessages}>✉️</span>
            <button className="edit-profile-btn header-btn" onClick={props.handleEditProfile}>Edit Profile</button>
            <button className="logout-btn header-btn" onClick={props.handleLogout}>Log out</button>
          </div>
        ) : <p className="greeting">Please log in or <a href="#" onClick={props.renderRegister}>&nbsp;register&nbsp;</a> a new account</p>}
      </div>
    )
  }

  export default Header;
