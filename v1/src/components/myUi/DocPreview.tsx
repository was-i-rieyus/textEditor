import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

type Props = {
  docId: string;
  docName: string;
  docDesc: string;
};
export const DocPreview = ({ docId, docName, docDesc }: Props) => {
  return (
    <div>
      <HoverCard>
        <HoverCardTrigger asChild>
          <div
            className="bg-white w-[170px] h-[210px] text-black
         flex items-center justify-center
         shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]
         hover:scale-[1.025] transition"
          ></div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@{docName}</h4>
              <p className="text-sm">
                {docDesc}
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};
