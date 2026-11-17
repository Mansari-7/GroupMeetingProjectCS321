export default function TopBar() {
  return (
    <article>
      <div className="w-full h-8 bg-[rgb(162,199,83)] p-1">
        <h1 className="font-pixel font-extrabold">📚 Study Session Finder</h1>
      </div>
      <div className="flex relative h-20 bg-[#008080]">
        <div className="absolute px-1">
          <h1 className="font-pixel text-lg text-white">Get unstuck now.</h1>
          <p className="font-pixel text-[10px] text-white">
            Check out the study sessions available for you right now that you might be interested in.
          </p>
        </div>
      </div>
    </article>
  );
}
