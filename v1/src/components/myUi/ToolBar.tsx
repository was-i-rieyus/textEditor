import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Toolbar = () => {
  return (
    <div className="w-full h-[5%] bg-[#F9FBFD] flex justify-center items-center">
      <div id="styles prose prose-lg ">
        <Select defaultValue="normal">
          <SelectTrigger className="w-[180px] border-none bg-[#F9FBFD] shadow-none focus:border-none focus:ring-0 p-0 m-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="m-0 p-0">
            <SelectGroup className="m-0 p-0">

              <SelectItem value="h1" className="flex font-semibold items-center scale-[0.8] text-3xl m-0 p-0"><h1>Heading 1</h1></SelectItem>
              <SelectItem value="h2" className="flex font-semibold items-center scale-[0.8] text-2xl"><h2>Heading 2</h2></SelectItem>
              <SelectItem value="h3" className="flex font-semibold items-center scale-[0.8] text-xl"><h3>Heading 3</h3></SelectItem>
              <SelectItem value="h4" className="flex  items-center scale-[0.8] text-lg"><h4>Heading 4</h4></SelectItem>
              <SelectItem value="h5" className="flex items-center scale-[0.8] text-md"><h5>Heading 5</h5></SelectItem>
              <SelectItem value="normal" className="flex font-semibold items-center scale-[0.8] text-md"><p>Normal</p></SelectItem>
              
              
              
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Toolbar;
