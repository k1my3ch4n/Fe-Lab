export type Difficulty = "junior" | "mid" | "senior";

export interface Topic {
  id: string;
  name: string;
  category: string;
  difficulty: Difficulty;
  color: string;
  implemented: boolean;
}

export interface Category {
  name: string;
  topics: Topic[];
}
