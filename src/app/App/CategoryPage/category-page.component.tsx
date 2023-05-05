import { url } from "inspector";
import { Colors } from "../../constants";
import {
  Categories,
  CategoryModel,
  CategoryType,
} from "../../constants/category.constant";
import { I18n } from "../../translation";
import { MenuBar } from "../components/menu-bar";
import "./category-page.style.scss";

export const CategoryPage = () => {
  return (
    <div className="category-page">
      <div className="page-container">
        <section className="left-content">
          <div className="label">{I18n.FARMHOME}</div>
          <MenuBar />
        </section>

        <section className="category">
          <div
            style={{
              color: Colors.Solitaire,
              fontSize: "1.4vw",
            }}
            className="report-title"
          >
            {I18n.reports}
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: "2vw",
              marginBottom: "2vw",
            }}
          >
            {Categories?.map((e) => (
              <CategoryCard category={e} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const CategoryCard = ({ category }: { category: CategoryModel }) => {
  return (
    <div className="category-card">
      <img
        alt=""
        src={
          "https://thuthuatnhanh.com/wp-content/uploads/2022/06/hinh-anh-ma-cute.jpg"
        }
        className="img-background"
      />
      <div className="black-block">
        <div className="name">{category?.name}</div>
      </div>
    </div>
  );
};
