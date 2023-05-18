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
    <table className="table" style={{ width: "100%" }}>
      <thead>
        {props?.header?.map((header) => (
          <td>{header?.title}</td>
        ))}
      </thead>
      <tbody>
        {props?.body?.map((e) => (
          <tr>
            {e?.bodyRow?.map((bodyCell) => (
              <td>
                {bodyCell?.content ? (
                  bodyCell?.content
                ) : (
                  <img alt="" src={bodyCell.imageUrl} />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
