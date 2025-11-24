import ToolTip from '../ToolTip';
import { Product } from '@/Type/ProductType';
import { highestNutrimentValue } from '@/utils/highestNutrimentValue';
import { nutrimentsImg } from '@/utils/nutrimentsImg';

type NutrimentsProps = {
  productId: string;
  getProducts: Product[];
};

export const NutrimentsBadge = ({ getProducts, productId }: NutrimentsProps) => {
  const { kcalImg, proteinImg, sugarImg } = nutrimentsImg();
  const { highestProtein, highestKcal, highestSugars } = highestNutrimentValue(getProducts);


  if (highestKcal || highestProtein || highestSugars) {
    return (
      <div className="mt-[15px] flex gap-4">
        {highestKcal.id === productId && <ToolTip icon={kcalImg} text="Ce produit est le plus riche en calorie" />}
        {highestProtein.id === productId && <ToolTip icon={proteinImg} text="Ce produit est le plus riche en protéines" />}
        {highestSugars.id === productId && <ToolTip icon={sugarImg} text="Ce produit est le plus riche en sucre" />}
      </div>
    )
  }
}
