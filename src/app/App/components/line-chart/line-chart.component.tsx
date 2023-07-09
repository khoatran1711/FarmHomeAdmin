import { ResponsiveLine } from "@nivo/line";
import { Colors } from "../../../constants";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { TotalLabel } from "../total-label";
import { LineChartData } from "../../../models/chart.model";
import { ChartService } from "../../../services/chart.service";
import "./line-chart.style.scss";

interface LineChartProps {
  data: LineChartData[];
  total: number;
}

const theme = {
  tooltip: {
    container: {
      background: "#fff", // Change the background color of the tooltip
      color: "#000", // Change the text color of the tooltip
      border: "1px solid #333", // Change the border color of the tooltip
    },
  },
};

export const LineChart = (props: LineChartProps) => {
  return (
    <div className="line-chart">
      <TotalLabel viewDetail={true} total={props?.total} />
      <ResponsiveLine
        data={props?.data}
        theme={theme}
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
        colors={Colors.Solitaire}
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
        enableArea={false}
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
  const chartService = new ChartService();
  const previous14Day = new Date();
  previous14Day.setDate(previous14Day.getDate() - 14);

  const [data, setData] = useState<LineChartData[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: previous14Day,
    to: new Date(),
  });

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
    const request = await chartService.statisticProductByDateRange(
      startDate,
      endDate
    );
    const line = request?.data?.data;
    setTotal(request?.data?.summary);

    const dateData: any = [];
    line?.map((item) => {
      const date = new Date(item?.date);
      const data = {
        date: item?.date,
        x: date.getDate().toString() + "-" + (date.getMonth() + 1).toString(),
        y: item?.total,
      };
      dateData.push(data);
    });
    const lineData: LineChartData[] = [{ id: "test", data: dateData }];

    setData(lineData);
  };

  const getData = async () => {
    const startDate = getCurrentDateMinus(14);
    const endDate = getCurrentDateMinus(0);

    console.log(startDate);
    await callAPI(startDate, endDate);
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
    <div className="linechartpopup">
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
        <div className="chart-table-container line-chart">
          <div className="chart-table-container line-chart container">
            <div className="chart-table-container line-chart chart">
              <ResponsiveLine
                data={data}
                theme={theme}
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
                colors={Colors.Solitaire}
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
                enableArea={false}
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
                <th>Date</th>
                <th>Total</th>
              </tr>
              {data[0]?.data?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.x}</td>
                    <td>{item?.y}</td>
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
