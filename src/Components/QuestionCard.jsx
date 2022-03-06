import Tag from "../Common/Tag";

function QuestionCard({ questionTag, title, categories, choices }) {
  return (
    <div className="px-7 py-4 rounded-lg shadow-lg shadow-gray-200">
      <div className="flex items-center justify-between">
        {questionTag && (
          <h2 className="text-lg text-gray-800 font-medium">{questionTag}</h2>
        )}
        <div className="flex gap-3">
          {categories.map((category) => (
            <Tag className="bg-gray-300 rounded-md">{category}</Tag>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-md font-medium">{title}</h3>
        <div className="mt-5 space-y-4">
          <ul>
            {choices.map((choice) => (
              <li>
                <p>{choice}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
