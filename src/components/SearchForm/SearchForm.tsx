type SearchFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeFn: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export const SearchForm = ({ onSubmit, onChangeFn, value }: SearchFormProps) => {
  return (
    <form onSubmit={onSubmit} className='flex gap-4 flex-col md:justify-center md:flex-row w-full'>
      <input
        name="food_name"
        className="
          border-[#737373] border border-solid p-6 h-12 rounded-md text-[0.8rem] focus:border-[#6d28d9] 
          focus-visible:outline-none w-full md:w-[43%] lg:w-[28%]
        "      
        value={value}
        onChange={onChangeFn}
      />
      <button type="submit" className="
        bg-[#6d28d9] border-[#6d28d9] text-white w-full md:w-[15%] lg:w-[11%] p-[13px] text-[1rem] rounded-md 
        font-medium font-sans
      ">
        Recherche
      </button>
    </form>
  )
}
