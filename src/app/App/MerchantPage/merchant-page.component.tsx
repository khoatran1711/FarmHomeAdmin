import { TableRow } from "../components/table-row";
import "./merchant-page.style.scss";

export const MerchantPage = () => {
    return (
        <div className="merchant-page">
            <div className="page-container">
                <TableRow id="ID" name="Name" isHeading={true} />
                <TableRow id="1" name="VA" />
            </div>
        </div>
    );
};