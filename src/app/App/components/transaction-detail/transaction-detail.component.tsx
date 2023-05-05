import { Colors } from "../../../constants";
import { I18n } from "../../../translation";
import "./transaction-detail.style.scss";

interface TransactionDetailProps {
  isCompleted?: boolean;
}

export const TransactionDetail = (props?: TransactionDetailProps) => {
  return (
    <div
      className="transaction-detail"
      style={{
        background: props?.isCompleted ? Colors.Finlandia : Colors.SpanishGreen,
      }}
    >
      <TransactionProperty width={15} title={I18n.ID} value={"12"} />
      <TransactionProperty width={20} title={I18n.product} value={"Cam sành"} />
      <TransactionProperty
        width={20}
        title={"Farmer"}
        value={"Khoa tran store"}
      />
      <TransactionProperty width={15} title={I18n.weight} value={"12 KG"} />
      <TransactionProperty width={15} title={I18n.date} value={"12-10-2023"} />
      <TransactionProperty width={15} title={I18n.price} value={"23.000vnd"} />
    </div>
  );
};

interface TransactionPropertyProps {
  width?: number;
  title?: string;
  value?: any;
}

const TransactionProperty = (props?: TransactionPropertyProps) => {
  return (
    <div
      className="transaction-property"
      style={{
        width: props?.width?.toString() + "%",
      }}
    >
      <div className="title">{props?.title}</div>
      <div className="value">{props?.value}</div>
    </div>
  );
};
