// app/page.tsx
import { fetchProducts } from '@/utils/api';
import Home from '@/components/Home';
import LoadingSpinner from '@/components/LoadingSpinner';

export default async function HomePage() {
  try {
    const products = await fetchProducts(); 
    return <Home initialProducts={products} />;
  }
  catch (error) {
    console.error('Error fetching products:', error);
    return <LoadingSpinner />; 
  }
}