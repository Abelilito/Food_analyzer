import { Product } from '@/Type/ProductType'
import { productName } from '@/utils/productName';
import { Check, X } from 'lucide-react';
import { highestNutrimentValue } from '@/utils/highestNutrimentValue';
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

export const ProductComparator = ({ productsSelected } : { productsSelected: Product[]}) => {  
  const { highestProtein, highestKcal, highestSugars, highestSalt, highestFat } = highestNutrimentValue(productsSelected)

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

  return (
    <div className="flex justify-center gap-8">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Comparateur</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]"></TableHead>
                  {tableRowItems.map((item, index) =>
                    <TableHead className="font-bold" key={index}>{item.value}</TableHead>
                  )}
                </TableRow>
              </TableHeader>

              <TableBody>
                {productsSelected.map((product, index) =>
                  <TableRow key={index}>
                    <TableCell>{productName(product)}</TableCell>
                    {tableRowItems.map((item, index) => 
                      <TableCell key={index}>
                        <div className="flex flex-row justify-center">
                          {
                            item.dataId === product.id
                            ? <Check size={25} strokeWidth={2.25} color='#218358' /> 
                            : <X size={25} strokeWidth={2.25} color='#CE2C31' />
                          }
                        </div>
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
