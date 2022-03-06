import Button from "../Common/Button";
import ExamCard from "../Common/ExamCard";
import QuestionCard from "../Components/QuestionCard";

function ExamResult() {
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

      <div className="sticky top-5 right-5 mt-8">
        <Button className="bg-green-500 flex mr-auto text-white" type="submit">
          ثبت پاسخ ها
        </Button>
      </div>

      <div className="space-y-8 mt-10">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <QuestionCard
            questionTag={`سوال ${n}`}
            title="سوال سوال سوال سوال سوال سوال سوال سوال سوال"
            categories={["متوسط", "فصل 1", "دهم", "تجربی"]}
            choices={[
              "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
              "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
              "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
              "گزینه گزینه گزینه گزینه گزینه گزینه گزینه گزینه",
            ]}
          />
        ))}
      </div>
    </div>
  );
}

export default ExamResult;
