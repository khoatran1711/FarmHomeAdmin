import "./menu-bar.style.scss";
import React from 'react';

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
                <li>Statistics</li>
                <li>Merchants</li>
                <li>Farmers</li>
                <li>News</li>
                <li>Category</li>
                <li>Reports</li>
                <li>Notification</li>
                <li>Coupons</li>
                <li>Logout</li>
            </ul>
        </div>
    );
};