import Countdown from "antd/lib/statistic/Countdown";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../Common/Button";
import ExamCard from "../Common/ExamCard";
import QuestionCard from "../Components/QuestionCard";
import dayjs from "dayjs";
import { useParams } from "react-router";
import axios from "axios";

function ExamResult() {
  const { id } = useParams();
  const [questionAnswers, setQuestionAnswers] = useState([]);
  // const { remainingTime } = useSelector((store) => store.entities.exam);
  const [remainingTime, setRemainingTime] = useState(0);
  const handleExamSubmission = useCallback(
    (event) => {
      event.preventDefault();
      console.log(questionAnswers);
    },
    [questionAnswers]
  );

  useEffect(() =>{
    axios.get(`/exams/${id.split("-")[0]}/students/${id.split("-")[1]}`).then(res => {
      
    })
  }, [id]);

  return (
    <div>
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
        }}
      />

      <div>
        <form onSubmit={handleExamSubmission}>
          <div className="sticky top-5 right-5 mt-8">
            <div className="flex justify-between">
              <div>
                <Countdown
                  title="زمان باقی مانده"
                  value={dayjs(remainingTime).millisecond()}
                  // onFinish={onFinish}
                />
              </div>
              <div>
                <Button
                  className="bg-green-500 flex mr-auto text-white"
                  type="submit"
                >
                  ثبت پاسخ ها
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-8 mt-10">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <QuestionCard
                key={n}
                id={n}
                questionTag={`سوال ${n}`}
                title="سوال سوال سوال سوال سوال سوال سوال سوال سوال"
                categories={["متوسط", "فصل 1", "دهم", "تجربی"]}
                choices={[
                  "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
                  "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
                  "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
                  "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
                ]}
                setQuestionAnswers={setQuestionAnswers}
                questionAnswers={questionAnswers}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExamResult;
