export interface Wardrobe {
  [key: string]: Clothing[];
}
export interface Clothing {
  id: string;
  category: string;
  color: string;
  image: string;
}

export type SelectedItem = {
  clothing: Clothing;
  section: string;
};

export type ClothSections = 'tops' | 'bottoms' | 'fullbody';
