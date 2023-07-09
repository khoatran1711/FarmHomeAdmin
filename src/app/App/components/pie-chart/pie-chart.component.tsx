import { LoadingButton } from "@mui/lab";
import { ResponsivePie } from "@nivo/pie";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { Colors } from "../../../constants";
import { TotalLabel } from "../total-label";
import { CategoryColors } from "../../../constants/category-colors.constants";
import {
  PieChartData,
  StatisticUserResponse,
} from "../../../models/chart.model";
import { ChartService } from "../../../services/chart.service";
import { HttpResult } from "../../../../services";
import "./pie-chart.style.scss";

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

interface PieChartProps {
  data: PieChartData[];
  total: number;
  colors: [];
  isFarmer: boolean;
}

export const PieChart = (props: PieChartProps) => {
  return (
    <div className="pie-chart">
      <TotalLabel
        viewDetail={true}
        isPie={true}
        total={props?.total}
        isFarmer={props?.isFarmer}
      />
      <div className="pie-chart container">
        <div className="pie-chart chart">
          <ResponsivePie
            data={props?.data}
            colors={props?.colors}
            margin={{ right: 10, left: 10 }}
            startAngle={0}
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

        <div>
          {props?.data?.map((item, index) => (
            <LegendLabel label={item?.id} color={props?.colors[index]} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PieChartPopUpProps {
  isFarmer?: Boolean;
}

export const PieChartPopUp = (props: PieChartPopUpProps) => {
  const chartService = new ChartService();
  const previous14Day = new Date();
  previous14Day.setDate(previous14Day.getDate() - 14);

  const [data, setData] = useState<PieChartData[]>([]);
  const [color, setColor] = useState<[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: previous14Day,
    to: new Date(),
  });

  function getRandomHexColor(value: number) {
    const seed = value % 1307; // Limit the seed to a smaller range
    const random = Math.abs(Math.sin(seed) * 16777215); // Generate a random number between 0 and 16777215 (0xFFFFFF)
    const hexColor = "#" + Math.floor(random).toString(16).padStart(6, "0"); // Convert the random number to hexadecimal format

    return hexColor;
  }

  const getCurrentDateMinus = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const convertToDateFormat = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onFindClick = () => {
    const endDate = range?.to
      ? convertToDateFormat(range?.to)
      : getCurrentDateMinus(0);
    const startDate = range?.from
      ? convertToDateFormat(range?.from)
      : getCurrentDateMinus(7);

    callAPI(startDate, endDate);
  };

  const callAPI = async (startDate: string, endDate: string) => {
    let request: HttpResult<StatisticUserResponse>;

    if (props?.isFarmer) {
      request = await chartService.statisticFarmerByDate(startDate, endDate);
    } else {
      request = await chartService.statisticMerchantByDate(startDate, endDate);
    }

    const user = request?.data?.data;

    setTotal(request?.data?.summary);

    const pieData: any = [];
    const colors: any = [];
    user?.map((item) => {
      const data = {
        id: item?.lastName + " " + item?.firstName,
        value: item?.total,
      };
      colors.push(getRandomHexColor(item?.total));
      pieData.push(data);
    });
    setColor(colors);
    setData(pieData);
  };

  const getData = () => {
    const startDate = getCurrentDateMinus(14);
    const endDate = getCurrentDateMinus(0);

    callAPI(startDate, endDate);
  };

  useEffect(() => {
    getData();
  }, []);

  let footer = (
    <LoadingButton
      loading={false}
      size="medium"
      variant="contained"
      className="pie-chart-popup button apply"
      onClick={() => setIsShowDatePicker(!isShowDatePicker)}
    >
      Apply
    </LoadingButton>
  );

  return (
    <div className="piechartpopup">
      <div
        className="date-pick"
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div className="date-label" style={{ width: "80%", display: "flex" }}>
          <div className="date-info">
            <div className="label">From:</div>
            <div className="label">
              {range?.from && format(range.from, "PPP")}
            </div>
          </div>

          <div
            className="date-info"
            style={{
              width: "50%",
              height: "100%",
              borderLeft: "1px solid " + Colors.Solitaire,
              paddingLeft: 10,
            }}
          >
            <div>To:</div>
            <div>{range?.to && format(range.to, "PPP")}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <LoadingButton
            loading={false}
            size="medium"
            variant="contained"
            disabled={range?.from && range?.to ? false : true}
            className="pie-chart-popup button find"
            onClick={() => onFindClick()}
          >
            Find
          </LoadingButton>

          <LoadingButton
            loading={false}
            size="medium"
            variant="contained"
            className="pie-chart-popup button find"
            onClick={() => setIsShowDatePicker(!isShowDatePicker)}
          >
            Choose Date
          </LoadingButton>
        </div>
      </div>

      <div className="chart-table-container">
        <div
          className="chart-table-container pie-chart"
          style={{ display: "flex" }}
        >
          <div className="chart-table-container pie-chart container">
            <div className="chart-table-container pie-chart chart">
              <ResponsivePie
                data={data}
                colors={color}
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
            <div>
              {data?.map((item, index) => (
                <LegendLabel label={item?.id} color={color[index]} />
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          ></div>
        </div>

        <div>
          <div className="table-container">
            <table>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
              {data?.map((item, index) => {
                return (
                  <tr key={"key"}>
                    <td>{item?.id}</td>
                    <td>{item?.value}</td>
                  </tr>
                );
              })}
            </table>
          </div>
          <TotalLabel total={total} />
        </div>
      </div>

      {isShowDatePicker && (
        <DayPicker
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            background: Colors.Solitaire,
          }}
          defaultMonth={new Date(2023, 6)}
          mode="range"
          max={30}
          selected={range}
          onSelect={setRange}
          footer={footer}
        />
      )}
    </div>
  );
};

interface LegendLabelProps {
  label?: string;
  color?: string;
}

export const LegendLabel = (props: LegendLabelProps) => {
  return (
    <div className="legend-container">
      <div className="legend-point" style={{ background: props?.color }} />
      <div className="legend-label">{props?.label}</div>
    </div>
  );
};
