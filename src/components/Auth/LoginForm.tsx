import { Button, Form, Input, Typography } from 'antd';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { loginUser } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

const { Title } = Typography;

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { token, loading } = useAppSelector((state:RootState) => state.auth);

  const onFinish = (values: { email: string; password: string }) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (token) {
      navigate('/users');
    }
  }, [token, navigate]);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <Title level={3} style={{ textAlign: 'center' }}>
        Login
      </Title>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email' },
          ]}
        >
          <Input placeholder="eve.holt@reqres.in" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password placeholder="cityslicka" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
