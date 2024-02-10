import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
const { userId } = useParams();
const [user, setUser] = useState(null);
useEffect(() => {
  fetch(`https://dummyjson.com/users/${userId}`)
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => console.error('Error fetching user details:', error));
}, [userId]);

if (!user) {
    return <div>Loading...</div>;
}
console.log('user',user)
return (
    <div className="user-details text-center">
      <h1 className='mb-3'>User Details</h1>
      <div>
        <img src={user?.image} alt="avatar" />
      </div>
      <div className='mt-4 user-content'>
        <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Address:</strong> {user.address.street}, {user.address.suite}, {user.address.city}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
      </div>
    
    </div>
  );
}

export default UserDetails;

