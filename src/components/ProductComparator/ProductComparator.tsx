import { Product } from '@/Type/ProductType'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Check, X } from 'lucide-react';

export const ProductComparator = ({ productsSelected } : { productsSelected: Product[]}) => {  
  const highestProtein = productsSelected.reduce((max, item) => {
    return item.nutriments.proteins > max.nutriments.proteins ? item : max
  });

  const highestKcal = productsSelected.reduce((max, item) => {  
    return item.nutriments["energy-kcal"] > max.nutriments["energy-kcal"] ?  item : max
  });

  const highestSugars = productsSelected.reduce((max, item) => {  
    return item.nutriments.sugars > max.nutriments.sugars ?  item : max
  });

  const highestSalt = productsSelected.reduce((max, item) => {  
    return item.nutriments.salt > max.nutriments.salt ?  item : max
  });

  const highestFat = productsSelected.reduce((max, item) => {  
    return item.nutriments.fat > max.nutriments.fat ?  item : max
  });

  const tableRowItems = [{
    value: "Proteine - g",
    dataId: highestProtein.id 
  }, {
    value: "Calories - Kcal",
    dataId: highestKcal.id 
  }, {
    value: "Sucre - g",
    dataId: highestSugars.id 
  }, {
    value: "Sel - g",
    dataId: highestSalt.id 
  }, {
    value: "Gras - g",
    dataId: highestFat.id 
  }]

  const productName = (product: Product) => {
    return product.quantity_imported
    ? `${product.product_name_fr} - ${product.quantity_imported}`
    : product.product_name_fr
  }


  return (
    <div className="flex justify-center gap-8">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Comparateur</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Valeurs</TableHead>
                  {productsSelected.map((product, index) =>
                    <TableHead className="w-[100px]" key={index}>{productName(product)}</TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {tableRowItems.map((item) => 
                  <TableRow>
                    <TableCell className="font-medium">{item.value}</TableCell>
                    {productsSelected.map((product, index) =>
                      <TableCell key={index} className="felx flex-row justify-center">
                        {
                          item.dataId === product.id
                          ? <Check size={25} strokeWidth={2.25} color='#218358' /> 
                          : <X size={25} strokeWidth={2.25} color='#CE2C31' />
                        }
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>            
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
