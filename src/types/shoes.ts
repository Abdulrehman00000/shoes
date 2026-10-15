export interface Colorway {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export interface Shoe {
  id: string;
  name: string;
  subname: string;
  category: 'oxford' | 'monkstrap' | 'loafer' | 'derby' | 'boot';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  image: string;
  secondaryImage?: string;
  leather: string;
  construction: string;
  sole: string;
  last: string;
  description: string;
  colorways: Colorway[];
  sizes: number[];
  tag?: string;
  artisanHours: number;
  featured?: boolean;
}

export interface CartItem {
  id: string; // unique cart entry ID
  shoeId: string;
  shoe: Shoe;
  size: number;
  width: 'Standard (D)' | 'Wide (EE)';
  selectedColorway: string;
  monogram?: string;
  soleFinish?: string;
  quantity: number;
  customPrice: number;
}

export interface BespokeConfig {
  shoeId: string;
  colorway: string;
  leatherType: 'French Box Calf' | 'Museum Calf Patina' | 'Bavarian Pebble' | 'Exotic Croc Emboss';
  soleType: 'Hand-Chiseled Oak Bark Leather' | 'Commando Vibram Lug' | 'Parisian Beveled Waist';
  monogram: string;
  size: number;
  width: 'Standard (D)' | 'Wide (EE)';
  currentAngle: 'profile' | 'angle' | 'toe' | 'sole' | 'overhead';
}
