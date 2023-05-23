import { Colors } from "../../../constants";
import { Value } from "../../../models/merchant-detail.model";
import { I18n } from "../../../translation";
import "./transaction-detail.style.scss";

interface TransactionDetailProps {
  isCompleted?: boolean;
  value?: Value;
  isFarmer?: boolean;
}

export const TransactionDetail = (props?: TransactionDetailProps) => {
  return (
    <div
      className="transaction-detail"
      style={{
        background: props?.isCompleted ? Colors.Finlandia : Colors.SpanishGreen,
      }}
    >
      <TransactionProperty
        width={15}
        title={I18n.ID}
        value={props?.value?.id}
      />
      <TransactionProperty
        width={20}
        title={I18n.product}
        value={props?.value?.fruit?.name}
      />
      {props?.isFarmer ? (
        <TransactionProperty
          width={20}
          title={I18n.merchant}
          value={
            props?.value?.merchant?.lastName +
            " " +
            props?.value?.merchant?.firstName
          }
        />
      ) : (
        <TransactionProperty
          width={20}
          title={I18n.farmer}
          value={
            props?.value?.farmer?.lastName +
            " " +
            props?.value?.farmer?.firstName
          }
        />
      )}
      <TransactionProperty
        width={15}
        title={I18n.weight}
        value={props?.value?.amount + " Kg"}
      />
      <TransactionProperty
        width={15}
        title={I18n.date}
        value={props?.value?.date}
      />
      <TransactionProperty
        width={15}
        title={I18n.price}
        value={props?.value?.price + ".000 vnd"}
      />
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
