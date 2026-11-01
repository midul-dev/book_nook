import { CategoryInfo } from "@/types";

export const initialCategories: CategoryInfo[] = [
  {
    id: "cat-fiction",
    name: "Fiction",
    subtitle: "Novels & Literary Stories",
    count: 1,
    iconName: "book",
  },
  {
    id: "cat-science",
    name: "Science",
    subtitle: "Physics, Biology & Cosmos",
    count: 2,
    iconName: "atom",
  },
  {
    id: "cat-history",
    name: "History",
    subtitle: "Civilizations & Archives",
    count: 2,
    iconName: "history",
  },
  {
    id: "cat-kids",
    name: "Kids",
    subtitle: "Illustrated Young Readers",
    count: 1,
    iconName: "sparkles",
  },
  {
    id: "cat-others",
    name: "Others",
    subtitle: "Design, Art & Essays",
    count: 1,
    iconName: "palette",
  },
];
