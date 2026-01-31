const { useState, useEffect, useContext } = React;

function Main() {
  const { searchTerm } = useContext(SearchContext);
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function run() {
      try {
        setErr("");
        setData(null);

        const res = await fetch(searchTerm.trim());
        const obj = await res.json();

        if (obj.Response === "False") {
          setErr(obj.Error || "Something went wrong!");
          return;
        }

        setData(obj);
      } catch (e) {
        setErr(String(e));
      }
    }
    run();
  }, [searchTerm]);

  if (err) {
    return (
      <div className="pt-35 pl-20">
        <h1 className="text-2xl font-bold text-red-300">Error</h1>
        <p className="mt-2 text-lg">{err}</p>
      </div>
    );
  }

  if (!data) return <h1 className="pt-35 pl-20 text-2xl">Loading...</h1>;

  // ✅ SEARCH MODE (s=...)
  if (data.Search) {
    const total = data.totalResults ? Number(data.totalResults) : null;

    return (
      <div className="pt-35 px-6 md:px-20">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Search Results</h1>
          <p className="text-lg opacity-80">
            Showing {data.Search.length}
            {total ? ` of ${total}` : ""} results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.Search.map((m) => {
            const { Title, Year, imdbID, Type, Poster } = m;
            const posterOk = Poster && Poster !== "N/A";

            return (
              <div
                key={imdbID}
                className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur p-4 shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex gap-4">
                  <div className="shrink-0">
                    {posterOk ? (
                      <img
                        src={Poster}
                        alt={Title}
                        className="w-24 h-34 object-cover rounded-xl"
                      />
                    ) : (
                      <div className="w-24 h-34 rounded-xl bg-white/10 flex items-center justify-center text-xs opacity-80">
                        No Poster
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 min-w-0">
                    <h2 className="text-xl font-semibold truncate">
                      {Title}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-500/20 border border-blue-400/30">
                        {Type}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-white/10 border border-white/20">
                        {Year}
                      </span>
                      <span className="px-2 py-1 rounded-full text-xs bg-white/10 border border-white/20">
                        {imdbID}
                      </span>
                    </div>

                    <p className="text-sm opacity-80 line-clamp-2">
                      Tip: Click a movie to fetch full details using <b>&i={imdbID}</b>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ✅ DETAILS MODE (i=... or t=...)
  const {
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,
    Country,
    Awards,
    Poster,
    Ratings,
    Metascore,
    imdbRating,
    imdbVotes,
    imdbID,
    Type,
    BoxOffice,
    Production,
    Website
  } = data;

  const posterOk = Poster && Poster !== "N/A";
  const hasRatings = Array.isArray(Ratings) && Ratings.length > 0;

  return (
    <div className="pt-35 px-6 md:px-20 pb-16">
      <div className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0">
            {posterOk ? (
              <img
                src={Poster}
                alt={Title}
                className="w-72 max-w-full rounded-2xl object-cover shadow-lg"
              />
            ) : (
              <div className="w-72 h-96 rounded-2xl bg-white/10 flex items-center justify-center opacity-80">
                No Poster
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl font-extrabold leading-tight">
                {Title}
              </h1>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/20">
                  {Type}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/20">
                  {Year}
                </span>
                {Rated && Rated !== "N/A" && (
                  <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 border border-green-400/30">
                    Rated: {Rated}
                  </span>
                )}
                {Runtime && Runtime !== "N/A" && (
                  <span className="px-3 py-1 rounded-full text-sm bg-white/10 border border-white/20">
                    {Runtime}
                  </span>
                )}
                {Genre && Genre !== "N/A" && (
                  <span className="px-3 py-1 rounded-full text-sm bg-purple-500/20 border border-purple-400/30">
                    {Genre}
                  </span>
                )}
              </div>

              {/* Scores */}
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-sm opacity-80">IMDb</p>
                  <p className="text-2xl font-bold">{imdbRating || "N/A"}</p>
                  <p className="text-xs opacity-70">{imdbVotes || ""}</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-sm opacity-80">Metascore</p>
                  <p className="text-2xl font-bold">{Metascore || "N/A"}</p>
                  <p className="text-xs opacity-70">critic score</p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-sm opacity-80">BoxOffice</p>
                  <p className="text-2xl font-bold">{BoxOffice || "N/A"}</p>
                  <p className="text-xs opacity-70">reported gross</p>
                </div>
              </div>

              {/* Plot */}
              <div className="mt-4">
                <h2 className="text-2xl font-bold">Plot</h2>
                <p className="mt-2 text-lg opacity-90 leading-relaxed">
                  {Plot || "N/A"}
                </p>
              </div>

              {/* Details Grid */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-sm opacity-80">Released</p>
                  <p className="text-lg font-semibold">{Released || "N/A"}</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-sm opacity-80">Language / Country</p>
                  <p className="text-lg font-semibold">
                    {(Language || "N/A")} • {(Country || "N/A")}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-sm opacity-80">Director</p>
                  <p className="text-lg font-semibold">{Director || "N/A"}</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-sm opacity-80">Writer</p>
                  <p className="text-lg font-semibold">{Writer || "N/A"}</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 md:col-span-2">
                  <p className="text-sm opacity-80">Actors</p>
                  <p className="text-lg font-semibold">{Actors || "N/A"}</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 md:col-span-2">
                  <p className="text-sm opacity-80">Awards</p>
                  <p className="text-lg font-semibold">{Awards || "N/A"}</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-sm opacity-80">Production</p>
                  <p className="text-lg font-semibold">{Production || "N/A"}</p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4">
                  <p className="text-sm opacity-80">Website</p>
                  <p className="text-lg font-semibold break-all">
                    {Website && Website !== "N/A" ? Website : "N/A"}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 md:col-span-2">
                  <p className="text-sm opacity-80">IMDb ID</p>
                  <p className="text-lg font-semibold">{imdbID || "N/A"}</p>
                </div>
              </div>

              {/* Ratings List */}
              <div className="mt-8">
                <h2 className="text-2xl font-bold">Ratings</h2>

                {hasRatings ? (
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Ratings.map((r) => (
                      <div
                        key={r.Source}
                        className="rounded-2xl border border-white/20 bg-white/10 p-4"
                      >
                        <p className="text-sm opacity-80">{r.Source}</p>
                        <p className="text-xl font-bold">{r.Value}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 opacity-80">No ratings available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
