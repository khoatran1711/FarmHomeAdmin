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
                <li>{MenuBarTitle.statistics}</li>
                <li>{MenuBarTitle.merchants}</li>
                <li>{MenuBarTitle.farmers}</li>
                <li>{MenuBarTitle.news}</li>
                <li>{MenuBarTitle.category}</li>
                <li>{MenuBarTitle.reports}</li>
                <li>{MenuBarTitle.notification}</li>
                <li>{MenuBarTitle.coupons}</li>
                <li>{MenuBarTitle.logout}</li>
            </ul>
        </div>
    );
};