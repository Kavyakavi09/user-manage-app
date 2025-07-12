import React from 'react';
import './App.css';
import 'antd/dist/reset.css';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store';
import { appRouter } from './routes/appRoues';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
}

export default App;
