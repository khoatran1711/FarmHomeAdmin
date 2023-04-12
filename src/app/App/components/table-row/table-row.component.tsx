import "./table-row.style.scss";

interface Body {
    bodyRow?: BodyRow[];
}

interface BodyRow {
    content?: string;
    imageUrl?: string;
}

interface HeaderRow {
    title?: string;
}

interface TableRowProps {
    header?: HeaderRow[];
    body?: Body[];
}

export const TableRow = (props: TableRowProps) => {
    return (
        <table>
            <thead>
                {props?.header?.map(header => (
                    <td>
                        {header?.title}
                    </td>
                ))}
            </thead>
            <tbody>
                {props?.body?.map(bodyrow => 
                    <tr>
                        {bodyrow?.bodyRow?.map(bodyCell => (
                            <td>
                                {bodyCell?.content ? bodyCell?.content : <img src={bodyCell.imageUrl}/>}
                            </td>
                        ))}
                    </tr>)}
            </tbody>
        </table>
    );
};