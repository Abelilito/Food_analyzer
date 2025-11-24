import { HeartCrack, HeartPlus } from "lucide-react";
import ToolTip from "../ToolTip";

type ScoreItem = {
  nutriscore: string | undefined;
  sugarLevel: number
}

export const Score = ({ nutriscore, sugarLevel}: ScoreItem) => {
  if ((nutriscore === "a" || nutriscore === "b") && (sugarLevel < 10)) {
    return (
      <ToolTip 
        icon={<HeartPlus color="#30A46C" />} 
        text={
          'Produit sain car le nutriscore est de ' + nutriscore + ' et le taux de sucre est < à 10g'
        } />
    )
    
  } else {
    return (
      <ToolTip 
        icon={<HeartCrack color="#E5484D" />}
        text={
          'Produit malsain car le nutriscore est de ' + nutriscore?.toUpperCase() + ' et le taux de sucre est < à 10g'
        } />
    )
  }
}
