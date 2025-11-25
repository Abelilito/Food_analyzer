import { Accordion } from "@radix-ui/react-accordion";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { ProductCardType } from "@/Type/ProductCardType";
import ProductCard from "../ProductCard";

export const Recommendation = ({ item, products }: ProductCardType) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
      <AccordionTrigger>Recommandation</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4">
          <div className="text-center">Nous vous recommandons ce produit qui est le plus sain dans la liste</div>
          <ProductCard products={products} item={item} />
        </AccordionContent>
        </AccordionItem>
    </Accordion>
  )
}
