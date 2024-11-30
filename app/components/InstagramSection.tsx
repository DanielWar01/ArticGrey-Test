import {Image} from '@shopify/hydrogen';

export default function InstagramSection() {
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mx-10 relative">
      {[-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((element) =>
        element === -1 ? (
          <div
            key={element}
            className="instagram-1 py-10 mx-20 flex flex-col gap-5"
          >
            <div className="flex gap-3 justify-center items-center">
              <img src="/icons/instagram/icon.svg" alt="Logo" />
              <p className="font-bold">@uncmfrt.com</p>
            </div>
            <a
              href="https://www.instagram.com/arcticgrey/"
              className="cursor-pointer flex  justify-center bg-white p-3 border rounded-lg border-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow Us on Instagram
            </a>
          </div>
        ) : element === 0 ? null : (
          <div
            key={element}
            className="rest-instagram h-[240px] w-full cursor-pointer relative ease-in-out duration-300"
          >
            <img
              src={`/images/image-${element}.jpg`}
              alt="Another meaningful description"
              className="instagram-image inset-0 w-full h-full object-top object-cover rounded-xl"
              loading="lazy"
            />
            <div className="filter-image absolute top-0 left-0 w-full h-full flex items-center justify-center rounded-md opacity-0 duration-300 bg-[rgba(0,0,0,0.5)]">
              <img src="/icons/social-media/instagram.svg" alt="" />
            </div>
          </div>
        ),
      )}
    </section>
  );
}
