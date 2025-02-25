export default function GeoSearchResults({ data }) {
  if (!data) {
    return null;
  }
  const hits = data?.hits || [];
  const searchTime = data?.search_time_ms || '';
  return (
    <>
    <div><label>Search Time (ms): </label>{searchTime}</div>
      <div className="grid grid-flow-col grid-rows-4 gap-4">
        {hits.length > 0 ? (
          hits.map((rec, index) => (
            <div
              key={index}
              className="rounded-lg p-2 m-1 hover:bg-gray-100 hover:text-black group"
            >
              <div className="flex flex-col">
                <div>
                  <label className="text-xs text-red-400 group-hover:text-black">City:</label> {rec?.document?.city || "No City"}
                </div>
                {/* <div><label className="text-xs  text-red-400 group-hover:text-black">Location: </label>{rec?.document?.latitude || "No lat"}, {rec?.document?.longitude || "No lat"} </div> */}
                <div><label className="text-xs">State: </label>{rec?.document?.state || "No State"} </div>
                <div><label className="text-xs">Zip: </label> {rec?.document?.zip || "No Zipr"} </div>
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
