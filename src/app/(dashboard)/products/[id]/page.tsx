import ProductDetailClient from "@/features/products/components/product-detail-client";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <ProductDetailClient id={id} />
  );
}