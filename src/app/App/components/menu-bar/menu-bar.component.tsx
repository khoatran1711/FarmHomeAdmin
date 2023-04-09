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
                <li>{MenuBarTitle.Statistics}</li>
                <li>{MenuBarTitle.Merchants}</li>
                <li>{MenuBarTitle.Farmers}</li>
                <li>{MenuBarTitle.News}</li>
                <li>{MenuBarTitle.Category}</li>
                <li>{MenuBarTitle.Reports}</li>
                <li>{MenuBarTitle.Notification}</li>
                <li>{MenuBarTitle.Coupons}</li>
                <li>{MenuBarTitle.Logout}</li>
            </ul>
        </div>
    );
};