import ExamCard from "../Common/ExamCard";

function UpcomingExams() {
  return (
    <div className="space-y-8">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <ExamCard
          key={n}
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

export default UpcomingExams;
