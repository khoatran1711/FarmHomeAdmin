import { LoadingButton } from "@mui/lab";
import { ResponsivePie } from "@nivo/pie";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import { Colors } from "../../../constants";
import { TotalLabel } from "../total-label";
import { CategoryColors } from "../../../constants/category-colors.constants";
import { PieChartData } from "../../../models/chart.model";

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
}

export const PieChart = (props: PieChartProps) => {
  return (
    <div className="pie-chart">
      <TotalLabel viewDetail={true} isPie={true} total={props?.total} />
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

export const PieChartPopUp = () => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();

  const data = [
    { name: "Anom", age: 19, gender: "Male" },
    { name: "Megha", age: 19, gender: "Female" },
    { name: "Subham", age: 25, gender: "Male" },
    { name: "Subham", age: 25, gender: "Male" },
    { name: "Subham", age: 25, gender: "Male" },
    { name: "Subham", age: 25, gender: "Male" },
    { name: "Subham", age: 25, gender: "Male" },
    { name: "Subham", age: 25, gender: "Male" },
    { name: "Subham", age: 25, gender: "Male" },
    { name: "Subham", age: 25, gender: "Male" },
    { name: "Subham", age: 25, gender: "Mal12222e" },
    { name: "Subham", age: 25, gender: "Mal12222e" },
    { name: "Subham", age: 25, gender: "Mal12222e" },
    { name: "Subham", age: 25, gender: "Mal12222e" },
    { name: "Subham", age: 25, gender: "Mal12222e" },
    { name: "Subham", age: 25, gender: "Mal12222e" },
    { name: "Subham", age: 25, gender: "Male" },
    { name: "Subham", age: 25, gender: "Mal12222e" },
    { name: "Subham", age: 25, gender: "Mal12222e" },
    { name: "Subham", age: 25, gender: "Mal12222e1" },
  ];

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
    <>
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
            onClick={() => console.log("aa")}
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
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LegendLabel />
            <LegendLabel />
            <LegendLabel />
            <LegendLabel />
            <LegendLabel />
            <LegendLabel />
            <LegendLabel />
            <LegendLabel />
          </div>
        </div>

        <div>
          <div className="table-container">
            <table>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
              {data.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val.name}</td>
                    <td>{val.age}</td>
                    <td>{val.gender}</td>
                  </tr>
                );
              })}
            </table>
          </div>
          <TotalLabel />
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
          defaultMonth={new Date(2022, 8)}
          mode="range"
          max={6}
          selected={range}
          onSelect={setRange}
          footer={footer}
        />
      )}
    </>
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
