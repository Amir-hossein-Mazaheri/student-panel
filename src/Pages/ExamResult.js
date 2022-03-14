import { Dropdown, Menu } from "antd";
import { useCallback, useMemo } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import Button from "../Common/Button";
import ExamCard from "../Common/ExamCard";
import Spinner from "../Common/Spinner";
import AnswerList from "../Components/AnswerList";
import fetcher from "../Helpers/fetcher";
import { showJalaliTime } from "../Helpers/convertToJalali";

function ExamResult() {
  const { id } = useParams();

  const { data: examResult } = useSWR(`/exams/${id}/`, fetcher);
  const { data: studentResult } = useSWR(
    `/exams/${id}/students/2/results`,
    fetcher
  );

  const convertStatus = useCallback((status) => {
    switch (status) {
      case "wrong":
        return "غلط";
      case "correct":
        return "صحصیح";
      case "noanswer":
        return "نزده";
      default:
        return;
    }
  }, []);

  const printMenu = useMemo(() => {
    return (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            <span>پرینت آزمون</span>
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.aliyun.com"
          >
            <span>پرینت پاسخنامه تشریحی</span>
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            <span>پرینت کلید آزمون</span>
          </a>
        </Menu.Item>
      </Menu>
    );
  }, []);

  if (!examResult || !studentResult) {
    return <Spinner />;
  }

  console.log(studentResult);

  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl mb-5 text-gray-800">
          <span>نتیجه آزمون</span> <span>{examResult.raw_exam.name}</span>
        </h1>
      </div>
      <ExamCard
        title={examResult.raw_exam.name}
        count={{
          allCount: examResult.raw_exam.questions_count,
          eachCount: [
            { title: "آسان", value: examResult.raw_exam.easies_count },
            { title: "متوسط", value: examResult.raw_exam.mediums_count },
            { title: "سخت", value: examResult.raw_exam.hards_count },
          ],
        }}
        categories={[
          { title: "پایه ها", values: examResult.raw_exam.grades },
          { title: "درس ها", values: examResult.raw_exam.courses },
          { title: "مباحث", values: examResult.raw_exam.subjects },
        ]}
        time={{
          start: showJalaliTime(examResult.start),
          end: showJalaliTime(examResult.end),
          duration: examResult.time + " دقیقه",
        }}
        abstractInfo={{
          questionCount: examResult.raw_exam.questions_count,
          empty: studentResult.noanswers,
          correct: studentResult.correct,
          wrong: studentResult.wrong,
          percent: studentResult.percent,
        }}
      />

      <div>
        <AnswerList
          answers={studentResult.details.map((detail, index) => ({
            key: index,
            number: index,
            status: convertStatus(detail.status),
            selected: detail.choice ? (detail.choice.id % 4) + 1 : "نزده",
            correct:
              (detail.question.choices.find((choice) => choice.is_correct).id %
                4) +
              1,
          }))}
        >
          <div className="mb-5 flex justify-between">
            <div>
              <h2 className="text-xl font-bold">پاسخنامه</h2>
            </div>
            <div>
              <Dropdown overlay={printMenu} placement="bottomCenter" arrow>
                <Button className="bg-sky-500 text-white flex items-center gap-[6px]">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>پرینت آزمون</span>
                </Button>
              </Dropdown>
            </div>
          </div>
        </AnswerList>
      </div>
    </div>
  );
}

export default ExamResult;
