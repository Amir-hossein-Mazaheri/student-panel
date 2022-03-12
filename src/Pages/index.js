import { Tabs } from "antd";
import Spinner from "../Common/Spinner";
import useSWR from "swr";
import ExamsHistory from "../Components/ExamsHistory";
import UpcomingExams from "../Components/UpcomingExams";
import fetcher from "../Helpers/fetcher";
import { useMemo } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const { TabPane } = Tabs;

function HomePage() {
  const { data: examList } = useSWR("/exams/", fetcher);

  const upcomingExamsSplitter = useMemo(() => {
    if (!examList) return;
    return examList.filter((exam) => dayjs.utc(exam.end) > dayjs.utc());
  }, [examList]);

  const historyExamsSplitter = useMemo(() => {
    if (!examList) return;
    return examList.filter((exam) => dayjs.utc(exam.end) < dayjs.utc());
  }, [examList]);

  if (!examList) {
    return <Spinner />;
  }

  // console.log(dayjs.utc(examList[0].end).format("YYYY MM DD"));
  // console.log(dayjs.utc().format("YYYY MM DD"));
  // console.log(dayjs.utc(examList[0].end) > dayjs.utc());

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
          <UpcomingExams exams={upcomingExamsSplitter} />
        </TabPane>
        <TabPane tab="تاریخچه آزمون ها" key="2">
          <ExamsHistory exams={historyExamsSplitter} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default HomePage;
