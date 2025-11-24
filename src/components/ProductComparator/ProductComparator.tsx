import { Product } from '@/Type/ProductType'
import { productName } from '@/utils/productName';
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
  TableRow,
} from "@/components/ui/table"
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { nutrimentsImg } from '@/utils/nutrimentsImg';
import ToolTip from '../ToolTip';

type NutrimentItem = {
  name: string;
  unit: string;
  dataId: string;
  img: React.ReactNode;
  nutrimentsValue: number;
  percentage: number;
}

export const ProductComparator = ({ productsSelected } : { productsSelected: Product[]}) => {  
  const { highestProtein, highestKcal, highestSugars, highestSalt, highestFat } = highestNutrimentValue(productsSelected);
  const { kcalImg, proteinImg, sugarImg, saltImg, fatImg } = nutrimentsImg();
  
  const safeNumber = (value: number | string | undefined): number => {
    if (value === undefined || value === null) return 0;
    return typeof value === 'number' ? value : parseFloat(value);
  }

  const safePercentage = (value: number | string | undefined, max: number | string | undefined): number => {
    const num = safeNumber(value);
    const maxNum = safeNumber(max);
    if (maxNum === 0) return 0;
    return (num / maxNum) * 100;
  }

  const tableRowItems = (nutriments: Product["nutriments"]): NutrimentItem[] => {
    return [{
      name: "Proteines",
      unit: "g",
      dataId: highestProtein.id,
      img: proteinImg,
      nutrimentsValue: safeNumber(nutriments.proteins),
      percentage: safePercentage(nutriments.proteins, highestProtein.nutriments.proteins)
    }, {
      name: "Calories",
      unit: "kcal",
      dataId: highestKcal.id,
      img: kcalImg,
      nutrimentsValue: nutriments["energy-kcal"],
      percentage: safePercentage(nutriments["energy-kcal"], highestKcal.nutriments["energy-kcal"])
    }, {
      name: "Sucres",
      unit: "g",
      dataId: highestSugars.id,
      img: sugarImg,
      nutrimentsValue: nutriments.sugars,
      percentage: safePercentage(nutriments.sugars, highestSugars.nutriments.sugars)
    }, {
      name: "Sels",
      unit: "g",
      dataId: highestSalt.id,
      img: saltImg,
      nutrimentsValue: safeNumber(nutriments.salt),
      percentage: safePercentage(nutriments.salt, highestSalt.nutriments.salt)
    }, {
      name: "Gras",
      unit: "g",
      dataId: highestFat.id,
      img: fatImg,
      nutrimentsValue: safeNumber(nutriments.fat),
      percentage: safePercentage(nutriments.fat, highestFat.nutriments.fat)
    }]
  }

  return (
    <div className="flex justify-center gap-8">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Comparateur</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                {productsSelected.map((product, index) =>
                  <TableRow key={index}>
                    <TableCell className="font-bold">{productName(product)}</TableCell>
                    {tableRowItems(product.nutriments).map((item, index) => 
                      <TableCell key={index}>
                        <div className="flex flex-row justify-center">
                          <div style={{ width: 90, height: 90 }}>
                            <CircularProgressbarWithChildren value={item.percentage} styles={buildStyles({
                              pathColor: item.dataId === product.id ? '#30A46C' : '#E5484D'
                            })}>
                              <ToolTip icon={item.img} text={item.name} />
                              <div style={{ fontSize: 12, marginTop: 2 }}>
                                <strong 
                                className={ item.dataId === product.id ? 'text-[#30A46C]' : 'text-[#E5484D]' }
                                >
                                  {item.nutrimentsValue} {item.unit}
                                </strong>
                              </div>
                            </CircularProgressbarWithChildren>
                          </div>
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
