export function nutrimentsImg() {
  const kcalImg = <img src= "./kcal.png" className="w-[30px] object-contain" />
  const proteinImg = <img src= "./protein.png" className="w-[30px] object-contain" />
  const sugarImg = <img src= "./sugar.png" className="w-[30px] object-contain" />
  const saltImg = <img src= "./salt.png" className="w-[30px] object-contain" />
  const fatImg = <img src= "./fat.png" className="w-[30px] object-contain" />

  return {kcalImg, proteinImg, sugarImg, saltImg, fatImg}
}