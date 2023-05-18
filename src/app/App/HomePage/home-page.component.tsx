import { Line, ResponsiveLine } from "@nivo/line";
import { ResponsivePie } from "@nivo/pie";
import { Colors } from "../../constants";
import { CategoryColors } from "../../constants/category-colors.constants";
import "./home-page.style.scss";
import totalIncomeIcon from "../../assets/icons/total-income-icon.png";
import Popup from "reactjs-popup";
import { padding } from "@mui/system";
import { DateRange, DayPicker } from "react-day-picker";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import { LoadingButton } from "@mui/lab";
import { MenuBar } from "../components/menu-bar";
import { useRootSelector } from "../../../domain";
import { AuthenticationSelectors } from "../../../state";
import { StatisticData } from "../../models/statistic.model";
import { StatisticService } from "../../services/statistic.service";
import { DateStringAPIToString } from "../../utilities/format.utilities";

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

export const HomePage = () => {
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

          <section className="charts">
            <PieChart
              startDate={new Date("2023-04-19")}
              endDate={new Date("2023-04-19")}
            />
            <LineChart
              startDate={new Date("2023-04-19")}
              endDate={new Date("2023-04-21")}
            />
            <LineChart
              startDate={new Date("2023-04-19")}
              endDate={new Date("2023-04-21")}
            />
          </section>

          <section className="charts">
            <PieChart startDate={new Date("2023-04-19")} endDate={new Date()} />
            <LineChart
              startDate={new Date("2023-04-19")}
              endDate={new Date("2023-05-09")}
            />
            <LineChart
              startDate={new Date("2023-04-19")}
              endDate={new Date("2023-05-09")}
            />
          </section>
        </div>
      </div>
    </>
  );
};

export const LegendLabel = () => {
  return (
    <div className="legend-container">
      <div className="legend-point" style={{ background: "blue" }} />

      <div className="legend-label">Carrots</div>
    </div>
  );
};

interface TotalLabelProps {
  viewDetail?: boolean;
  total?: number;
  startDate?: Date;
  endDate?: Date;
  isPie?: boolean;
}

