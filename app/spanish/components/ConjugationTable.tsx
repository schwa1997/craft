interface ConjugationTableProps {
  conjugations: Record<string, ExampleSentence[]>;
}

export default function ConjugationTable({
  conjugations,
}: ConjugationTableProps) {
  return (
    <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md border border-green-100">
      <thead>
        <tr className="bg-green-100">
          <th className="px-4 py-3 text-left text-green-800 font-semibold">
            Pronoun
          </th>
          <th className="px-4 py-3 text-left text-green-800 font-semibold">
            Conjugation
          </th>
          <th className="px-4 py-3 text-left text-green-800 font-semibold">
            Example
          </th>
          <th className="px-4 py-3 text-left text-green-800 font-semibold">
            Translation
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(conjugations).map(([pronoun, examples]) => (
          <tr
            key={pronoun}
            className="border-b border-green-50 hover:bg-green-50 transition-colors duration-150"
          >
            <td className="px-4 py-3 font-medium text-green-700">{pronoun}</td>
            <td className="px-4 py-3 text-green-600 font-semibold">
              {examples[0].conjugation}
            </td>
            <td className="px-4 py-3 italic text-green-800">
              {examples[0].sentence}
            </td>
            <td className="px-4 py-3 text-green-600">
              {examples[0].translation}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
