import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "../ui/button";
import Image from "next/image";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
type Props = {
  docId: string;
  docName: string;
  docDesc: string;
  previewImg: string | null;
  url: string;
  deleteDocument: (docID: string) => Promise<void>;
  updateDocument: (
    docID: string,
    docName: string,
    docDesc: string
  ) => Promise<void>;
};
export const DocPreview = ({
  docId,
  docName,
  docDesc,
  previewImg,
  url,
  deleteDocument,
  updateDocument,
}: Props) => {
  const [ddopt, setDdopt] = useState("");
  const [newDocName, setNewDocName] = useState("");
  const [newDocDesc, setNewDocDesc] = useState("");

  useEffect(() => {
    setNewDocName(docName);
    setNewDocDesc(docDesc);
  }, [docName, docDesc]);
  // FIX PASSED DELETE DOC AND UPDATEDOC AS PROPS, HANDLE
  const handleDocDelete = async () => {
    await deleteDocument(docId);
  };

  const handleDocumentUpdate = async () => {
    if (!newDocName) {
      toast.error("Please fill all fields");
      return;
    }
    await updateDocument(docId, newDocName, newDocDesc);
  };

  return (
    <div className="border border-grey hover:scale-[1.025] transition">
      <HoverCard>
        <HoverCardTrigger asChild>
          <div className="flex flex-col items-center ">
            <Link href={url}>
              <div
                className="bg-white w-[170px] h-[210px] text-black
         flex items-center justify-center
         border-b border-gray p-2"
              >
                {previewImg && (
                  <Image
                    src={previewImg}
                    width={170}
                    height={210}
                    alt={`${docName}`}
                    className="h-auto object-cover"
                  />
                )}
              </div>
            </Link>
          </div>
        </HoverCardTrigger>
        <HoverCardContent className="w-80">
          <div className="flex space-x-4">
            <Avatar>
              <AvatarImage src="https://github.com/vercel.png" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@{docName}</h4>
              <p className="text-sm">{docDesc}</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
      <div className="relative flex justify-ends w-full">
        <p className="text-sm m-2 grow text-center">{docName}</p>
        <span className="absolute right-0 top-0.5 flex items-center justify-center mr-1 p-1">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-center outline-none">
                <DotsVerticalIcon height={25} className="outline-none" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => {
                      setDdopt("1");
                    }}
                  >
                    Rename
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogTrigger asChild>
                  <DropdownMenuItem
                    onClick={() => {
                      setDdopt("2");
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* FIX */}
            {/* TO HANDLE RENAME DOCUMENT */}
            {ddopt == "1" && (
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      // defaultValue={newDocName}
                      className="col-span-3"
                      value={newDocName}
                      onChange={(e) => {
                        setNewDocName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="docDesc" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="docDesc"
                      placeholder="Enter document description"
                      className="col-span-3"
                      value={newDocDesc}
                      onChange={(e) => {
                        setNewDocDesc(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button type="submit" onClick={handleDocumentUpdate}>
                      Save changes
                    </Button>
                  </DialogTrigger>
                </DialogFooter>
              </DialogContent>
            )}

            {/* FIX */}
            {/* TO HANDLE DELETE DOCUMENT */}
            {ddopt == "2" && (
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this document. <br />
                    This action cannot be undone. <br />
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogTrigger asChild>
                    <Button type="submit" className="dark outline-none">
                      Cancel
                    </Button>
                  </DialogTrigger>
                  <Button
                    type="submit"
                    variant={"destructive"}
                    onClick={handleDocDelete}
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            )}
          </Dialog>
        </span>
      </div>
    </div>
  );
};
