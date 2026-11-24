export type Category = "Docs" | "Video" | "Article";

export type Resource = {
  id: number;
  title: string;
  category: Category;
  minutes: number;
};

export type NewResource = Omit<Resource, "id">; // a Resource without the id
