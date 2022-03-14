function FullAnswerList({ answersList }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold">
          <span>پاسخنامه تشریحی</span>
        </h2>
      </div>
      {answersList.map((answer) => (
        <div className="px-12 py-7 shadow-lg shadow-gray-200 rounded-lg">
          <div
            className="px-4 py-2 bg-gray-100 rounded-md mb-4"
            dangerouslySetInnerHTML={{ __html: answer.question.description }}
          ></div>
          <div>
            <ul className="space-y-4">
              {answer.question.choices.map((choice) => (
                <li
                  className={`py-2 px-4 rounded-md ${
                    choice.is_correct && "bg-green-500 text-white"
                  }`}
                  dangerouslySetInnerHTML={{ __html: choice.text }}
                ></li>
              ))}
            </ul>
          </div>

          <div className="px-4 py-2 rounded-md bg-slate-100 mt-4 space-y-3 font-bold text-md">
            <p>گزینه انتخابی شما :</p>
            <p
              dangerouslySetInnerHTML={{
                __html: answer.choice ? answer.choice.text : "نزده",
              }}
            ></p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FullAnswerList;
