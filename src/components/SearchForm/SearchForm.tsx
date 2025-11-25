import { SearchIcon } from "lucide-react";
import { ButtonGroup } from "../ui/button-group";

type SearchFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchForm = ({ onSubmit, onChangeFn }: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <ButtonGroup>
        <input
          name="food_name"
          className="
            border-[#737373] border border-solid p-6 h-12 rounded-md text-[0.8rem] focus:border-[#6d28d9] 
            focus-visible:outline-none  md:w-[335px] w-full
          "
          placeholder="Chercher un produit"
          onChange={onChangeFn}
        />

        <button type="submit" className="
          bg-[#6d28d9] hover:bg-[#8E4EC6] border-[#6d28d9] text-white p-[13px] text-[1rem] rounded-md font-medium
          font-sans
        ">
          <SearchIcon />
        </button>
      </ButtonGroup>
    </form>
  )
}
