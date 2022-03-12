import { Dropdown, Menu } from "antd";
import { useMemo } from "react";
import { useParams } from "react-router";
import Button from "../Common/Button";
import ExamCard from "../Common/ExamCard";
import AnswerList from "../Components/AnswerList";

function ExamResult() {
  const { id } = useParams();

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
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.luohanacademy.com"
          >
            <span>پرینت آزمون و پاسخنامه</span>
          </a>
        </Menu.Item>
      </Menu>
    );
  }, []);

  console.log(id);

  return (
    <div>
      <div>
        <h1 className="font-bold text-3xl mb-5 text-gray-800">
          <span>نتیجه آزمون</span> <span>فلان</span>
        </h1>
      </div>
      <ExamCard
        title="جمع بندی فیزیک 2"
        count={{
          allCount: 20,
          eachCount: [
            { title: "آسان", value: 5 },
            { title: "متوسط", value: 5 },
            { title: "سخت", value: 10 },
          ],
        }}
        categories={[
          { title: "رشته ها", values: ["تجربی", "ریاضی"] },
          { title: "پایه ها", values: ["دوازدهم", "یازدهم"] },
          { title: "درس ها", values: ["فیزیک 2"] },
          { title: "مباحث", values: ["گرما", "الکتریسیه"] },
        ]}
        time={{
          start: "1400/02/11",
          end: "1400/02/12",
          duration: "120 دقیقه",
          attended: "2 / 3",
        }}
        abstractInfo={{
          questionCount: 100,
          empty: 20,
          correct: 60,
          wrong: 20,
          purePercent: 80,
          percent: 75,
        }}
      />

      <div>
        <AnswerList
          answers={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => ({
            key: n,
            number: n,
            status: "درست",
            selected: null,
            correct: 4,
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
