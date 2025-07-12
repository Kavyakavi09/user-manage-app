// src/components/Users/UserTable.tsx

import React, { useEffect, useMemo, useState } from 'react';
import { Table, Button, Input, Avatar, Popconfirm, Space, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { deleteUser, fetchUsers, createUser, updateUser } from '../../redux/slices/userSlice';
import UserModal from './UserModal';
import { User } from '../../types/user';
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  AppstoreOutlined,
  TableOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import UserCard from './UserCard';

const UserTable: React.FC = () => {
  const dispatch = useDispatch<any>();
  const {  users, loading, total, perPage  } = useSelector((state: RootState) => state.users);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setModalVisible(true);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser(id));
  };

  const handleCreate = () => {
    setEditingUser(null);
    setModalVisible(true);
  };

  const handleModalSubmit = (data: User) => {
    if (editingUser && editingUser.id !== undefined) {
  dispatch(updateUser({ ...editingUser, ...data }));
} else {
    console.log('Creating new user:', data);
      dispatch(createUser(data));
    }
  };

  const filteredUsers = users?.filter(
    (user:User) =>
      user?.first_name?.toLowerCase()?.includes(search?.toLowerCase()) ||
      user?.last_name?.toLowerCase()?.includes(search?.toLowerCase())
  );

    const paginatedUsers = useMemo(() => {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  return filteredUsers.slice(start, end);
}, [filteredUsers, currentPage, perPage]);

  const columns = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (url: string) => <Avatar src={url} />,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: User) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id!)}
          >
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Users</h2>

      <div className="flex justify-between items-center my-4">
        <div className="flex gap-2 items-center">
              <Button
          type="default"
          icon={
            <TableOutlined
              style={{ color: viewMode === 'table' ? '#1890ff' : 'inherit' }}
            />
          }
          style={{
            color: viewMode === 'table' ? '#1890ff' : 'inherit',
            borderColor: viewMode === 'table' ? '#1890ff' : undefined,
          }}
          onClick={() => setViewMode('table')}
        >
          Table
        </Button>

      <Button
        type="default"
        icon={
          <AppstoreOutlined
            style={{ color: viewMode === 'card' ? '#1890ff' : 'inherit' }}
          />
        }
        style={{
          color: viewMode === 'card' ? '#1890ff' : 'inherit',
          borderColor: viewMode === 'card' ? '#1890ff' : undefined,
        }}
        onClick={() => setViewMode('card')}
      >
        Card
    </Button>

        </div>

        <div className="flex gap-2 items-center">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            allowClear
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Create User
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Table
        columns={columns}
        dataSource={paginatedUsers}
        loading={loading}
        rowKey="id"
        pagination={{
            pageSize: perPage,
            total: filteredUsers.length,
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
        }}
       />

      ) : (
        <UserCard users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <UserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
        initialData={editingUser}
      />
    </div>
  );
};

export default UserTable;
