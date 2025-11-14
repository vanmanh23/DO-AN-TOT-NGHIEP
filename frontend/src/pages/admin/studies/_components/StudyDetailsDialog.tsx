import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { List } from "lucide-react";
import { Link } from "react-router-dom";
import type { StudyProps } from "../../../../types/types";

export default function StudyDetailsDialog({ props }: { props: StudyProps }) {
  return (
    <div className="w-full overflow-hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-white outline-none hover:bg-gray-100">
            <List />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full md:h-[90%] h-full overflow-y-scroll no-scrollbar max-w-2xl rounded-xl bg-white md:p-6 p-2 xl:space-y-3 md:space-y-3 space-y-2 shadow-lg">
          <DialogHeader>
            <DialogTitle className="md:text-xl text-lg font-semibold">
              Study details
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Click the 'view instances' button to see more specific
              information.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col w-fit ">
            {Object.entries(props)
              .filter(([key]) => key !== "diagnose")
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex md:flex-row flex-col items-start justify-between w-full border-b rounded-md xl:gap4 md:gap-4 gap-2 p-4 hover:bg-slate-200"
                >
                  <div className="w-1/3 font-medium text-gray-700 capitalize">
                    {key}
                  </div>
                  <div className="w-[360px] text-gray-900 truncate">
                    {value || "-"}
                  </div>
                </div>
              ))}
            {Object.entries(props)
              .filter(([key]) => key === "diagnose")
              .map(([key, value]) => (
                <div
                  key={key}
                  className="flex md:flex-row flex-col items-start justify-between w-full border-b rounded-md xl:gap4 md:gap-4 gap-2 p-4 hover:bg-slate-200"
                >
                  {value ? (
                    <>
                      <div className="w-1/3 font-medium text-gray-700 capitalize ">
                        {key}
                      </div>
                      <div className="flex-1 text-gray-900 truncate">
                        {value.description || "-"}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-1/3 font-medium text-gray-700 capitalize">
                        {key}
                      </div>
                      <div className="flex-1 text-gray-900 truncate">
                        {"-"}
                      </div>
                    </>
                  )}
                </div>
              ))}
          </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Link to={`/diagnosis/${props.studyInstanceUID}`}>
              <Button className="bg-bg-secondary hover:bg-bg-secondary/75 text-white">
                View instances
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
