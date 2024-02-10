import React from 'react';

const UserCard = ({ user }) => {
    
  return (
    <div className="user-card">

      <img src={user?.image} alt="avatar" />
      <div>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
      </div>
    </div>
  );
}

export default UserCard;