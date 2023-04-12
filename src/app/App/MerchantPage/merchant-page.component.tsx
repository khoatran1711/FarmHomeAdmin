import { TableRow } from "../components/table-row";
import "./merchant-page.style.scss";
import { TableRowTitle } from "../../constants/table-row.constant";

const header = [
    {
        title: TableRowTitle.id
    },
    {
        title: TableRowTitle.avatar
    },
    {
        title: TableRowTitle.name
    },
    {
        title: TableRowTitle.phone
    },
    {
        title: TableRowTitle.email
    },
]

const bodyrow = [
    {
        content: "1"
    },
    {
        imageUrl: "https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/weapons/key_of_khajnisut.png?strip=all&quality=100&w=92"
    },
    {
        content: "Khoa ga"
    },
    {
        content: "0981684684"
    },
    {
        content: "khoaga@gmail.com"
    }
]

const bodyrow2 = [
    {
        content: "2"
    },
    {
        imageUrl: "https://i2.wp.com/gi-builds.sfo3.digitaloceanspaces.com/weapons/key_of_khajnisut.png?strip=all&quality=100&w=92"
    },
    {
        content: "Khoa ga 2"
    },
    {
        content: "098168faf"
    },
    {
        content: "khoaga2@gmail.com"
    }
]

const body = [
    {
        bodyRow: bodyrow,
    },
    {
        bodyRow: bodyrow2,
    },
]

export const MerchantPage = () => {
    return (
        <div className="merchant-page">
            <div className="page-container">
                <TableRow header={header} body={body} />
            </div>
        </div>
    );
};