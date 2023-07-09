import "./farmer-detail-page.style.scss";
import farmerDetailBackground from "../../assets/backgrounds/farmer-detail-background.png";
import blockButton from "../../assets/icons/block-user.png";
import unblockButton from "../../assets/icons/un-block-user.png";
import { Colors } from "../../constants";
import { TransactionDetail } from "../components/transaction-detail";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { CategoryColors } from "../../constants/category-colors.constants";

import { width } from "@mui/system";
import { I18n } from "../../translation";
import { useLocation } from "react-router-dom";
import { FarmerDetailService } from "../../services/farmer-detail.service";
import {
  Fruit,
  GetFarmerDetailResponse,
} from "../../models/farmer-detail.model";
import { useEffect, useState } from "react";
import { LegendLabel } from "../components/pie-chart";

const line_data = [
  {
    id: "japan",
    data: [
      {
        x: "January",
        y: 275,
      },
      {
        x: "February",
        y: 261,
      },
      {
        x: "March",
        y: 267,
      },
      {
        x: "April",
        y: 105,
      },
      {
        x: "May",
        y: 91,
      },
      {
        x: "June",
        y: 16,
      },
      {
        x: "July",
        y: 184,
      },
      {
        x: "August",
        y: 50,
      },
      {
        x: "September",
        y: 520,
      },
      {
        x: "October",
        y: 120,
      },
      {
        x: "November",
        y: 230,
      },
      {
        x: "December",
        y: 270,
      },
    ],
  },
];

const pieDate = [
  {
    id: "apple",
    value: 122,
    color: CategoryColors.Apple,
  },
  {
    id: "Banana",
    value: 90,
    color: CategoryColors.Banana,
  },
  {
    id: "beetroot",
    value: 147,
    color: CategoryColors.Beetroot,
  },
  {
    id: "mango",
    value: 199,
    color: CategoryColors.Mango,
  },
  {
    id: "raddish",
    value: 250,
    color: CategoryColors.Raddish,
  },
  {
    id: "orange",
    value: 350,
    color: CategoryColors.Orange,
  },
];

