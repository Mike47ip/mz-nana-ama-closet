import { notFound } from 'next/navigation';
import ProductForm from '@/components/ProductForm';
import { getProduct } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function EditProduct({ params }) {
  const product = await getProduct(params.id);
  if (!product) notFound();
  return (<><h1 className="mb-8 font-display text-4xl font-semibold">Edit product</h1><ProductForm product={product} /></>);
}
