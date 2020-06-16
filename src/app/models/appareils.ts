export interface Appareil {
  id: string;
  nom: string;
  code: string;
  marque: string;
  fournisseur?: string;
  status?: string;
  etat?: string;
  photo?;

  fiche?: any;
  categorie_nom?: string;
  stock_nom?: string;
  certificat?: string;
  categorieId?: string;
  stockId?: string;
  dernier_etalonnage: any;
  remarques: string;
  matricule: string;
  reference: string;
  numero_serie: string;
  frequence: any;


}
