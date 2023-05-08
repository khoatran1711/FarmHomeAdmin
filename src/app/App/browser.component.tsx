import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useRootSelector } from "../../domain";
import { AuthenticationSelectors, checkToken } from "../../state";
import { PageRoute } from "../constants/page.constant";
import { AuthenticationService } from "../services/authentication.service";
import { CategoryPage } from "./CategoryPage";
import { FarmerDetailPage } from "./FarmerDetailPage";
import { HomePage } from "./HomePage";
import { LoginPage } from "./LoginPage";
import { MerchantDetailPage } from "./MerchantDetailPage";
import { MerchantPage } from "./MerchantPage";
import { ReportsPage } from "./ReportsPage";
import { NewsPage } from "./NewsPage";

export const navigationRef = React.createRef<HTMLDivElement>();

export let navigation: any = "";

export const Browser = () => {
  const dispatch = useDispatch<any>();
  const nav = useNavigate();
  navigation = nav;

  useEffect(() => {
    dispatch(checkToken(0));
  }, []);

  return (
    <div ref={navigationRef}>
      <Routes>
        <Route path={PageRoute.LoginPage} Component={LoginPage} />
        <Route path={PageRoute.HomePage} Component={HomePage} />
        <Route path={PageRoute.MerchantPage} Component={MerchantPage} />
        <Route
          path={PageRoute.MerchantDetailPage}
          Component={MerchantDetailPage}
        />
        <Route path={PageRoute.FarmerDetailPage} Component={FarmerDetailPage} />
        <Route path={PageRoute.ReportsPage} Component={ReportsPage} />
        <Route path={PageRoute.CategoryPage} Component={CategoryPage} />
        <Route path={PageRoute.NewsPage} Component={NewsPage} />
      </Routes>
    </div>
  );
};
