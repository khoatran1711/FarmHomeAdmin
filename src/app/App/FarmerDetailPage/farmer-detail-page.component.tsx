import "./farmer-detail-page.style.scss";
import farmerBackground from "../../assets/backgrounds/farmer-detail-background.png";
import blockButton from "../../assets/icons/block-user.png";
import { Colors } from "../../constants";
import { TransactionDetail } from "../components/transaction-detail";
import { ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { CategoryColors } from "../../constants/category-colors.constants";
import { LegendLabel } from "../HomePage";
import { width } from "@mui/system";
import { I18n } from "../../translation";

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
  return (
    <>
      <div className="farmer-detail-page">
        <div className="right-button">
          <img
            alt=""
            src={blockButton}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="farmer-info">
          <div className="image">
            <div className="image-container">
              <img
                alt=""
                src={
                  "https://thuthuatnhanh.com/wp-content/uploads/2022/06/hinh-anh-ma-cute.jpg"
                }
              />
            </div>
            <img alt="" src={farmerBackground} className="image-background" />
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
          <div className="label parent">{I18n.products}</div>
          <div className="product-cards-container">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
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

        <div className="content">
          <div className="label parent">{I18n.statistics}</div>

          <div className="label child">{I18n.renenue}</div>
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
        </div>

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
      </div>
    </>
  );
};

const ProductCard = () => {
  return (
    <>
      <div className="product-card">
        <div className="info">
          <div className="info-container">
            <div className="label big">Cam sành</div>
            <div className="label small">3051 kg - 20-05-2023</div>

            <div className="label small">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias
              ad, repellendus saepe ducimus adipisci sunt exercitationem quidem
              magni aut dolore praesentium atque, ut a quos ab molestias. Nihil,
              dolores aspernatur.
            </div>
          </div>
        </div>
        <div className="image">
          <img
            alt=""
            style={{ width: "100%", height: "100%", background: "blue" }}
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
