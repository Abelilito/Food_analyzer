import { Product } from "@/Type/ProductType";
import { Accordion } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import Card from "../Card";

type CardType = {
  item: Product;
  products: Product[];
}

export const Recommendation = ({ item, products }: CardType) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
      <AccordionTrigger>Recommandation</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div>Nous vous recommandons ce produit qui est le plus sain dans la liste</div>
          <Card products={products} item={item} />
        </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}
