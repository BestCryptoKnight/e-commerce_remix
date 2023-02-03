import { Card, Statistic } from "antd";

interface CardProps {
  title: string;
  value: number;
  prefix: any;
  valueStyle: any;
  precision: number;
  suffix: string;
}

const StatisticCard: React.FC<CardProps> = ({
  title,
  value,
  valueStyle,
  prefix,
  precision,
  suffix,
}) => (
  <Card bordered={false}>
    <Statistic
      title={title}
      value={value}
      precision={precision}
      valueStyle={valueStyle}
      prefix={prefix}
      suffix={suffix}
    />
  </Card>
);

export default StatisticCard;
