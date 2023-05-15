export interface Wardrobe {
  tops: Clothing[];
  bottoms: Clothing[];
  fullbody: Clothing[];
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
