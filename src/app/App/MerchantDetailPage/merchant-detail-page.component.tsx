import { Colors } from "../../constants";
import loginBackground from "../../assets/backgrounds/login-background.png";
import blockButton from "../../assets/icons/block-user.png";
import "./merchant-detail-page.style.scss";
import { TransactionDetail } from "../components/transaction-detail/transaction-detail.component";
import { I18n } from "../../translation";

export const MerchantDetailPage = () => {
  return (
    <>
      <div className="merchant-detail">
        <div className="right-button">
          <img
            alt=""
            src={blockButton}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="merchant-info">
          <div className="image">
            <div className="image-border"></div>
            <div className="image-container">
              <img
                alt=""
                src={
                  "https://thuthuatnhanh.com/wp-content/uploads/2022/06/hinh-anh-ma-cute.jpg"
                }
              />
            </div>
          </div>

          <div className="info">
            <div className="label big">#28 - TRAN DANG KHOA</div>

            <div className="label small">{I18n.inActive}</div>
            <div className="label small">17-11-2001</div>
            <div className="label small">0908851760</div>
            <div className="label small">
              666 Lac Long Quan Phuong 9 quan Tan Binh
            </div>
            <div className="label small">19110145@gmail.com</div>
          </div>
        </div>

        <div className="content">
          <div className="label parent">{I18n.transactions}</div>

          <div className="label child">{I18n.completed}</div>
          <div className="transaction-content">
            <TransactionDetail isCompleted={true} />
            <TransactionDetail isCompleted={true} />
            <TransactionDetail isCompleted={true} />
            <TransactionDetail isCompleted={true} />
            <TransactionDetail isCompleted={true} />
          </div>

          <div className="label child">{I18n.inWaiting}</div>
          <div className="transaction-content">
            <TransactionDetail />
            <TransactionDetail />
            <TransactionDetail />
            <TransactionDetail />
            <TransactionDetail />
          </div>
        </div>
      </div>
    </>
  );
};
