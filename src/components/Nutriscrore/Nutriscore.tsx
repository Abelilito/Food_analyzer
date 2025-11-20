import React from "react";

export const Nutriscore = ({ nutriscore }: {nutriscore: string | undefined}) => {
  function imageSrc() {
    switch (nutriscore) {
      case "a":
        return "./nutri-score-A.svg";
      case "b":
        return "./nutri-score-B.png";
      case "c":
        return "./nutri-score-C.png";
      case "d":
        return "./nutri-score-D.png";
      case "e":
        return "./nutri-score-E.svg";
    }
  }

  return (
    <>
      <img src={imageSrc()} className="w-[100px]" />
    </>
  );
};
