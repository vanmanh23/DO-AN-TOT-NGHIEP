import React from "react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { addDays, subDays, isAfter } from "date-fns";
import type { DateRange, SelectRangeEventHandler } from "react-day-picker";

interface CalendarDialogProps {
  selectedDate: DateRange | undefined;
  setSelectedDate: (range: DateRange | undefined) => void;
}

export default function CalendarDialog({
  selectedDate,
  setSelectedDate,
}: CalendarDialogProps) {
  const handleSelect: SelectRangeEventHandler = (_range, selectedDay) => {
    if (!selectedDay) return;

    if (!selectedDate?.from || !selectedDate?.to) {
      setSelectedDate({
        from: selectedDay,
        to: addDays(selectedDay, 6),
      });
      return;
    }
    // const isClickBefore = isBefore(selectedDay, date.from);
    const isClickAfter = isAfter(selectedDay, selectedDate.to);

    let newFrom = selectedDay;
    let newTo = addDays(selectedDay, 6);

    if (isClickAfter) {
      newTo = selectedDay;
      newFrom = subDays(selectedDay, 6);
    } else {
      newFrom = selectedDay;
      newTo = addDays(selectedDay, 6);
    }

    setSelectedDate({
      from: newFrom,
      to: newTo,
    });
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">
            {selectedDate?.from ? (
              <>
                {selectedDate.from.toLocaleDateString()} -{" "}
                {selectedDate.to?.toLocaleDateString()}
              </>
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl bg-white">
          <div className="grid gap-4">
            <Calendar
              mode="range"
              selected={selectedDate}
              onSelect={handleSelect}
              numberOfMonths={2}
              defaultMonth={selectedDate?.from}
              showOutsideDays={false}
              className="rounded-lg border shadow-sm w-full bg-white"
              classNames={{
                range_middle:
                  "aria-selected:!bg-blue-100 aria-selected:!text-blue-900", // Dùng ! (important) để chắc chắn ghi đè style mặc định
              }}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
