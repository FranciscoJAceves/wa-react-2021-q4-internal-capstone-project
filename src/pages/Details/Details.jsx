import { useParams } from "react-router";
import AddToCartForm from "../../components/AddToCartForm";
import Gallery from "../../components/Gallery";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import { useCategories } from "../../utils/hooks/useCategories";
import { useProduct } from "../../utils/hooks/useProduct";
import {
  Data,
  DetailsContainer,
  GalleryContainer,
  Header,
  Info,
  Label,
  Price,
  ProductInformation,
  Title,
} from "./Details.styled";

export default function Details() {
  const { productId } = useParams();
  const categoriesData = useCategories();
  const productData = useProduct(productId);

  const product = productData.isLoading || productData.data.results[0];

  let categoryNames = {};
  if (!categoriesData.isLoading) {
    categoriesData.data.results.forEach(({ id, data: { name } }) => {
      categoryNames = { ...categoryNames, [id]: name };
    });
  }

  const specsArray =
    productData.isLoading ||
    product.data.specs.map(({ spec_name, spec_value }) => [
      spec_name,
      spec_value,
    ]);

  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      {productData.isLoading || categoriesData.isLoading ? (
        <Loading />
      ) : (
        <DetailsContainer>
          <GalleryContainer>
            <Gallery images={product.data.images} />
          </GalleryContainer>
          <ProductInformation>
            <Header>
              <Title>{product.data.name}</Title>
              <Info>{categoryNames[product.data.category.id]}</Info>
              <Info>
                <Label>Tags: </Label>
                {product.tags.join(", ")}
              </Info>
            </Header>
            <Data>
              <Label>SKU: </Label>
              {product.data.sku}
            </Data>
            <Data>{product.data.short_description}</Data>
            <Table data={specsArray} />
            <Price>{formatter.format(product.data.price)}</Price>
            <AddToCartForm product={product} />
          </ProductInformation>
        </DetailsContainer>
      )}
    </>
  );
}
