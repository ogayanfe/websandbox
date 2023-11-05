import SearchIcon from "@mui/icons-material/Search";

type SearchFormComponentType = {
  placeholder?: string;
  label?: string;
  onSubmit?: () => void;
  icon?: React.FC;
};

export default function SearchFormComponent(props: SearchFormComponentType) {
  const { placeholder = "Search", label = "search", onSubmit, icon = <SearchIcon /> } = props;
  return (
    <form
      className="w-max bg-inherit p-2 rounded-2xl border-[1px] text-xm  flex items-center text-gray-300 justify-center"
      onSubmit={onSubmit}
    >
      <label htmlFor="header__search" className="flex items-center justify-center"></label>
      <>
        <span className="fixed left-[-3000000px]">{label}</span>
        {icon}
      </>
      <input
        type="text"
        name="search"
        id="header__search"
        placeholder={placeholder}
        className="transition-all bg-inherit outline-none px-2 text-xm w-32 focus:w-36 md:w-48 focus:md:w-64 lg:w-64 focus:lg:w-80 2xl:w-80 focus:2xl:w-96"
      />
    </form>
  );
}
