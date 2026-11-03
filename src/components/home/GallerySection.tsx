import Image from "next/image";

const galleryImages = [
  {
    id: 1,
    title: "Community Cleanup",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
  },
  {
    id: 2,
    title: "Tree Plantation",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b",
  },
  {
    id: 3,
    title: "Helping People",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
  },
  {
    id: 4,
    title: "Community Support",
    image:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b",
  },
  {
    id: 5,
    title: "Environmental Care",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  },
  {
    id: 6,
    title: "Working Together",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18",
  },
];

const GallerySection = () => {
  return (
    <section className="bg-white px-4 py-14 dark:bg-gray-950 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 font-semibold text-green-600 dark:text-green-400">
            OUR GALLERY
          </p>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 sm:text-4xl">
            Moments That Make a Difference
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
            Explore the moments of kindness, teamwork, and positive
            change created by our community.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative h-64 overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={400}
                height={400}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent p-6">
                <h3 className="text-xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
