export default function EnglishWordCorrection({ data }) {
    if (!data) {
      return null;
    }
    const hits = data?.hits || [];
    return (
      <>
        <div className="flex flex-row gap-4">
          {hits.length > 0 ? (
            hits.map((rec, index) => (
              <div
                key={index}
                className="rounded-lg p-2 m-1 hover:bg-gray-100 hover:text-black"
              >
                <div className="">
                  <div>{rec?.document?.word || "No suggestions"}</div>
                </div>
              </div>
            ))
          ) : (
            null
          )}
        </div>
      </>
    );
  }
  