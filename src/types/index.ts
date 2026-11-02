export type BookCategory = "Science" | "History" | "Kids" | "Others" | "Fiction";

export interface Book {
  id: string;
  _id?: string;
  title: string;
  author: string;
  category: BookCategory;
  coverGradient?: string;
  coverThemeColor?: string;
  motif?: string;
  totalCopies?: number;
  availableCopies?: number;
  copies?: string | number;
  addedDate?: string;
  description: string;
  isbn?: string;
  pages?: number;
  rating?: number;
  image?: string;
}

export interface IBook {
  _id: string;
  title: string;
  author: string;
  category: BookCategory;
  copies: string;
  image: string;
  description: string;
}

export interface CategoryInfo {
  id: string;
  name: BookCategory;
  subtitle: string;
  count: number;
  iconName: "book" | "atom" | "history" | "sparkles" | "palette";
}

export interface ReaderReview {
  id: string;
  quote: string;
  rating: number;
  badgeText: string;
  reviewer: {
    name: string;
    title: string;
    avatarInitials: string;
    avatarColor: string;
  };
}

export interface HeroSlide {
  id: string;
  slideTag: string;
  titlePart1: string;
  highlightedPart: string;
  titlePart2: string;
  description: string;
  ctaText: string;
  bgImageUrl: string;
  badgeLabel: string;
}

export interface WorkflowStep {
  stepNumber: string;
  title: string;
  description: string;
  badge1: string;
  badge2: string;
}
