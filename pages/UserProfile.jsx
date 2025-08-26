// src/components/UserProfile.jsx
import React from 'react';

const UserProfile = ({ user }) => (
  <div className="user-profile">
    <img src={user.photoURL} alt={user.displayName} className="avatar" />
    <h3>{user.displayName}</h3>
    <p>Role: {user.role}</p>
    <p>Progress: {user.progress}%</p>
  </div>
);

export default UserProfile;
