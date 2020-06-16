export interface Materiel {
  id: string;
  nom: string;
  code: string;
  marque: string;
  status?: string;
  etat?: string;
  image?;
  appareilId?: string;
  appareil_nom?;
  reference?: string;
  nombre: any;
}