export const FarmerDetailPage = () => {
  const location = useLocation();
  const farmerDetailService = new FarmerDetailService();

  const stateData = location?.state?.data;

  const [data, setData] = useState<GetFarmerDetailResponse | null>(null);
  const [showProducts, setShowProducts] = useState<boolean>(true);
  const [showTransactions, setShowTransactions] = useState<boolean>(true);
  const [showStatistics, setShowStatistics] = useState<boolean>(true);

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

  const onClickLabelParent = (label: string) => {
    switch (label) {
      case "Products":
        toggleTrueFalse(showProducts, setShowProducts);
        break;
      case "Transactions":
        toggleTrueFalse(showTransactions, setShowTransactions);
        break;
      case "Statistics":
        toggleTrueFalse(showStatistics, setShowStatistics);
        break;
      default:
        break;
    }
  };

  const getData = async () => {
    const request = await farmerDetailService.getFarmerDetail(
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
      <div className="farmer-detail-page">
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
            <div className="farmer-info">
              <div className="image">
                <div className="image-container">
                  <img alt="" src={data?.user?.avatar} />
                </div>
                <img
                  alt=""
                  src={farmerDetailBackground}
                  className="image-background"
                />
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
                    data?.user?.location?.ward?.district?.province?.name}
                </div>
                <div className="label small">{data?.user?.email}</div>
              </div>
            </div>

            <div className="content">
              <div
                className="label parent"
                onClick={() => onClickLabelParent("Products")}
              >
                {I18n.products}
              </div>
              {showProducts ? (
                <div className="product-cards-container">
                  {data?.fruitList?.map((fruit) => (
                    <ProductCard value={fruit} />
                  ))}
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="content">
              <div
                className="label parent"
                onClick={() => onClickLabelParent("Transactions")}
              >
                {I18n.transactions}
              </div>
              {showTransactions ? (
                <>
                  <div className="label child">{I18n.completed}</div>
                  <div className="transaction-content">
                    {data?.historyList?.map((history) => (
                      <TransactionDetail
                        isCompleted={true}
                        value={history}
                        isFarmer={true}
                      />
                    ))}
                  </div>

                  <div className="label child">{I18n.inWaiting}</div>
                  <div className="transaction-content">
                    {data?.orderList?.map((order) => (
                      <TransactionDetail value={order} isFarmer={true} />
                    ))}
                    ;
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>

            <div className="content">
              <div
                className="label parent"
                onClick={() => onClickLabelParent("Statistics")}
              >
                {I18n.statistics}
              </div>
              {showStatistics ? (
                <>
                  <div className="label child">{I18n.revenue}</div>
                  <div className="line-chart">
                    <ResponsiveLine
                      data={line_data}
                      margin={{ top: 10, right: 40, bottom: 40, left: 40 }}
                      yScale={{
                        type: "linear",
                        min: "auto",
                        max: "auto",
                        stacked: true,
                        reverse: false,
                      }}
                      yFormat=" >-.2f"
                      axisTop={null}
                      enableGridX={false}
                      enableGridY={false}
                      axisRight={null}
                      colors={{ scheme: "yellow_green" }}
                      axisLeft={{
                        tickSize: 10,
                        tickPadding: 5,
                        tickRotation: 0,
                        tickValues: 4,
                        renderTick(props) {
                          return (
                            <g
                              transform={`translate(0,${props?.y})`}
                              style={{ opacity: 1 }}
                            >
                              <text
                                dominant-baseline="central"
                                text-anchor="end"
                                transform="translate(-15,0) rotate(0)"
                                style={{
                                  fontFamily: "Intrepid",
                                  fontSize: "11px",
                                  fill: Colors.Solitaire,
                                }}
                              >
                                {props?.value}
                              </text>
                            </g>
                          );
                        },
                      }}
                      pointSize={0}
                      pointColor={{ theme: "background" }}
                      pointBorderWidth={1}
                      pointLabelYOffset={-12}
                      enableArea={true}
                      areaOpacity={0.8}
                      useMesh={true}
                      axisBottom={{
                        tickSize: 10,
                        tickPadding: 5,
                        tickRotation: 0,
                        tickValues: 4,
                        renderTick(props) {
                          return (
                            <g
                              transform={`translate(${props?.x},0)`}
                              style={{ opacity: 1 }}
                            >
                              <text
                                dominant-baseline="text-before-edge"
                                text-anchor="middle"
                                transform="translate(0,15) rotate(0)"
                                style={{
                                  fontFamily: "Intrepid",
                                  fontSize: "11px",
                                  fill: Colors.Solitaire,
                                }}
                              >
                                {props?.value}
                              </text>
                            </g>
                          );
                        },
                      }}
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
            {showStatistics ? (
              <>
                <div className="content">
                  <div className="label child">{I18n.products}</div>
                  <div className="pie-charts">
                    <div className="charts">
                      <ResponsivePie
                        data={pieDate}
                        margin={{ right: 10, left: 10 }}
                        startAngle={-180}
                        innerRadius={0.3}
                        padAngle={0.7}
                        cornerRadius={3}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{
                          from: "color",
                          modifiers: [["darker", 0.2]],
                        }}
                        arcLinkLabelsSkipAngle={10}
                        arcLinkLabelsTextColor="none"
                        arcLinkLabelsThickness={0}
                        arcLinkLabelsColor={{ from: "none" }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                          from: "color",
                          modifiers: [["darker", 40]],
                        }}
                      />
                    </div>

                    <div className="legends">
                      <LegendLabel />
                      <LegendLabel />
                      <LegendLabel />
                      <LegendLabel />
                      <LegendLabel />
                    </div>

                    <div className="rank-container">
                      <div className="label">{I18n.topProducts}</div>
                      <TopProduct rank={1} name={"Cam"} />
                      <TopProduct rank={1} name={"Cam"} />
                      <TopProduct rank={1} name={"Cam"} />

                      <div className="label">{I18n.recentProducts}</div>
                      <TopProduct rank={1} name={"Cam"} />
                      <TopProduct rank={1} name={"Cam"} />
                      <TopProduct rank={1} name={"Cam"} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </>
  );
};

interface ProductCardProps {
  value: Fruit;
  style?: string;
}

export const ProductCard = (props: ProductCardProps) => {
  return (
    <>
      <div className={props?.style ? props?.style : "product-card"}>
        <div className={"info"}>
          <div className="info-container">
            <div className="label big">{props?.value?.name}</div>
            <div className="label small">
              {props?.value?.weight + " " + props?.value?.unit} -{" "}
              {props?.value?.date}
            </div>
            <div className="label small">{props?.value?.description}</div>
          </div>
        </div>
        <div className="image">
          <img
            alt=""
            src={props?.value?.images[0]?.url}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

const TopProduct = (props?: { rank?: number; name?: string }) => {
  return (
    <>
      <div className="top-product">
        <div className="rank">{props?.rank}</div>

        <div className="product-name">{props?.name}</div>
      </div>
    </>
  );
};
