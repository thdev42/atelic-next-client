import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectField = ({ placeholder, options = [] }) => {
  return (
    <Select>
      <SelectTrigger className="2xl:text-[20px] font-normal 2xl:min-h-[70px] px-6 py-4 h-auto rounded-full bg-white text-black shadow-md text-sm data-[placeholder]:text-black [&_svg]:text-black [&_svg]:opacity-60 [&_svg]:h-7 [&_svg]:w-7">
        <span className="pl-6 block w-full text-left">
          <SelectValue placeholder={placeholder} />
        </span>
      </SelectTrigger>
      <SelectContent className="bg-white text-black rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className="font-sora px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 transition rounded-md focus:bg-gray-100"
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
