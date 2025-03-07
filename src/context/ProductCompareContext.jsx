import React, { createContext, useState, useContext, useEffect } from "react";

const ProductCompareContext = createContext();

export const useProductCompare = () => useContext(ProductCompareContext);

export const ProductCompareProvider = ({ children }) => {
  const [compareProducts, setCompareProducts] = useState([]);
  const [highlightedAttributes, setHighlightedAttributes] = useState([]);

  useEffect(() => {
    if (compareProducts.length > 0) {
      const attributes = new Set();
      compareProducts.forEach(product => {
        Object.keys(product).forEach(key => {
          if (key !== 'id' && key !== 'images' && key !== 'thumbnail') {
            attributes.add(key);
          }
        });
      });
      setHighlightedAttributes(Array.from(attributes));
    } else {
      setHighlightedAttributes([]);
    }
  }, [compareProducts]);

  const addProductToCompare = (product) => {
    if (compareProducts.length >= 4) {
      alert("You can only compare up to 4 products at a time.");
      return false;
    }

    if (compareProducts.some((p) => p.id === product.id)) {
      alert("This product is already in your comparison list.");
      return false;
    }

    setCompareProducts([...compareProducts, product]);
    return true;
  };

  const removeProductFromCompare = (productId) => {
    setCompareProducts(
      compareProducts.filter((product) => product.id !== productId)
    );
  };

  const clearCompareProducts = () => {
    setCompareProducts([]);
  };

  const isAttributeHighlighted = (attributeName) => {
    return highlightedAttributes.includes(attributeName);
  };

  const getHighlightedAttributes = (productId) => {
    const product = compareProducts.find(p => p.id === productId);
    if (!product) return [];
    return highlightedAttributes;
  };

  return (
    <ProductCompareContext.Provider
      value={{
        compareProducts,
        addProductToCompare,
        removeProductFromCompare,
        clearCompareProducts,
        highlightedAttributes,
        isAttributeHighlighted,
        getHighlightedAttributes,
      }}
    >
      {children}
    </ProductCompareContext.Provider>
  );
};
