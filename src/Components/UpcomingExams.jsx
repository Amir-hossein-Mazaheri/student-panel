import axios from "axios";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import ExamCard from "../Common/ExamCard";
import { showJalaliTime } from "../Helpers/convertToJalali";
import pushNotification from "../Helpers/pushNotification";
import { SET_REMAINING_TIME } from "../Store/entities/exam";

function UpcomingExams({ exams }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const makeAnswerList = useCallback(
    (examId) => {
      axios
        .get(`/exams/${examId}/students`)
        .then((res) => {
          console.log(res);
          if (!res.data.end) {
            navigate(`/exam/${examId}-${res.data.id}/`);
          }
          pushNotification("error", "آزمون شما به پایان رسیده است.");
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          if (err.response.status === 404) {
            axios
              .post(`/exams/${examId}/students/`, {
                answers: [],
              })
              .then((res) => {
                const answerListId = res.data.id;
                navigate(`/exam/${examId}-${answerListId}/`);
                dispatch(SET_REMAINING_TIME({ time: res.data.remain_time }));
              })
              .catch((err) => console.log(err.response));
          }
        });
    },
    [dispatch, navigate]
  );

  return (
    <div className="space-y-8">
      {exams.map((exam) => (
        <ExamCard
          key={exam.id}
          attendLink="/"
          title={exam.raw_exam.name}
          count={{
            allCount: exam.raw_exam.questions_count,
            eachCount: [
              { title: "آسان", value: exam.raw_exam.easies_count },
              { title: "متوسط", value: exam.raw_exam.mediums_count },
              { title: "سخت", value: exam.raw_exam.hards_count },
            ],
          }}
          categories={[
            { title: "پایه ها", values: exam.raw_exam.grades },
            { title: "درس ها", values: exam.raw_exam.courses },
            { title: "مباحث", values: exam.raw_exam.subjects },
          ]}
          time={{
            start: showJalaliTime(exam.start),
            end: showJalaliTime(exam.end),
            duration: exam.time + " دقیقه",
          }}
          answerListMaker={() => makeAnswerList(exam.id)}
        />
      ))}
    </div>
  );
}

export default UpcomingExams;
