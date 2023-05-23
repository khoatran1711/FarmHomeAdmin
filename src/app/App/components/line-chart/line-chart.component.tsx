import { ResponsiveLine } from "@nivo/line";
import { Colors } from "../../../constants";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { TotalLabel } from "../total-label";
import { CategoryColors } from "../../../constants/category-colors.constants";
import { LineChartData } from "../../../models/chart.model";

interface LineChartProps {
  data: LineChartData[];
}

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

export const LineChart = (props: LineChartProps) => {
  return (
    <div className="line-chart">
      <TotalLabel viewDetail={true} />
      <ResponsiveLine
        data={props.data}
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
              <g transform={`translate(0,${props?.y})`} style={{ opacity: 1 }}>
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
        pointBorderWidth={2}
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
              <g transform={`translate(${props?.x},0)`} style={{ opacity: 1 }}>
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
  );
};

export const LineChartPopUp = () => {
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

          <div className="date-info">
            <div className="label">To:</div>
            <div className="label">{range?.to && format(range.to, "PPP")}</div>
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
        <div className="chart-table-container line-chart">
          <div className="chart-table-container line-chart container">
            <div className="chart-table-container line-chart chart">
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
                pointBorderWidth={2}
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
