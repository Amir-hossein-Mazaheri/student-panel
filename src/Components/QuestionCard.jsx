import { Radio, Space } from "antd";
import { useCallback, useState } from "react";
import Tag from "../Common/Tag";
import convertHardness from "../Helpers/convertHardness";

function QuestionCard({
  id,
  questionTag,
  title,
  categories,
  choices,
  defaultChoice,
  disabled = false,
  setQuestionAnswers,
  questionAnswers,
  saveExamAnswers,
  setSaveExamUpdater,
  saveExamUpdater,
}) {
  const [choice, setChoice] = useState(defaultChoice || null);
  const addQuestionAnswer = useCallback(
    (event) => {
      const value = event.target.value;
      setChoice(value);

      setQuestionAnswers([
        ...questionAnswers,
        {
          question: id,
          choice: value,
        },
      ]);
      setSaveExamUpdater(saveExamUpdater + 1);
    },
    [
      setQuestionAnswers,
      questionAnswers,
      id,
      setSaveExamUpdater,
      saveExamUpdater,
    ]
  );

  return (
    <div className="px-7 py-4 rounded-lg shadow-lg shadow-gray-200">
      <div className="flex items-center justify-between">
        {questionTag && (
          <h2 className="text-lg text-gray-800 font-medium">{questionTag}</h2>
        )}
        <div className="flex gap-3">
          {categories.slice(0, categories.length - 1).map((category) => (
            <Tag className="bg-gray-300 rounded-md">{category}</Tag>
          ))}
          <Tag className="bg-gray-300 rounded-md">
            {convertHardness(categories[categories.length - 1])}
          </Tag>
        </div>
      </div>

      <div className="mt-5">
        <h3
          className="text-md font-medium question-title"
          dangerouslySetInnerHTML={{ __html: title }}
        ></h3>
        <div className="mt-5 space-y-4">
          <Radio.Group onChange={addQuestionAnswer} value={choice}>
            <Space direction="vertical">
              {choices.map((choice) => (
                <Radio disabled={disabled} value={choice.id}>
                  <span
                    className="ltr"
                    dangerouslySetInnerHTML={{ __html: choice.text }}
                  ></span>
                </Radio>
              ))}
              <Radio disabled={disabled} value={null}>
                <span>بدون جواب</span>
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
