interface ConjugationTableProps {
  conjugations: ExampleSentence[];
}

export default function ConjugationTable({ conjugations }: ConjugationTableProps) {
  // Ensure conjugations are displayed in standard order
  const orderedPronouns = [
    "yo",
    "tú",
    "él/ella/usted",
    "nosotros/nosotras",
    "vosotros/vosotras",
    "ellos/ellas/ustedes"
  ];

  // Sort conjugations by standard order
  const sortedConjugations = [...conjugations].sort((a, b) => {
    return orderedPronouns.indexOf(a.pronoun) - orderedPronouns.indexOf(b.pronoun);
  });

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        {/* Mobile Cards View */}
        <div className="md:hidden space-y-3">
          {sortedConjugations.map((item, index) => (
            <div
              key={`mobile-${item.pronoun}-${index}`}
              className="bg-white p-4 rounded-lg shadow-sm border border-green-100 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="font-medium text-green-700">{item.pronoun}</div>
                <div className="text-green-600 font-semibold">{item.conjugation}</div>
              </div>
              <div className="mt-2">
                <div className="italic text-green-800">{item.sentence}</div>
                <div className="text-sm text-green-600 mt-1">{item.translation}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <table className="hidden md:table min-w-full bg-white rounded-lg overflow-hidden shadow-md border border-green-100">
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
                key={`desktop-${item.pronoun}-${index}`}
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
      </div>
    </div>
  );
}