import ToolTip from '../ToolTip';
import { CandyCane } from 'lucide-react';
import { Product } from '@/Type/ProductType';
import { highestNutrimentValue } from '@/utils/highestNutrimentValue';

type NutrimentsProps = {
  productId: string;
  getProducts: Product[];
};

export const NutrimentsBadge = ({ getProducts, productId }: NutrimentsProps) => {
  const kcalImg = <img src= "./kcal.png" className="w-[30px] object-contain" />
  const proteinImg = <img src= "./protein.png" className="w-10 object-contain" />
  const { highestProtein, highestKcal, highestSugars } = highestNutrimentValue(getProducts)


  if (highestKcal || highestProtein || highestSugars) {
    return (
      <div className="mt-[15px] flex gap-4">
        {highestKcal.id === productId && <ToolTip icon={kcalImg} text="Ce produit est le moins calorique" />}
        {highestProtein.id === productId && <ToolTip icon={proteinImg} text="Ce produit est le plus riche en protéines" />}
        {highestSugars.id === productId && <ToolTip icon={<CandyCane color="#AD7F58" />} text="Ce produit est le plus riche en sucre" />}
      </div>
    )
  }
}
