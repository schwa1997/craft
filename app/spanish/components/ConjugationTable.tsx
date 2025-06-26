

interface ConjugationTableProps {
  conjugations: ExampleSentence[];
}

export default function ConjugationTable({ conjugations }: ConjugationTableProps) {
  // 确保变位按标准顺序显示
  const orderedPronouns = [
    "yo",
    "tú",
    "él/ella/usted",
    "nosotros/nosotras",
    "vosotros/vosotras",
    "ellos/ellas/ustedes"
  ];

  // 按标准顺序排序
  const sortedConjugations = [...conjugations].sort((a, b) => {
    return orderedPronouns.indexOf(a.pronoun) - orderedPronouns.indexOf(b.pronoun);
  });

  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md border border-green-100">
      <thead>
        <tr className="bg-green-100">
          <th className="px-4 py-3 text-left text-green-800 font-semibold w-1/6">
            Pronoun
          </th>
          <th className="px-4 py-3 text-left text-green-800 font-semibold w-1/6">
            Conjugation
          </th>
          <th className="px-4 py-3 text-left text-green-800 font-semibold w-2/3">
            Example
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedConjugations.map((item, index) => (
          <tr
            key={`${item.pronoun}-${index}`}
            className="border-b border-green-50 hover:bg-green-50 transition-colors duration-150"
          >
            <td className="px-4 py-3 font-medium text-green-700">
              {item.pronoun}
            </td>
            <td className="px-4 py-3 text-green-600 font-semibold">
              {item.conjugation}
            </td>
            <td className="px-4 py-3">
              <div className="italic text-green-800">{item.sentence}</div>
              <div className="text-sm text-green-600 mt-1">
                {item.translation}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}