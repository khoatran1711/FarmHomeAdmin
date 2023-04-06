import React, { useEffect, useRef } from "react";
import { Provider, useDispatch } from "react-redux";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { RootPersistor, RootStore } from "../../domain";
import { useNavigate } from "react-router-dom";
import "./app.style.css";
import { Browser, history } from "./browser.component";

const App = () => {
  return (
    <Provider store={RootStore}>
      <PersistGate persistor={RootPersistor}>
        <BrowserRouter>
          <Browser />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
