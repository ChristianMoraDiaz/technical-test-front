export interface Employee {
  id: number;
  name: string;
  version: number;
  supervisor?: { id: number; name: string };
  subordinates: { id: number; name: string }[];
  director: boolean;
}

export const profilePicture =
  "https://icones.pro/wp-content/uploads/2021/02/icone-utilisateur-gris.png";
