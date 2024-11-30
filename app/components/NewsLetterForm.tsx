export default function NewsLetterForm() {
  return (
    <section className="w-[368px]">
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-2xl">Be a Part of Our Journey</h3>
        <p className="text-neutral-600 text-[16px]">
          Welcome to UNCMFRT. Sign up for exclusive content and well send you
          10% off.
        </p>
        <form action="" className="flex items-center w-full">
          <input
            className="block w-full h-full rounded-l-lg py-3 translate-x-1 z-0 pl-4 border outline-none border-neutral-400"
            placeholder="Email Address"
            type="email"
            id="email"
          />
          <button
            type="submit"
            className="py-3 z-1 flex-1 h-full px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-[#1b1f23] sm:rounded-none sm:rounded-r-lg"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
