import { Tabs } from "antd";
import ExamsHistory from "../Components/ExamsHistory";
import UpcomingExams from "../Components/UpcomingExams";

const { TabPane } = Tabs;

function HomePage() {
  return (
    <div>
      <Tabs
        centered
        tabBarGutter={20}
        defaultActiveKey="1"
        size="large"
        style={{ marginBottom: 32 }}
      >
        <TabPane tab="آزمون های پیش رو" key="1">
          <UpcomingExams />
        </TabPane>
        <TabPane tab="تاریخچه آزمون ها" key="2">
          <ExamsHistory />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default HomePage;
