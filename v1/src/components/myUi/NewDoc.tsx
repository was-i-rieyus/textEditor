import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Plus, LoaderPinwheel } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  documentType?: string; // Make this prop optional
};

export const NewDoc = ({ documentType }: Props) => {
  const [docName, setDocName] = useState("");
  const [docId, setDocId] = useState("");
  const [docDesc, setDocDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function createDocumentHandler() {
    // VALIDATE INPUT
    setIsLoading(true);
    try {
      if (!docName || !docId || !docDesc) {
        toast.error("Please fill all fields");
        setIsLoading(false);
        return;
      }
      const data = {
        docName,
        docId,
        docDesc,
      };

      // TRY CREATING DOCUMENT
      const response = await fetch(`http://localhost:3002/documents`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        toast.error(result.error);
        setIsLoading(false);
        return;
      }

      // SUCCESSFULLY CREATED DOCUMENT // REDIRECT
      if (response.status === 201) {
        toast.success("Document created successfully");
        router.push(`/documents/${docId}`);
        return;
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      {/* HANDLE CLICK DOCUMENT CREATE */}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-white w-[170px] h-[210px] text-black
             flex items-center justify-center
             shadow-[0px_2px_8px_0px_rgba(99,99,99,0.2)]
             hover:scale-[1.025] transition"
          >
            <Plus color="grey" size={25} />
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create a new document</DialogTitle>
            <DialogDescription>Enter document details below</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* DOCUMENT NAME */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docName" className="text-right">
                Name
              </Label>
              <Input
                id="docName"
                placeholder="Untitled"
                className="col-span-3"
                value={docName}
                onChange={(e) => {
                  setDocName(e.target.value);
                  setDocId(
                    e.target.value
                      .toLowerCase() // Convert to lowercase
                      .replaceAll(/\s+/g, "-") // Replace spaces with hyphens
                      .replace(/[^a-z0-9\-]/g, "") // Remove all characters that are not letters, numbers, or hyphens
                  );
                }}
              />
            </div>

            {/* DOCUMENT UNIQUE ID */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docId" className="text-right">
                Doc Id
              </Label>
              <Input
                id="docId"
                placeholder="Untitled"
                className="col-span-3"
                value={docId}
                onChange={(e) => {
                  setDocId(
                    e.target.value
                      .toLowerCase() // Convert to lowercase
                      .replaceAll(/\s+/g, "-") // Replace spaces with hyphens
                      .replace(/[^a-z0-9\-]/g, "") // Remove all characters that are not letters, numbers, or hyphens
                  );
                }}
              />
            </div>

            {/* DOCUMENT DESCRIPTION FIELD */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="docDesc" className="text-right">
                Description
              </Label>
              <Textarea
                id="docDesc"
                placeholder="Enter document description"
                className="col-span-3"
                value={docDesc}
                onChange={(e) => setDocDesc(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={createDocumentHandler}>
              {isLoading ? "Creating your space..." : "Create"}
              {isLoading ? <LoaderPinwheel className="animate-spin mr-2" size={16} /> : null}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Display document type below the dialog */}
      {documentType && (
        <p className="text-sm font-medium">{documentType}</p>
      )}
    </div>
  );
};
