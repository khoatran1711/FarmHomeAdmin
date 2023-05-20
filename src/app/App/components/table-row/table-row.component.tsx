import "./table-row.style.scss";

interface Body {
  bodyRow?: BodyRow[];
  bodyRow?: BodyRow[];
}

interface BodyRow {
  content?: string;
  imageUrl?: string;
  content?: string;
  imageUrl?: string;
}

interface HeaderRow {
  title?: string;
  title?: string;
}

interface TableRowProps {
  header?: HeaderRow[];
  body?: Body[];
  onClick?: (rowIndex: number) => void;
}

export const TableRow = (props: TableRowProps) => {
  return (
    <table>
      <thead>
        {props?.header?.map((header) => (
          <td>{header?.title}</td>
        ))}
      </thead>
      <tbody>
        {props?.body?.map((bodyrow, index) => (
          <tr key={index} onClick={() => props?.onClick?.(index)}>
            {bodyrow?.bodyRow?.map((bodyCell) => (
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

