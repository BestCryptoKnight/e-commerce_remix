import { Row, Col } from "antd";
import BarChart from "~/components/shared/bar-chart";
import PieChart from "~/components/shared/pie-chart";
import StatisticCard from "~/components/shared/statistic-card";
import {
  DotChartOutlined,
  TeamOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import LineChart from "~/components/shared/line-chart";

const Dashboard = () => {
  return (
    <Row gutter={24}>
      <div className="mb-5 flex w-full">
        <Col md={8}>
          <StatisticCard
            title="Products"
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<DotChartOutlined />}
            suffix="%"
          />
        </Col>
        <Col md={8}>
          <StatisticCard
            title="Vendors"
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<TeamOutlined />}
            suffix="%"
          />
        </Col>
        <Col md={8}>
          <StatisticCard
            title="Bookings"
            value={11.28}
            precision={2}
            valueStyle={{ color: "#3f8600" }}
            prefix={<TagsOutlined />}
            suffix="%"
          />
        </Col>
      </div>
      <Col md={15}>
        <BarChart />
      </Col>
      <Col md={9}>
        <PieChart />
      </Col>

      <Col md={24}>
        <LineChart />
      </Col>
    </Row>
  );
};

export default Dashboard;
