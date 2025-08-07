import { useCallback } from 'react';

import { Product } from '../../types';

interface ProductWithUI extends Product {
  description?: string;
  isRecommended?: boolean;
}

export function useProduct(
  products: ProductWithUI[],
  setProducts: (products: ProductWithUI[] | ((prev: ProductWithUI[]) => ProductWithUI[])) => void,
  addNotification: (message: string, type?: 'error' | 'success' | 'warning') => void
) {
  const addProduct = useCallback(
    (newProduct: Omit<ProductWithUI, 'id'>) => {
      const product: ProductWithUI = {
        ...newProduct,
        id: `p${Date.now()}`,
      };
      setProducts((prev) => [...prev, product]);
      addNotification('상품이 추가되었습니다.', 'success');
    },
    [setProducts, addNotification]
  );

  const updateProduct = useCallback(
    (productId: string, updates: Partial<ProductWithUI>) => {
      setProducts((prev) =>
        prev.map((product) => (product.id === productId ? { ...product, ...updates } : product))
      );
      addNotification('상품이 수정되었습니다.', 'success');
    },
    [setProducts, addNotification]
  );

  const deleteProduct = useCallback(
    (productId: string) => {
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      addNotification('상품이 삭제되었습니다.', 'success');
    },
    [setProducts, addNotification]
  );

  return {
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
