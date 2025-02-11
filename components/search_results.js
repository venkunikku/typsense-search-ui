export default function SearchResults({ data }) {
  if (!data) {
    return null;
  }
  const hits = data?.hits || [];
  return (
    <>
      <div className="grid grid-flow-col grid-rows-4 gap-4">
        {hits.length > 0 ? (
          hits.map((rec, index) => (
            <div
              key={index}
              className="rounded-lg p-2 m-1 hover:bg-gray-100 hover:text-black group"
            >
              <div className="flex flex-col">
                <div>
                  <label className="text-xs text-red-400 group-hover:text-black">Description:</label> {rec?.document?.item_desc || "No description available"}{" "}
                </div>
                <div><label className="text-xs">Item no: </label>{rec?.document?.item_number || "No Item number"} </div>
                <div><label className="text-xs">Store no: </label> {rec?.document?.store_unit || "No Store number"} </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 p-2">No results found</div>
        )}
      </div>
    </>
  );
}
