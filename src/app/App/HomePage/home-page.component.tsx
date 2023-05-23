import { CategoryColors } from "../../constants/category-colors.constants";
import "./home-page.style.scss";
import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { MenuBar } from "../components/menu-bar";
import { PieChart } from "../components/pie-chart";
import { LineChart } from "../components/line-chart";
import { ChartService } from "../../services/chart.service";

export const HomePage = () => {
  const chartService = new ChartService();

  const [farmerData, setFarmerData] = useState<[]>([]);
  const [farmerColor, setFarmerColor] = useState<[]>([]);
  const [merchantData, setMerchantData] = useState<[]>([]);
  const [merchantColor, setMerchantColor] = useState<[]>([]);
  const [total, setTotal] = useState<number>(0);

  const getColor = (value: number) => {
    const max = 120;
    const valueAsMax = value / max;
    const valueFromMaxRgbInt = Math.floor(16600000 * valueAsMax);

    const blue = Math.floor(valueFromMaxRgbInt % 256);
    const green = Math.floor((valueFromMaxRgbInt / 256) % 256);
    const red = Math.floor((valueFromMaxRgbInt / 256 / 256) % 256);

    const toHex = (c: number): string => {
      const hex: string = c.toString(16).padStart(2, "0");
      return hex.length === 1 ? "0" + hex : hex;
    };

    return "#" + toHex(red) + toHex(green) + toHex(blue);
  };

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
            <>
              <section className="charts">
                <PieChart
                  data={farmerData}
                  total={total}
                  colors={farmerColor}
                />
                <LineChart data={line_data} />
                <LineChart data={line_data} />
              </section>

              <section className="charts">
                <PieChart
                  data={merchantData}
                  total={total}
                  colors={merchantColor}
                />
                <LineChart data={line_data} />
                <LineChart data={line_data} />
              </section>
            </>
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
        x: "plane",
        y: 275,
      },
      {
        x: "helicopter",
        y: 261,
      },
      {
        x: "boat",
        y: 267,
      },
      {
        x: "train",
        y: 105,
      },
      {
        x: "subway",
        y: 91,
      },
      {
        x: "bus",
        y: 16,
      },
      {
        x: "car",
        y: 184,
      },
      {
        x: "discord",
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
