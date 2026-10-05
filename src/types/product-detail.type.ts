export type ProductVariant = {
  id: string;
  size: string;
  stockQty: number;
  sellingPriceOverride?: number;
};

export type ProductCategory = {
  id: string;
  name: string;
};

export type ProductColor = {
  id: string;
  colorName: string;
  colorHex?: string;
  images: string[];
  variants: ProductVariant[];
};

export type ProductDetail = {
  id: string;
  slug: string;
  name: string;
  category?: ProductCategory;
  sellingPrice: number;
  description?: string;
  colors: ProductColor[];
};

export type BreadcrumbItemData = {
  label: string;
  href?: string;
};

export type ProductGalleryProps = {
  images: string[];
  productName: string;
};

export type ProductInfoProps = {
  product: ProductDetail;
  onColorChange?: (colorId: string) => void;
};

export type ColorSelectorProps = {
  colors: ProductColor[];
  selectedColorId: string;
  onChange: (colorId: string) => void;
};

export type SizeSelectorProps = {
  variants: ProductVariant[];
  selectedVariantId?: string;
  onChange: (variantId: string) => void;
};

export type QuantitySelectorProps = {
  value: number;
  min?: number;
  max: number;
  onChange: (value: number) => void;
  disabled?: boolean;
};

export type AddToCartBarProps = {
  price: number;
  canAdd: boolean;
  label: string;
  onAdd: () => void;
};

export type ProductDetailProps = {
  product: ProductDetail;
};