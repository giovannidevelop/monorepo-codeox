import React from 'react';
import './app.css';
import Routes from "./router/index";
import { Provider } from 'react-redux';
import {store, persistor} from './app/redux/store';
import { PersistGate } from "redux-persist/integration/react";
import AuthProvider, { useAuth } from "./provider/AuthProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GlobalMessage = () => {
    const { authMessage } = useAuth();

    if (!authMessage) return null;

    return (
        <div className="fixed top-4 right-4 bg-opacity-90 text-white p-3 rounded shadow-lg z-50 
        ${authMessage.type === 'error' ? 'bg-red-500' : 
          authMessage.type === 'success' ? 'bg-green-500' : 
          authMessage.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'}"
        >
            {authMessage.text}
        </div>
    );
};

const App = () => {

    return (
        <Provider store={store}>
               <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
            <GlobalMessage />
                    <Routes />
            </AuthProvider>
            <ToastContainer />
            </PersistGate>
        </Provider>
    );
}
export default App;