const TotalLabel = (props?: TotalLabelProps) => {
  return (
    <div
      style={
        props?.viewDetail
          ? {
              display: "flex",
              marginTop: 10,
              marginLeft: 10,
            }
          : {
              display: "flex",
              marginTop: 40,
              marginRight: 40,
              marginBottom: 40,
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "row",
            }
      }
    >
      <img
        alt=""
        src={totalIncomeIcon}
        style={{ width: 20, height: 20, marginRight: 10 }}
      />
      <div
        style={{ color: Colors.Solitaire, fontSize: "1.3vw", display: "flex" }}
      >
        Total: {props?.total} vnd
        {props?.viewDetail && (
          <Popup
            modal
            overlayStyle={{ background: "#00000095" }}
            trigger={
              <button
                style={{
                  background: "none",
                  outline: "inherit",
                  marginLeft: 10,
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                  padding: 0,
                }}
              >
                <div
                  style={{
                    color: Colors.Solitaire,
                    fontSize: "0.8vw",
                    alignSelf: "flex-end",
                  }}
                >
                  Xem chi tiết
                </div>
              </button>
            }
            position="top left"
          >
            <div
              style={{
                margin: "auto",
                background: Colors.TimberGreen,
                width: "80vw",
                height: "80vh",
                padding: "5px",
                overflowX: "hidden",
                overflowY: "scroll",
                top: 0,
                left: 0,
              }}
            >
              {props?.isPie ? (
                <PieChartPopUp
                  startDate={props?.startDate}
                  endDate={props?.endDate}
                />
              ) : (
                <LineChartPopUp
                  startDate={props?.startDate}
                  endDate={props?.endDate}
                />
              )}
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

const PieChart = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const [data, setData] = useState<StatisticData[] | null>(null);
  const [total, setTotal] = useState<number>(0);

  const statisticService = new StatisticService();
  const getData = async (startDate: Date, endDate: Date) => {
    const response = await statisticService.getPieChart(startDate, endDate);
    const data = response?.data;
    setData(data?.data);
    setTotal(data?.summary);
  };

  useEffect(() => {
    getData(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="pie-chart">
      <TotalLabel
        viewDetail={true}
        total={total}
        startDate={startDate}
        endDate={endDate}
        isPie={true}
      />
      {data && (
        <div className="pie-chart container">
          <div className="pie-chart chart">
            <ResponsivePie
              data={data?.map((e) => {
                return {
                  id: e?.name,
                  value: e?.total,
                };
              })}
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
      )}
    </div>
  );
};

const LineChart = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  const [data, setData] = useState<StatisticData[] | null>(null);
  const [total, setTotal] = useState<number>(0);

  const statisticService = new StatisticService();
  const getData = async (startDate: Date, endDate: Date) => {
    const response = await statisticService.getLineChart(startDate, endDate);
    const data = response?.data;
    setData(data?.data);
    setTotal(data?.summary);
  };

  useEffect(() => {
    getData(startDate, endDate);
  }, [startDate, endDate]);

  return (
    <div className="line-chart">
      <TotalLabel
        viewDetail={true}
        total={total}
        startDate={startDate}
        endDate={endDate}
      />
      {data && (
        <ResponsiveLine
          data={[
            {
              id: "piechart",
              data: data?.map((e) => {
                return {
                  x: DateStringAPIToString(e?.date),
                  y: e?.total,
                };
              }),
            },
          ]}
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
            tickPadding: 0,
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
                  style={{ opacity: 1, zIndex: 10 }}
                >
                  <text
                    dominant-baseline="text-before-edge"
                    text-anchor="middle"
                    transform="translate(0,10) rotate(0)"
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
      )}
    </div>
  );
};

export const PieChartPopUp = ({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate?: Date;
}) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  });

  // const data = [
  //   { name: "Anom", age: 19, gender: "Male" },
  //   { name: "Megha", age: 19, gender: "Female" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e1" },
  // ];

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

  const [data, setData] = useState<StatisticData[] | null>(null);
  const [total, setTotal] = useState<number>(0);

  const statisticService = new StatisticService();
  const getData = async (startDate?: Date, endDate?: Date) => {
    if (!startDate || !endDate) return;
    const response = await statisticService.getPieChart(startDate, endDate);
    const data = response?.data;
    setData(data?.data);
    setTotal(data?.summary);
  };

  useEffect(() => {
    getData(range?.from, range?.to);
  }, [range]);

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

      {data && (
        <div className="chart-table-container">
          <div
            className="chart-table-container pie-chart"
            style={{ display: "flex" }}
          >
            <div className="chart-table-container pie-chart container">
              <div className="chart-table-container pie-chart chart">
                <ResponsivePie
                  data={data?.map((e) => {
                    return {
                      id: e?.name,
                      value: e?.total,
                    };
                  })}
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
                  <th>Total</th>
                  <th>Percentage</th>
                </tr>
                {data?.map((val, key) => {
                  return (
                    <tr key={key}>
                      <td>{val?.name}</td>
                      <td>{val?.total}</td>
                      <td>{val?.percent}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
            <TotalLabel total={total} />
          </div>
        </div>
      )}

      {isShowDatePicker && (
        <DayPicker
          style={{
            position: "absolute",
            top: 50,
            right: 0,
            background: Colors.Solitaire,
          }}
          defaultMonth={new Date()}
          mode="range"
          max={31}
          selected={range}
          onSelect={setRange}
          footer={footer}
        />
      )}
    </>
  );
};

export const LineChartPopUp = ({
  startDate,
  endDate,
}: {
  startDate?: Date;
  endDate?: Date;
}) => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  });

  const [data, setData] = useState<StatisticData[] | null>(null);
  const [total, setTotal] = useState<number>(0);

  const statisticService = new StatisticService();

  // const data = [
  //   { name: "Anom", age: 19, gender: "Male" },
  //   { name: "Megha", age: 19, gender: "Female" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Male" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e" },
  //   { name: "Subham", age: 25, gender: "Mal12222e1" },
  // ];

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

  const getData = async (startDate?: Date, endDate?: Date) => {
    if (!startDate || !endDate) return;
    const response = await statisticService.getLineChart(startDate, endDate);
    const data = response?.data;
    setData(data?.data);
    setTotal(data?.summary);
  };

  useEffect(() => {
    getData(range?.from, range?.to);
  }, [range]);

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
            {data && (
              <div className="chart-table-container line-chart chart">
                <ResponsiveLine
                  data={[
                    {
                      id: "piechart",
                      data: data?.map((e) => {
                        return {
                          x: DateStringAPIToString(e?.date),
                          y: e?.total,
                        };
                      }),
                    },
                  ]}
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
            )}
          </div>
        </div>

        <div>
          <div className="table-container">
            <table>
              <tr>
                <th>Date</th>
                <th>Total</th>
              </tr>
              {data?.map((val, key) => {
                return (
                  <tr key={key}>
                    <td>{val?.date}</td>
                    <td>{val?.total}</td>
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
          defaultMonth={new Date()}
          mode="range"
          max={31}
          selected={range}
          onSelect={setRange}
          footer={footer}
        />
      )}
    </>
  );
};
