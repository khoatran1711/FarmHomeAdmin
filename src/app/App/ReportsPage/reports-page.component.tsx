import { Colors } from "../../constants";
import { MenuBar } from "../components/menu-bar";
import "./reports-page.style.scss";
import deleteIcon from "../../assets/icons/delete-icon.png";
import { LoadingButton } from "@mui/lab";
import { DayPicker } from "react-day-picker";
import { useEffect, useState } from "react";
import "react-day-picker/dist/style.css";
import { DateToDateString } from "../../utilities/format.utilities";
import { I18n } from "../../translation";
import { ReportService } from "../../services/report.service";
import { Report } from "../../models/report.model";

export const ReportsPage = () => {
  const reportService = new ReportService();

  const [data, setData] = useState<Report[]>([]);
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

  const getData = async () => {
    const response = await reportService.getAllReport();
    setData(response?.data?.contents);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="reports-page">
      <div className="page-container">
        <section className="left-content">
          <div className="label">{I18n.FARMHOME}</div>
          <MenuBar />
        </section>

        <section className="reports">
          <div
            style={{ color: Colors.Solitaire, fontSize: "1.4vw" }}
            className="report-title"
          >
            {I18n.reports}
          </div>
          <div
            style={{ color: Colors.Solitaire, fontSize: "1.4vw" }}
            className="report-title"
          >
            {DateToDateString(date)}
            <LoadingButton
              loading={false}
              size="medium"
              variant="contained"
              className="button-choose"
              onClick={() => setIsShowDatePicker(!isShowDatePicker)}
            >
              {I18n.chooseDate}
            </LoadingButton>
            {isShowDatePicker && (
              <DayPicker
                style={{
                  position: "absolute",
                  top: 80,

                  background: Colors.Solitaire,
                  color: "black",
                  fontSize: "1vw",
                }}
                defaultMonth={date}
                selected={date}
                mode="single"
                onSelect={(e) => {
                  if (e) {
                    setDate(e);
                    setIsShowDatePicker(false);
                  }
                }}
              />
            )}
          </div>
          {data?.map((item) => (
            <>
              <ReportCard report={item} />
            </>
          ))}
        </section>
      </div>
    </div>
  );
};

interface ReportCardProps {
  report: Report;
}

const ReportCard = (props: ReportCardProps) => {
  return (
    <div className="report-card">
      <label htmlFor={`post-${props?.report?.id}`}>
        <div className="report-card-title">
          <p className="title">{props?.report?.title}</p>

          <p className="small-title">{props?.report?.date}</p>
        </div>
      </label>

      <input
        type="checkbox"
        className="read-more-state"
        id={`post-${props?.report?.id}`}
      />

      <div className="read-more-wrap">
        <div className="read-more-target">
          <div className="report-card-content">
            <div className="info">
              <div className="content-info">
                <div className="info-label">{I18n.from}</div>
                <div className="info-content">
                  {props?.report?.merchant?.firstName +
                    " " +
                    props?.report?.merchant?.lastName}
                </div>
              </div>

              <div className="content-info">
                <div className="info-label">{I18n.username}</div>
                <div className="info-content">
                  {props?.report?.merchant?.username}
                </div>
              </div>

              <div className="content-info">
                <div className="info-label">{I18n.to}</div>
                <div className="info-content">
                  {props?.report?.farmer?.firstName +
                    " " +
                    props?.report?.farmer?.lastName}
                </div>
              </div>

              <div className="content-info">
                <div className="info-label">{I18n.username}</div>
                <div className="info-content">
                  {props?.report?.farmer?.username}
                </div>
              </div>
            </div>

            <div className="content">
              <div className="content-label">{I18n.content}</div>

              <div className="content-content">{props?.report?.content}</div>

              <div className="delete-icon">
                <img
                  alt="delete"
                  src={deleteIcon}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
