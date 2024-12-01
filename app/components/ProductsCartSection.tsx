import type {RecommendedProductsQuery} from 'storefrontapi.generated';

export default function ProductsCartSection({
  products,
}: {
  products: RecommendedProductsQuery;
}) {
  return (
    <section>
      <h3 className="text-[22px]">Enhance Your Performance</h3>
      <p>{products?.products.nodes[0].id}</p>
    </section>
  );
}
