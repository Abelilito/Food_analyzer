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
  dataId: string | undefined;
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

  const getNutrimentStatus = (value: number, allValues: number[]): "max" | "multipleMax" | "normal" => {
    const maxValue = Math.max(...allValues);
    const maxCount = allValues.filter(v => v === maxValue).length;

    if (value === maxValue && maxCount > 1) return "multipleMax"; 
    if (value === maxValue) return "max"; 
    return "normal"; 
  }

  const allProteins = productsSelected.map(p => safeNumber(p.nutriments.proteins));
  const allCalories = productsSelected.map(p => safeNumber(p.nutriments["energy-kcal"]));
  const allSugars = productsSelected.map(p => safeNumber(p.nutriments.sugars));
  const allSalt = productsSelected.map(p => safeNumber(p.nutriments.salt));
  const allFat = productsSelected.map(p => safeNumber(p.nutriments.fat));

  const tableRowItems = (nutriments: Product["nutriments"]): (NutrimentItem & {status: "max" | "multipleMax" | "normal"})[] => [
    {
      name: "Proteines",
      unit: "g",
      dataId: highestProtein?.id,
      img: proteinImg,
      nutrimentsValue: safeNumber(nutriments.proteins),
      percentage: safePercentage(nutriments.proteins, highestProtein?.nutriments.proteins),
      status: getNutrimentStatus(safeNumber(nutriments.proteins), allProteins)
    },
    {
      name: "Calories",
      unit: "kcal",
      dataId: highestKcal?.id,
      img: kcalImg,
      nutrimentsValue: safeNumber(nutriments["energy-kcal"]),
      percentage: safePercentage(nutriments["energy-kcal"], highestKcal?.nutriments["energy-kcal"]),
      status: getNutrimentStatus(safeNumber(nutriments["energy-kcal"]), allCalories)
    },
    {
      name: "Sucres",
      unit: "g",
      dataId: highestSugars?.id,
      img: sugarImg,
      nutrimentsValue: safeNumber(nutriments.sugars),
      percentage: safePercentage(nutriments.sugars, highestSugars?.nutriments.sugars),
      status: getNutrimentStatus(safeNumber(nutriments.sugars), allSugars)
    },
    {
      name: "Sels",
      unit: "g",
      dataId: highestSalt?.id,
      img: saltImg,
      nutrimentsValue: safeNumber(nutriments.salt),
      percentage: safePercentage(nutriments.salt, highestSalt?.nutriments.salt),
      status: getNutrimentStatus(safeNumber(nutriments.salt), allSalt)
    },
    {
      name: "Gras",
      unit: "g",
      dataId: highestFat?.id,
      img: fatImg,
      nutrimentsValue: safeNumber(nutriments.fat),
      percentage: safePercentage(nutriments.fat, highestFat?.nutriments.fat),
      status: getNutrimentStatus(safeNumber(nutriments.fat), allFat)
    }
  ]

  return (
    <div className="w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Comparateur (x{productsSelected.length})</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableBody>
                {productsSelected.map((product, index) =>
                  <TableRow key={index}>
                    <TableCell>
                      <div className="className='h-[90px] w-[90px] flex justify-center items-center">
                        <img
                          src={product.image_url}
                          title={product.product_name_fr}
                          alt={product.product_name_fr}
                        />
                      </div>
                    </TableCell>

                    {tableRowItems(product.nutriments).map((item, index) => 
                      <TableCell key={index}>
                        <div className="flex flex-row justify-center">
                          <div className="w-[75px] h-[75px] md:w-[90px] md:h-[90px]">
                            <CircularProgressbarWithChildren
                              value={item.percentage}
                              styles={buildStyles({
                                pathColor:
                                  item.status === "max" || item.status === "multipleMax" ? "#30A46C" : "#E5484D"
                              })}
                            >
                              <ToolTip icon={item.img} text={item.name} />

                              <div className="text-[9px] md:text-[12px] mt-0.5" >
                                <strong
                                  className={
                                    item.status === "max" || item.status === "multipleMax"
                                      ? 'text-[#30A46C]'
                                      : 'text-[#E5484D]'
                                  }
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
