import React, { useState } from 'react';
import { Card, Avatar, Button, Row, Col, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { User } from '../../types/user';
import './UserCard.css'; // import the CSS below

interface UserCardProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ users, onEdit, onDelete }) => {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  return (
    <Row gutter={[16, 16]}>
      {users.map((user) => (
        <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
          <div
            className={`user-card-wrapper ${hoveredCardId === user.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCardId(user.id)}
            onMouseLeave={() => setHoveredCardId(null)}
          >
            <Card bordered={true} className="user-card">
              <Avatar src={user.avatar} size={80} className="user-avatar" />
              <h3 className="user-name">{`${user.first_name} ${user.last_name}`}</h3>
              <p className="user-email">{user.email}</p>
            </Card>

            {hoveredCardId === user.id && (
              <div className="overlay">
                <div className="action-buttons">
                  <Button
                    shape="circle"
                    icon={<EditOutlined />}
                    className="edit-btn"
                    onClick={() => onEdit(user)}
                  />
                  <Popconfirm
                    title="Are you sure to delete this user?"
                    onConfirm={() => onDelete(user.id!)}
                  >
                    <Button
                      shape="circle"
                      icon={<DeleteOutlined />}
                      className="delete-btn"
                    />
                  </Popconfirm>
                </div>
              </div>
            )}
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default UserCard;
