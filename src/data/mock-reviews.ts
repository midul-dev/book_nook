import { ReaderReview } from "@/types";

export const initialReviews: ReaderReview[] = [
  {
    id: "rev-1",
    rating: 5,
    badgeText: "Borrowed 14 Books",
    quote:
      "“BookNook completely replaced my habit of buying books I only read once. I uploaded three history hardcovers last month and borrowed Cosmos and The Silk Roads the same afternoon.”",
    reviewer: {
      name: "Tariqul Karim",
      title: "Architecture Student & History Contributor",
      avatarInitials: "TK",
      avatarColor: "bg-emerald-800 text-emerald-100",
    },
  },
  {
    id: "rev-2",
    rating: 5,
    badgeText: "Added 9 Books",
    quote:
      "“I love how clear the copy counter is. Knowing immediately whether a Kids or Science book has copies available saves so much guesswork, and returning a book takes one click.”",
    reviewer: {
      name: "Samira Nawar",
      title: "Middle School Science Educator",
      avatarInitials: "SN",
      avatarColor: "bg-amber-600 text-amber-50",
    },
  },
  {
    id: "rev-3",
    rating: 5,
    badgeText: "Borrowed 21 Books",
    quote:
      "“The warm paper aesthetic makes browsing feel like standing inside an independent bookshop. Managing my contributed books and editing descriptions in My Books is effortless.”",
    reviewer: {
      name: "Mahmudur Chowdhury",
      title: "Software Engineer & Sci-Fi Reader",
      avatarInitials: "MR",
      avatarColor: "bg-slate-900 text-slate-100 border border-slate-700",
    },
  },
];
