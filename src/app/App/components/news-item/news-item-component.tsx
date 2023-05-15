import "./news-item.style.scss";

interface NewsItemProps {
  news?: News;
}

interface News {
  date?: string;
  imgUrl?: string;
  name?: string;
  merchantName?: string;
}

export const NewsItem = (props: NewsItemProps) => {
  return (
    <>
      <div className="news-item">
        <div
          className="container"
          style={{
            backgroundImage: `url(${props?.news?.imgUrl})`,
          }}
        >
          <div className="cover">
            <div className="text">
              <label className="date">{props?.news?.date}</label>
              <div className="bottom-text">
                <label className="name">{props?.news?.name}</label>
                <label className="merchant">{props?.news?.merchantName}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
