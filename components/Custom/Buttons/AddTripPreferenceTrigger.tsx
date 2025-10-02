import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { currencyMap } from "@/lib/utils";

export default function AddTripPreferenceTrigger({
  isLoading,
  submit,
  mood,
  setSavedTrip,
}: {
  isLoading: boolean;
  submit: (input?: any) => void;
  mood?: string;
  setSavedTrip?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [openMobile, setOpenMobile] = React.useState(false);
  const [budget, setBudget] = React.useState<number>(0);
  const [location, setLocation] = React.useState<string>("");
  const [timeframe, setTimeframe] = React.useState<number>(0);
  const [currency, setCurrency] = React.useState<string>("USD");
  const [departureDate, setDepartureDate] = React.useState<string | undefined>(
    undefined
  );

  const handleSubmit = () => {
    if (isLoading) return;

    if (budget < 0 || timeframe < 0) {
      toast.error("Budget and timeframe must be non-negative");
      return;
    }

    setSavedTrip?.(false);
    if (submit) {
      submit({ mood, budget, timeframe, currency, departureDate, location });
    }
    setOpen(false);
    setOpenMobile(false);
  };

  return (
    <>
      <div className="md:hidden">
        <Drawer open={openMobile} onOpenChange={setOpenMobile}>
          <DrawerTrigger asChild>
            <Button className="text-lg">Add preferences</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left pb-0">
              <DrawerTitle className="text-4xl">Preferences</DrawerTitle>
              <DrawerDescription className="text-xl">
                Add your trip preferences.
              </DrawerDescription>
            </DrawerHeader>
            <section className="px-4 pb-4 h-full overflow-y-scroll">
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 py-4 relative">
                <input
                  className="p-2 border border-neutral-500 rounded w-full"
                  type="number"
                  placeholder="No of days"
                  onChange={(e) => setTimeframe(Number(e.target.value))}
                />

                <input
                  className="p-2 border border-neutral-500 rounded w-full"
                  type="text"
                  placeholder="Location"
                  onChange={(e) => setLocation(e.target.value)}
                />

                <input
                  className="p-2 border border-neutral-500 rounded w-full"
                  type="number"
                  placeholder="Budget"
                  onChange={(e) => setBudget(Number(e.target.value))}
                />

                <select
                  className="p-2 border border-neutral-500 rounded w-full"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  {Object.entries(currencyMap).map(([key, value]) => (
                    <option value={key}>
                      {value} ({key})
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="p-2 border border-neutral-500 w-full"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full text-lg"
              >
                Re-generate Trip
              </Button>
            </section>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="hidden md:block">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild className="cursor-pointer">
            <Button>Add preferences</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[725px] h-fit max-h-[55dvh] xl:max-h-[70dvh] gap-0">
            <DialogHeader className="pb-0">
              <DialogTitle className="text-4xl">Preferences</DialogTitle>
              <DialogDescription className="text-xl">
                Add your trip preferences here.
              </DialogDescription>
            </DialogHeader>
            <section className="pb-4 h-full overflow-y-scroll">
              <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 py-4 relative">
                <input
                  className="p-2 border border-neutral-500 rounded w-full"
                  type="number"
                  placeholder="No of days"
                  onChange={(e) => setTimeframe(Number(e.target.value))}
                />

                <input
                  className="p-2 border border-neutral-500 rounded w-full"
                  type="text"
                  placeholder="Location (optional)"
                  onChange={(e) => setLocation(e.target.value)}
                />

                <input
                  className="p-2 border border-neutral-500 rounded w-full"
                  type="number"
                  placeholder="Budget"
                  onChange={(e) => setBudget(Number(e.target.value))}
                />

                <select
                  className="p-2 border border-neutral-500 rounded"
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="NGN">NGN (₦)</option>
                </select>

                <input
                  type="date"
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="p-2 border border-neutral-500"
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full text-lg"
              >
                Re-generate Trip
              </Button>
            </section>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
