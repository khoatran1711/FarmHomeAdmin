import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useRootSelector } from "../../domain";
import { AuthenticationSelectors, checkToken } from "../../state";
import { PageRoute } from "../constants/page.constant";
import { AuthenticationService } from "../services/authentication.service";

import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { MerchantPage } from "./MerchantPage";

export const navigationRef = React.createRef<HTMLDivElement>();

export let navigation: any = "";

export const Browser = () => {
  const dispatch = useDispatch<any>();
  const nav = useNavigate();
  navigation = nav;

  useEffect(() => {
    dispatch(checkToken());
  }, []);

  return (
    <div ref={navigationRef}>
      <Routes>
        <Route path={PageRoute.LoginPage} Component={LoginPage} />
        <Route path={PageRoute.AboutPage} Component={AboutPage} />
        <Route path={PageRoute.HomePage} Component={HomePage} />
        <Route path={PageRoute.MerchantPage} Component={MerchantPage} />
      </Routes>
    </div>
  );
};

export const AboutPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const authenService = new AuthenticationService();
  const token = useRootSelector(AuthenticationSelectors.tokenSelector);

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.tsx</code> and save to reload {token} .
          </p>
          <a>
            {" "}
            Learn React {username} {password}
          </a>
          <br />
          <input onChange={(e) => setUsername(e.target.value)} />
          <br />
          <input onChange={(e) => setPassword(e.target.value)} />

          <button
            type="button"
            onClick={() => {
              authenService.LogIn(username, password);
            }}
          >
            Login
          </button>
        </header>
      </div>
    </div>
  );
};
