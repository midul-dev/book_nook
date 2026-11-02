export type BookCategory = "Science" | "History" | "Kids" | "Others" | "Fiction";


export interface IBook {
  _id: string;
  title: string;
  author: string;
  category: BookCategory;
  copies: string;
  image: string;
  description: string;
  createdAt: string;
}

export interface ICategoryInfo {
  id: string;
  name: BookCategory;
  subtitle: string;
  count: number;
  iconName: "book" | "atom" | "history" | "sparkles" | "palette";
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
