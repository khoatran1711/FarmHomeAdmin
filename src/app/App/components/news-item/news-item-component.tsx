import { News } from "../../../models/news.model";
import "./news-item.style.scss";

interface NewsItemProps {
  news?: News;
}

export const NewsItem = (props: NewsItemProps) => {
  return (
    <>
      <div className="news-item">
        <div
          className="container"
          style={{
            backgroundImage: `url(${props?.news?.imageBanner})`,
          }}
        >
          <div className="cover">
            <div className="text">
              <label className="date">{props?.news?.date}</label>
              <div className="bottom-text">
                <label className="name">{props?.news?.title}</label>
                <label className="merchant">{props?.news?.author}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
