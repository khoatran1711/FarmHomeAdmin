import { url } from "inspector";
import { Colors } from "../../constants";
import { I18n } from "../../translation";
import { MenuBar } from "../components/menu-bar";
import "./category-page.style.scss";
import { ProductCard } from "../FarmerDetailPage";
import { Fruit } from "../../models/farmer-detail.model";
import FruitIcon from "../../assets/icons/fruit.png";
import PeasIcon from "../../assets/icons/peas.png";
import TuberIcon from "../../assets/icons/tuber.png";
import SpicesIcon from "../../assets/icons/spices.png";
import VegetableIcon from "../../assets/icons/vegetable.png";
import { CategoryService } from "../../services/category.service";
import { FilterCategoryResponse } from "../../models/category.model";
import { useEffect, useState } from "react";

const fruit: Fruit = {
  id: 1,
  name: "test",
  weight: 10,
  remainingWeight: 10,
  unit: "kg",
  images: [
    {
      url: "https://sanakyvietnam.net/wp-content/uploads/meo-bao-quan-trai-cay-trong-tu-lanh-600x392.jpg",
    },
  ],
  description:
    "ofjewoifjqwoefj oqwjefoiq jweoifj qoiejfoqi wjofeijqow iejfoqiwj eoifjqoiwjeofqjoeijlkasvnlidn",
  date: "2023-07-05",
  farmer: undefined,
  popular: false,
  season: "spring",
  suggestPrice: 100,
  category: "Fruit",
};

const catename = {
  Fruit: "Fruit",
  Vegetable: "Vegetable",
  Tuber: "Tuber",
  Pea: "Pea",
  Spice: "Spice",
};

const cates: CategoryModel[] = [
  {
    name: catename.Fruit,
    image: FruitIcon,
    vietnameseName: "trái cây",
  },
  {
    name: catename.Vegetable,
    image: VegetableIcon,
    vietnameseName: "rau xanh",
  },
  {
    name: catename.Tuber,
    image: TuberIcon,
    vietnameseName: "rau củ",
  },
  {
    name: catename.Pea,
    image: PeasIcon,
    vietnameseName: "đậu",
  },
  {
    name: catename.Spice,
    image: SpicesIcon,
    vietnameseName: "gia vị",
  },
];

export const CategoryPage = () => {
  const categoryService = new CategoryService();

  const [data, setData] = useState<FilterCategoryResponse | null>(null);

  const onCategoryClick = async (fruit: string) => {
    const request = await categoryService.filterCategory(fruit);
    const responseData = request?.data;
    setData(responseData);
  };

  const getData = async () => {
    onCategoryClick("trái cây");
  };

  useEffect(() => {
    getData();
  }, []);

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
            {I18n.category}
          </div>

          <div className="category-icons">
            {cates?.map((e) => (
              <CategoryCard
                name={e.name}
                image={e.image}
                vietnameseName={e.vietnameseName}
                onClick={() => onCategoryClick(e.vietnameseName)}
              />
            ))}
          </div>
          <div className="fruit">
            {data?.contents?.map((e) => (
              <ProductCard value={e} style="fruit-card" />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export interface CategoryModel {
  name: string;
  vietnameseName: string;
  colors?: string;
  image?: string;
  onClick?: (e: any) => void;
}

const CategoryCard = (props: CategoryModel) => {
  return (
    <div className="category-card" onClick={props.onClick}>
      <img alt="" src={props?.image} className="img-background" />
      <div className="black-block">
        <div className="name">{props?.name}</div>
      </div>
    </div>
  );
};
