// src/pages/Users.tsx
import React from 'react';
import UserTable from '../components/Users/UserTable';

const Users: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <UserTable />
    </div>
  );
};

export default Users;
