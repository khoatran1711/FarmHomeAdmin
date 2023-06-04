import { useEffect, useState } from "react";
import { NewsService } from "../../services/news.service";
import { I18n } from "../../translation";
import { MenuBar } from "../components/menu-bar";
import { NewsItem } from "../components/news-item";
import "./news-page.style.scss";
import { News } from "../../models/news.model";

const news = {
  date: new Date()
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .join("-"),
  imgUrl:
    "https://vnn-imgs-f.vgcloud.vn/2020/09/24/18/tranh-cai-an-hoa-qua-truoc-hay-sau-bua-an-da-co-cau-tra-loi.jpg",
  name: "Trai cay rau qua 4 chuc mua",
  merchantName: "-Khoa ga-",
};

export const NewsPage = () => {
  const [newsData, setNewsData] = useState<News[] | []>([]);

  const newsService = new NewsService();
  const getData = async () => {
    const response = await newsService.getAllNews();
    setNewsData(response?.data?.contents);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="news-page">
        <div className="page-container">
          <section className="left-content">
            <div className="label">{I18n.FARMHOME}</div>
            <MenuBar />
          </section>
          <div className="news-column">
            {newsData?.length != 0 && (
              <div className="news-row">
                {newsData?.map((item, index) => (
                  <NewsItem news={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
