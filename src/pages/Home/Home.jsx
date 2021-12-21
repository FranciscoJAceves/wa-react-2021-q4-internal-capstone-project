import Banner from "../../components/Banner";
import FeaturedProducts from "../../components/FeaturedProducts";
import Loading from "../../components/Loading";
import Slider from "../../components/Slider";
import useCategories from "../../utils/hooks/useCategories";
import useFeaturedBanners from "../../utils/hooks/useFeaturedBanners";
import useFeaturedProducts from "../../utils/hooks/useFeaturedProducts";

export default function Home() {
  const bannerData = useFeaturedBanners();
  const categoriesData = useCategories();
  const featuredProductsData = useFeaturedProducts();

  const bannerList = bannerData.isLoading
    ? []
    : bannerData.data.results.map(({ id, data }) => ({
        id,
        content: (
          <Banner
            title={data.title}
            text={data.description[0].text}
            image={data.main_image.url}
          />
        ),
      }));

  const categories = categoriesData.isLoading
    ? []
    : categoriesData.data.results.map(({ id, data }) => ({
        id,
        name: data.name,
      }));

  const featuredProducts = featuredProductsData.isLoading
    ? []
    : featuredProductsData;

  return (
    <>
      {bannerList.length === 0 ? (
        <Loading />
      ) : (
        <Slider contentList={bannerList} autoPlaySeconds={3000} />
      )}
      {featuredProducts.length === 0 || categories.length === 0 ? (
        <Loading />
      ) : (
        <FeaturedProducts
          title="Hot Products"
          categories={categories}
          products={featuredProducts}
        />
      )}
    </>
  );
}
