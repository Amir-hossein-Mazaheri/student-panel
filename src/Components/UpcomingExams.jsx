import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ExamCard from "../Common/ExamCard";
import { SET_REMAINING_TIME } from "../Store/entities/exam";

function UpcomingExams({ exams }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const makeAnswerList = useCallback(
    (examId) => {
      const answerBody = {
        exam: examId,
        student: 2,
        answers: [],
      };
      axios
        .post(`/exams/${examId}/students/`, answerBody)
        .then((res) => {
          navigate(`/exam/${examId}-${res.data.id}/`);
          dispatch(SET_REMAINING_TIME({ time: res.data.remain_time }));
        })
        .catch((err) => console.log(err.response));
    },
    [dispatch, navigate]
  );

  return (
    <div className="space-y-8">
      {exams.map((exam) => (
        <ExamCard
          key={exam.id}
          attendLink="/"
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
          answerListMaker={() => makeAnswerList(exam.id)}
        />
      ))}
    </div>
  );
}

export default UpcomingExams;
