import React from "react";
import "./app.css";
import Routes from "./router";
import { Provider } from "react-redux";
import { store, persistor } from "./app/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./provider/AuthProvider";
import GlobalMessage from "./component/common/GlobalMessage";


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Cargando...</div>} persistor={persistor}>
        <AuthProvider>
          <GlobalMessage />
          <Routes />
        </AuthProvider>
        <ToastContainer position="top-right" autoClose={4000} />
      </PersistGate>
    </Provider>
  );
};

export default App;
