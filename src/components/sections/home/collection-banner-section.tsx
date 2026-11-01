
import { CollectionBannerCard } from "@/components/modules/home/collection-banner-card";
import { collectionBannerSamples } from "@/data/collection.data";



const visibleBannerIds = new Set(["type3"]);

export function CollectionBannerSection() {
  const visibleBanners = collectionBannerSamples.filter((banner) =>
    visibleBannerIds.has(banner.id),
  );

  if (visibleBanners.length === 0) return null;


  console.log("visibleBanners", visibleBanners);
  return (
    <section aria-label="Featured collection banners" className="w-full">
      <div>
        {visibleBanners.map((banner) => (
          <CollectionBannerCard key={banner.id} banner={banner} />
        ))}
      </div>
    </section>
  );
}
