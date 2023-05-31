import "./stats-item.style.scss";

interface StatsItemProps {
  src: string;
  label: string;
}

export const StatItem = (props: StatsItemProps) => {
  return (
    <div className="stats-item">
      <img src={props?.src} />
      <div className="label">{props?.label}</div>
    </div>
  );
};
