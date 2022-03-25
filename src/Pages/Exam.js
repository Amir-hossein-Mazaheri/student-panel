import { useCallback, useEffect, useMemo, useState } from "react";

import { Statistic } from "antd";
import Button from "../Common/Button";
import ExamCard from "../Common/ExamCard";
import QuestionCard from "../Components/QuestionCard";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Spinner from "../Common/Spinner";
import { showJalaliTime } from "../Helpers/convertToJalali";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import pushNotification from "../Helpers/pushNotification";

dayjs.extend(utc);

const { Countdown } = Statistic;

function ExamResult() {
  const { id } = useParams();
  const [remainingTime, setRemainingTime] = useState(0);
  const [fetchedQuestionAnswers, setFetchedQuestionAnswers] = useState([]);
  const [questionAnswers, setQuestionAnswers] = useState([]);
  const [examData, setExamData] = useState();
  const navigate = useNavigate();

  const examId = id.split("-")[0];
  const answerListId = id.split("-")[1];

  const examPageURL = useMemo(() => {
    return `/exams/${examId}/students/${answerListId}/`;
  }, [answerListId, examId]);

  const saveExamAnswers = useCallback(
    (type = "auto") => {
      console.log(questionAnswers);
      const saveData = {
        answers: [...fetchedQuestionAnswers, ...questionAnswers],
      };
      console.log(saveData);
      axios
        .patch(examPageURL, saveData)
        .then((res) => {
          console.log(res);
          setRemainingTime(res.data.remain_time);
          setFetchedQuestionAnswers(res.data.answers);
          if (type === "manual") {
            pushNotification("success", "پاسخ ها با موفقیت ذخیره شد.");
          }
        })
        .catch((err) => {
          console.log(err.response);
          if (type === "manual") {
            pushNotification("error", "در ذخیره پاسخ ها مشکلی پیش امده.");
          }
        });
    },
    [examPageURL, fetchedQuestionAnswers, questionAnswers]
  );

  const endExam = useCallback(() => {
    const endData = {
      answers: [...fetchedQuestionAnswers, ...questionAnswers],
      end: dayjs.utc().toISOString(),
    };
    console.log(endData);
    axios
      .patch(examPageURL, endData)
      .then((res) => {
        console.log(res);
        setRemainingTime(res.data.remain_time);
        setFetchedQuestionAnswers(res.data.answers);
        pushNotification("success", "آزمون با موفقیت به اتمام رسید.");
      })
      .catch((err) => {
        console.log(err.response);
        pushNotification("error", "در ذخیره سازی آزمون مشکلی پیش آمده.");
      })
      .finally(() => navigate("/", { replace: true }));
  }, [examPageURL, fetchedQuestionAnswers, navigate, questionAnswers]);

  const handleExamSubmission = useCallback(
    (event) => {
      event.preventDefault();
      endExam();
      navigate("/", { replace: true });
    },
    [endExam, navigate]
  );

  useEffect(() => {
    axios.get(examPageURL).then((res) => {
      setExamData(res.data);
      setRemainingTime(res.data.remain_time);
    });
  }, [examPageURL, id]);

  if (!examData) {
    return <Spinner />;
  }

  console.log(examData);

  return (
    <div>
      <ExamCard
        title={examData.exam.raw_exam.name}
        count={{
          allCount: examData.questions.length,
          eachCount: [
            { title: "آسان", value: examData.exam.raw_exam.easies_count },
            { title: "متوسط", value: examData.exam.raw_exam.mediums_count },
            { title: "سخت", value: examData.exam.raw_exam.hards_count },
          ],
        }}
        categories={[
          { title: "پایه ها", values: ["دوازدهم", "یازدهم"] },
          { title: "درس ها", values: ["فیزیک 2"] },
          { title: "مباحث", values: ["گرما", "الکتریسیه"] },
        ]}
        time={{
          start: showJalaliTime(examData.start),
          end: null,
          duration: examData.exam.time + " دقیقه",
        }}
      />

      <div>
        <form onSubmit={handleExamSubmission}>
          <div className="sticky top-5 right-5 mt-8 bg-white rounded-lg z-50 py-5 px-5 shadow-md shadow-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex gap-5 items-center">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <Countdown
                    title="زمان باقی مانده"
                    value={Date.now() + remainingTime * 60 * 1000}
                    onFinish={endExam}
                  />
                </div>
              </div>
              <div className="flex gap-5">
                <Button
                  onClick={() => saveExamAnswers("manual")}
                  className="bg-green-500 flex mr-auto text-white items-center gap-1"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                      />
                    </svg>
                  </span>
                  <span>ثبت پاسخ ها</span>
                </Button>
                <Button
                  className="bg-red-500 flex mr-auto text-white items-center gap-1"
                  type="submit"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                      />
                    </svg>
                  </span>
                  <span>اتمام آزمون</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-8 mt-10">
            {examData.questions.map((question, index) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                answerListId={answerListId}
                questionTag={`سوال ${index + 1}`}
                title={question.description}
                categories={[
                  question.major,
                  question.grade,
                  question.course,
                  question.subject,
                  question.level,
                ]}
                choices={question.choices}
                setQuestionAnswers={setQuestionAnswers}
                questionAnswers={questionAnswers}
                saveExamAnswers={saveExamAnswers}
              />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExamResult;
