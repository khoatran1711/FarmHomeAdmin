import Popup from "reactjs-popup";
import { Colors } from "../../../constants";
import totalIncomeIcon from "../../../assets/icons/total-income-icon.png";
import { LineChartPopUp } from "../line-chart";
import { PieChartPopUp } from "../pie-chart";
import { I18n } from "../../../translation";

interface TotalLabelProps {
  viewDetail?: boolean;
  isPie?: boolean;
  total?: number;
  isFarmer?: boolean;
}

export const TotalLabel = (props?: TotalLabelProps) => {
  return (
    <div
      style={
        props?.viewDetail
          ? {
              display: "flex",
              marginTop: 10,
              marginLeft: 10,
            }
          : {
              display: "flex",
              marginTop: 40,
              marginRight: 40,
              marginBottom: 40,
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
            }
      }
    >
      <img
        src={totalIncomeIcon}
        style={{ width: 20, height: 20, marginRight: 10 }}
      />
      <div
        style={{ color: Colors.Solitaire, fontSize: "1.3vw", display: "flex" }}
      >
        {I18n.total + ": " + props?.total?.toLocaleString() + ",000 vnd"}
        {props?.viewDetail && (
          <Popup
            modal
            overlayStyle={{ background: "#00000095" }}
            trigger={
              <button
                style={{
                  background: "none",
                  outline: "inherit",
                  marginLeft: 10,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    color: Colors.Solitaire,
                    fontSize: "0.8vw",
                    alignSelf: "flex-end",
                  }}
                >
                  Detail
                </div>
              </button>
            }
            position="top left"
          >
            <div
              style={{
                margin: "auto",
                background: Colors.TimberGreen,
                width: "80vw",
                height: "80vh",
                padding: "5px",
                overflowX: "hidden",
                overflowY: "scroll",
                top: 0,
                left: 0,
              }}
            >
              {props?.isPie ? (
                <PieChartPopUp isFarmer={props?.isFarmer} />
              ) : (
                <LineChartPopUp />
              )}
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};
