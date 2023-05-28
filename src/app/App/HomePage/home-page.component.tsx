import { CategoryColors } from "../../constants/category-colors.constants";
import "./home-page.style.scss";
import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { MenuBar } from "../components/menu-bar";
import { PieChart } from "../components/pie-chart";
import { LineChart } from "../components/line-chart";
import { ChartService } from "../../services/chart.service";
import { StatItem } from "../components/stats-item";

export const HomePage = () => {
  const chartService = new ChartService();

  const [farmerData, setFarmerData] = useState<[]>([]);
  const [farmerColor, setFarmerColor] = useState<[]>([]);
  const [merchantData, setMerchantData] = useState<[]>([]);
  const [merchantColor, setMerchantColor] = useState<[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [statisticDateDataMonth, setStatisticDateDataMonth] = useState<[]>([]);
  const [linechartTotal, setLinechartTotal] = useState<number>(0);

  function getRandomHexColor(value: number) {
    const seed = value % 1307; // Limit the seed to a smaller range
    const random = Math.abs(Math.sin(seed) * 16777215); // Generate a random number between 0 and 16777215 (0xFFFFFF)
    const hexColor = "#" + Math.floor(random).toString(16).padStart(6, "0"); // Convert the random number to hexadecimal format

    return hexColor;
  }

  const getData = async () => {
    const request = await chartService.statisticUser();
    const responseData = request?.data;

    setTotal(responseData?.summary);

    const farmer = responseData.farmer;
    const farmerPieData: any = [];
    const farmerColors: any = [];
    farmer.map((item) => {
      const data = {
        id: item?.lastName + " " + item?.firstName,
        value: item?.total,
      };
      farmerColors.push(getRandomHexColor(item?.total));
      farmerPieData.push(data);
    });
    setFarmerColor(farmerColors);
    setFarmerData(farmerPieData);

    const merchant = responseData?.merchant;
    const merchantPieData: any = [];
    const merchantColors: any = [];
    merchant.map((item) => {
      const data = {
        id: item?.lastName + " " + item?.firstName,
        value: item?.total,
        color: "#000000",
      };
      merchantColors.push(getRandomHexColor(item?.total));
      merchantPieData.push(data);
    });
    setMerchantColor(merchantColors);
    setMerchantData(merchantPieData);

    const requestLinechartMonth = await chartService.statisticDate(7);
    const responseDataLinechartMonth = requestLinechartMonth?.data;
    const dateData: any = [];
    responseDataLinechartMonth?.data?.map((item) => {
      const date = new Date(item?.date);
      const data = {
        date: item?.date,
        x: date.getDate().toString() + "-" + (date.getMonth() + 1).toString(),
        y: item?.total,
      };
      dateData.push(data);
    });
    setStatisticDateDataMonth(dateData);
    setLinechartTotal(responseDataLinechartMonth?.summary);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="home-page">
        <div className="page-container">
          <section className="left-content">
            <div className="label">FARMHOME</div>
            <MenuBar />
          </section>
        </div>
        <div className="statistic">
          <div className="title big">Statistic</div>

          <div className="title medium">Today: {Date()?.toLocaleString()}</div>
          {farmerData != null && (
            <div className="charts-display">
              <section className="charts">
                <PieChart
                  data={farmerData}
                  total={total}
                  colors={farmerColor}
                />
                <PieChart
                  data={merchantData}
                  total={total}
                  colors={merchantColor}
                />
              </section>

              <section className="charts">
                {statisticDateDataMonth?.length > 0 && (
                  <LineChart
                    data={[{ id: "test", data: statisticDateDataMonth }]}
                    total={linechartTotal}
                  />
                )}
                <div className="stats-items">
                  <StatItem />
                  <StatItem />
                  <StatItem />
                  <StatItem />
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const line_data = [
  {
    id: "japan",
    color: CategoryColors.Mango,
    data: [
      {
        x: 21,
        y: 275,
      },
      {
        x: 23,
        y: 261,
      },
      {
        x: 1,
        y: 267,
      },
      {
        x: 8,
        y: 105,
      },
      {
        x: 5,
        y: 91,
      },
      {
        x: 3,
        y: 16,
      },
      {
        x: 11,
        y: 184,
      },
      {
        x: 15,
        y: 50,
      },
    ],
  },
];

const pieDate = [
  {
    id: "apple",
    value: 12502,
    color: CategoryColors.Apple,
  },
  {
    id: "Banana",
    value: 15254,
    color: CategoryColors.Banana,
  },
];
