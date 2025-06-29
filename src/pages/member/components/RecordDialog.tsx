import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { type SmokingRecord } from "@/types/recordhabbit";

interface RecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate: Date;
  currentRecord: SmokingRecord | null;
  newCigarettesCount: number;
  newNote: string;
  setNewCigarettesCount: (count: number) => void;
  setNewNote: (note: string) => void;
  handleSaveRecord: () => void;
  handleDeleteRecord: () => void;
}

export function RecordDialog({
  open,
  onOpenChange,
  selectedDate,
  currentRecord,
  newCigarettesCount,
  newNote,
  setNewCigarettesCount,
  setNewNote,
  handleSaveRecord,
  handleDeleteRecord,
}: RecordDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {currentRecord ? "Update Smoking Record" : "New Smoking Record"}
          </DialogTitle>
          <DialogDescription>{format(selectedDate, "PPP")}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cigarettes" className="text-right">
              Cigarettes
            </Label>
            <Input
              id="cigarettes"
              type="number"
              min="0"
              value={newCigarettesCount}
              onChange={(e) =>
                setNewCigarettesCount(parseInt(e.target.value) || 0)
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note" className="text-right">
              Note
            </Label>
            <Input
              id="note"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              className="col-span-3"
              placeholder="How you felt, triggers, etc."
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          {currentRecord && (
            <Button variant="destructive" onClick={handleDeleteRecord}>
              Delete
            </Button>
          )}
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSaveRecord}>
              Save
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RecordDialog;
