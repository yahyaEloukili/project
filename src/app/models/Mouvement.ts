export interface Mouvement {
  id: string;
  destination: string;
  typeMouvement: string;
  imagesEtat?: string;
  appareil?;
  user?;
  read?;
  valide?;
  annule?;


}
