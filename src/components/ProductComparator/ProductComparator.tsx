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
  TableRow,
} from "@/components/ui/table"
import { buildStyles, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ToolTip from '../ToolTip';
import { comparisonNutriments } from '@/utils/comparisonNutriments';

export const ProductComparator = ({ productsSelected } : { productsSelected: Product[]}) => {  
  const { tableRowItems } = comparisonNutriments(productsSelected);

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
