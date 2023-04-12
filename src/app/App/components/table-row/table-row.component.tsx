import "./table-row.style.scss";

interface TableRowProps {
    id?: string;
    imageurl?: string;
    name?: string;
    phone?: string;
    email?: string;
    isHeading?: boolean;
}

export const TableRow = (props?: TableRowProps) => {
    return (
        <table>
            {props?.isHeading ? <thead>
                <tr>
                    <th>{props.id}</th>
                    <th>{props.imageurl}</th>
                    <th>{props.name}</th>
                    <th>{props.phone}</th>
                    <th>{props.email}</th>
                </tr>
            </thead> :
                <tbody>
                    <tr>
                        <th>{props?.id}</th>
                        <th>{props?.imageurl}</th>
                        <th>{props?.name}</th>
                        <th>{props?.phone}</th>
                        <th>{props?.email}</th>
                    </tr>
                </tbody>}
        </table>
    );
};