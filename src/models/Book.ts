export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  rentalPricePerWeek: number;
  categories: string[];
  coverImage: string;
  available: boolean;
  tags: string[];
}
