import { WorkflowStep } from "@/types";

export const workflowSteps: WorkflowStep[] = [
  {
    stepNumber: "01",
    title: "Discover & Check Copies",
    description:
      "Browse our public catalog by category or search by author. Every card shows live available copies so you never waste time on out-of-stock books.",
    badge1: "Public Route: /books",
    badge2: "Real-time Stock",
  },
  {
    stepNumber: "02",
    title: "Confirm Your Borrow",
    description:
      "Open Book Details and click 'Borrow This Book'. Your BetterAuth profile pre-fills your name and email while MongoDB atomically decrements the copy count with $inc: -1.",
    badge1: "No Double-Borrow Guard",
    badge2: "JWT Protected",
  },
  {
    stepNumber: "03",
    title: "Read & Return Anytime",
    description:
      "Visit 'My Borrows' whenever you finish reading. One click on 'Return Book' removes your loan record and restores the copy count with $inc: +1.",
    badge1: "Private Route: /my-borrows",
    badge2: "Instant Return",
  },
];
