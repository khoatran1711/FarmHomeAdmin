import merchant from "../../../assets/icons/merchant1.png";
import "./stats-item.style.scss";

export const StatItem = () => {
  return (
    <div className="stats-item">
      <img src={merchant} />
      <div className="label">hello</div>
    </div>
  );
};
