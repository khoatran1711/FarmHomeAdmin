import { Link } from "react-router-dom";
import { PageRoute } from "../../../constants";
import { MenuBarTitle } from "../../../constants/menu-bar.constant";
import "./menu-bar.style.scss";

interface MenuBarProps {
  label?: string;
  onChangeText?: (e: any) => void;
  labelClass?: string;
  inputClass?: string;
}

export const MenuBar = (props?: MenuBarProps) => {
  return (
    <div className="menu-bar">
      <ul>
        <li>
          <Link className="link" to={PageRoute.HomePage}>
            {MenuBarTitle.statistics}
          </Link>
        </li>
        <li>
          <Link className="link" to={PageRoute.MerchantPage}>
            {MenuBarTitle.merchants}
          </Link>
        </li>
        <li>
          <Link className="link" to={PageRoute.FarmerDetailPage}>
            {MenuBarTitle.farmers}
          </Link>
        </li>
        <li>
          <Link className="link" to={PageRoute.HomePage}>
            {MenuBarTitle.news}
          </Link>
        </li>
        <li>
          <Link className="link" to={PageRoute.CategoryPage}>
            {MenuBarTitle.category}
          </Link>
        </li>
        <li>
          <Link className="link" to={PageRoute.ReportsPage}>
            {MenuBarTitle.reports}
          </Link>
        </li>
        {/* <li>
          <Link>{MenuBarTitle.notification}</Link>
        </li>
        <li>
          <Link>{MenuBarTitle.coupons}</Link>
        </li> */}
        <li> {MenuBarTitle.logout}</li>
      </ul>
    </div>
  );
};
