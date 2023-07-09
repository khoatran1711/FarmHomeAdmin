import blockButton from "../../assets/icons/block-user.png";
import unblockButton from "../../assets/icons/un-block-user.png";
import "./merchant-detail-page.style.scss";
import { TransactionDetail } from "../components/transaction-detail/transaction-detail.component";
import { I18n } from "../../translation";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MerchantDetailService } from "../../services/merchant-detail.service";
import { GetMerchantDetailResponse } from "../../models/merchant-detail.model";
import { FarmerDetailService } from "../../services/farmer-detail.service";

export const MerchantDetailPage = () => {
  const location = useLocation();
  const merchantDetailService = new MerchantDetailService();
  const farmerDetailService = new FarmerDetailService();

  const stateData = location?.state?.data;

  const [data, setData] = useState<GetMerchantDetailResponse | null>(null);
  const [showTransactions, setShowTransactions] = useState<boolean>(true);

  const changeUserStatus = async () => {
    const shouldChange = window.confirm(
      "Are you sure you want to block/unblock this user?"
    );
    if (shouldChange) {
      const request = await farmerDetailService.changeUserStatus(
        data?.user ? data?.user?.username : "",
        "Testing"
      );
      const responseData = request?.data;
      request?.data?.success
        ? window.location.reload()
        : console.log(responseData);
    }
  };

  const toggleTrueFalse = (
    value: boolean,
    callback: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (value === true) {
      callback(false);
      return;
    }
    callback(true);
  };

  const onClickLabelParent = () => {
    toggleTrueFalse(showTransactions, setShowTransactions);
  };

  const getData = async () => {
    const request = await merchantDetailService.getMerchantDetail(
      parseInt(stateData?.bodyRow[0]?.content)
    );
    const responseData = request?.data;
    setData(responseData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="merchant-detail">
        {data !== null && (
          <>
            <div className="right-button">
              <img
                alt=""
                src={data?.user?.status?.id == 1 ? blockButton : unblockButton}
                style={{ width: "100%", height: "100%" }}
                onClick={changeUserStatus}
              />
            </div>
            <div className="merchant-info">
              <div className="image">
                <div className="image-border"></div>
                <div className="image-container">
                  <img alt="" src={data?.user?.avatar} />
                </div>
              </div>

              <div className="info">
                <div className="label big">
                  #{data?.user?.id} -{" "}
                  {data?.user?.lastName + " " + data?.user?.firstName}
                </div>

                <div className="label small">{data?.user?.status?.name}</div>
                <div className="label small">{data?.user?.birthDay}</div>
                <div className="label small">{data?.user?.phone}</div>
                <div className="label small">
                  {data?.user?.location?.address +
                    ", " +
                    data?.user?.location?.ward?.name +
                    ", " +
                    data?.user?.location?.ward?.district?.name +
                    ", " +
                    data?.user?.location?.ward?.district?.province?.name}{" "}
                </div>
                <div className="label small">{data?.user?.email}</div>
              </div>
            </div>

            <div className="content">
              <div
                className="label parent"
                onClick={() => onClickLabelParent()}
              >
                {I18n.transactions}
              </div>
              {showTransactions ? (
                <>
                  <div className="label child">{I18n.completed}</div>
                  <div className="transaction-content">
                    {data?.historyList?.map((history) => (
                      <TransactionDetail isCompleted={true} value={history} />
                    ))}
                  </div>

                  <div className="label child">{I18n.inWaiting}</div>
                  <div className="transaction-content">
                    {data?.orderList?.map((order) => (
                      <TransactionDetail value={order} />
                    ))}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
