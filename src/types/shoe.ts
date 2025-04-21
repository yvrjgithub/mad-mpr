export interface ShoeModel {
  id?: string;           // Document ID from Firestore
  name: string;          // Corresponds to "Name" in Flutter model
  detailName: string;    // Corresponds to "DetailName" in Flutter model
  price: number;
  imgAddress: string;
  quantity?: number;
  availableSizes?: string[];
  availableColors?: string[];
  selectedSize?: string;
  selectedColor?: string;
  brand?: string;        // Used in favorites
}