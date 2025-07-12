import axios from 'axios';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

const apiClient = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'x-api-key': 'reqres-free-v1',
  },
});

export const fetchAllUsers = async () => {
  const page1 = await apiClient.get('/users?page=1');
  const page2 = await apiClient.get('/users?page=2');
  return {
    users: [...page1.data.data, ...page2.data.data],
    total: page1.data.total,       // 12
    per_page: page1.data.per_page, // 6
  };
};

export const fetchUsers = (page:number) => apiClient.get(`/users?page=${page}`);
export const createUser = (user: Omit<User, 'id'>) => apiClient.post('/users', user);
export const updateUser = (id: number, user: User) => apiClient.put(`/users/${id}`, user);
export const deleteUser = (id: number) => apiClient.patch(`/users/${id}`);
export const login = (payload: { email: string; password: string }) => apiClient.post('/login', payload);
