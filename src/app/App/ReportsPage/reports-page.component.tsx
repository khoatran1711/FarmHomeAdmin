import { Colors } from "../../constants";
import { MenuBar } from "../components/menu-bar";
import "./reports-page.style.scss";
import deleteIcon from "../../assets/icons/delete-icon.png";
import { LoadingButton } from "@mui/lab";
import { DayPicker } from "react-day-picker";
import { useState } from "react";
import "react-day-picker/dist/style.css";
import { DateToDateString } from "../../utilities/format.utilities";
import { I18n } from "../../translation";

export const ReportsPage = () => {
  const [isShowDatePicker, setIsShowDatePicker] = useState(false);
  const [date, setDate] = useState<Date>(new Date());

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
          <ReportCard id={1} />
          <ReportCard id={2} />
        </section>
      </div>
    </div>
  );
};

const ReportCard = ({ id }: { id: number }) => {
  return (
    <div className="report-card">
      <label htmlFor={`post-${id}`}>
        <div className="report-card-title">
          <p className="title">TITLE</p>

          <p className="small-title">24/03/2023 10:30</p>
        </div>
      </label>

      <input type="checkbox" className="read-more-state" id={`post-${id}`} />

      <div className="read-more-wrap">
        <div className="read-more-target">
          <div className="report-card-content">
            <div className="info">
              <div className="content-info">
                <div className="info-label">{I18n.reporter}</div>
                <div className="info-content">ALA AHTA SEIKO</div>
              </div>

              <div className="content-info">
                <div className="info-label">{I18n.phone}</div>
                <div className="info-content">0908851760</div>
              </div>

              <div className="content-info">
                <div className="info-label">{I18n.mail}</div>
                <div className="info-content">test@gmail.com</div>
              </div>
            </div>

            <div className="content">
              <div className="content-label">{I18n.content}</div>

              <div className="content-content">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dolores, tempora vitae? Possimus natus eius maxime culpa
                corporis nisi nam iusto odio velit porro at nostrum quidem nihil
                earum aut, ad neque obcaecati id voluptatibus excepturi
                dignissimos facilis qui? Odit hic recusandae molestias deserunt
                quidem, architecto dicta maxime tempore totam mollitia,
                perspiciatis voluptas suscipit repellat vitae fugiat quae ad
                excepturi nemo. Tempore expedita ipsum explicabo doloribus
                cumque similique nulla laborum. Sint, ducimus! Labore cum cumque
                sapiente suscipit modi tempora excepturi velit dicta laborum
                delectus? Commodi porro ratione nihil iusto tenetur labore atque
                ducimus aspernatur alias obcaecati aut nulla consectetur, quidem
                iste perferendis a perspiciatis earum omnis ipsa eaque, cumque
                sequi eligendi? Repellendus tenetur unde nemo nulla provident
                accusantium laudantium corporis error ea dolorem molestiae
                maiores neque at quisquam harum omnis quo laborum, accusamus
                iste! Delectus repudiandae unde vero, minus ea excepturi iusto
                doloribus aliquid labore molestias magnam provident quasi earum
                commodi fugit recusandae ullam placeat impedit quidem eos.
              </div>

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
