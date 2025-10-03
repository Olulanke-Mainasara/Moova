import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const BookTripTrigger = ({ bookTrip }: { bookTrip: () => void }) => {
  const [open, setOpen] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);

  const handleBooking = () => {
    setOpenMobile(false);
    setOpen(false);
    bookTrip();
  };

  return (
    <>
      <div className="md:hidden">
        <Drawer open={openMobile} onOpenChange={setOpenMobile}>
          <DrawerTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 px-8 py-4 transition-colors duration-300">
              Book Trip
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left pb-0">
              <DrawerTitle className="text-2xl">Book Trip</DrawerTitle>
              <DrawerDescription>
                Are you sure you want to book this trip? Once you confirm, your
                trip details will be saved and you&apos;ll be guided through the
                next steps. Please review your preferences and budget before
                proceeding.
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <Button
                onClick={bookTrip}
                className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 px-8 py-4 transition-colors duration-300"
              >
                Book Trip
              </Button>
              <DrawerClose>
                <div className="py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black transition-colors duration-300">
                  Cancel
                </div>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:block">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="cursor-pointer">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 px-8 py-4 transition-colors duration-300">
              Book Trip
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md h-fit max-h-[55dvh] xl:max-h-[70dvh] gap-0">
            <DialogHeader className="pb-0">
              <DialogTitle className="text-2xl">Book Trip</DialogTitle>
              <DialogDescription>
                Are you sure you want to book this trip? Once you confirm, your
                trip details will be saved and you&apos;ll be guided through the
                next steps. Please review your preferences and budget before
                proceeding.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-2">
              <Button
                onClick={handleBooking}
                className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 px-8 py-4 transition-colors duration-300"
              >
                Book Trip
              </Button>
              <DialogClose>
                <span className="px-8 py-2.5 rounded-lg bg-black text-white dark:bg-white dark:text-black transition-colors duration-300 cursor-pointer">
                  Cancel
                </span>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default BookTripTrigger;
