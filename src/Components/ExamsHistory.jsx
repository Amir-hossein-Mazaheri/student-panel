import ExamCard from "../Common/ExamCard";

function ExamsHistory({ exams }) {
  return (
    <div className="space-y-8">
      {exams.map((exam) => (
        <ExamCard
          key={exam.id}
          moreDetailLink="/"
          abstractInfo={{
            questionCount: 100,
            empty: 20,
            correct: 60,
            wrong: 20,
            purePercent: 80,
            percent: 75,
          }}
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
        />
      ))}
    </div>
  );
}

export default ExamsHistory;
