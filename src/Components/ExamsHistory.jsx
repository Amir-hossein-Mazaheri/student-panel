import ExamCard from "../Common/ExamCard";
import { showJalaliTime } from "../Helpers/convertToJalali";

function ExamsHistory({ exams }) {
  console.log(exams);

  return (
    <div className="space-y-8">
      {exams.map((exam) => (
        <ExamCard
          key={exam.id}
          moreDetailLink={`/exam-result/${exam.id}`}
          abstractInfo={{
            questionCount: 100,
            empty: 20,
            correct: 60,
            wrong: 20,
            purePercent: 80,
            percent: 75,
          }}
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
            end: showJalaliTime(exam.start),
            duration: exam.time + " دقیقه",
          }}
        />
      ))}
    </div>
  );
}

export default ExamsHistory;
