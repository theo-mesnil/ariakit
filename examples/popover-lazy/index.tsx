import { lazy, useState, useTransition } from "react";
import * as Ariakit from "@ariakit/react";
import { Spinner } from "./spinner.js";
import { usePerceptibleValue } from "./use-perceptible-value.js";
import "./style.css";

const Popover = lazy(() => import("./popover.js"));

export default function Example() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Wait for 150ms before showing the spinner. Once the spinner is shown, it
  // should be visible for enough time to avoid flickering.
  const loading = usePerceptibleValue(isPending, { delay: 150 });

  const popover = Ariakit.usePopoverStore({
    open,
    setOpen(open) {
      if (open) {
        return startTransition(() => setOpen(open));
      }
      setOpen(open);
    },
  });

  return (
    <>
      <Ariakit.PopoverDisclosure store={popover} className="button">
        Accept invite
        {loading ? <Spinner /> : <Ariakit.PopoverDisclosureArrow />}
      </Ariakit.PopoverDisclosure>
      {open && (
        <Popover store={popover} className="popover">
          <Ariakit.PopoverArrow className="arrow" />
          <Ariakit.PopoverHeading className="heading">
            Team meeting
          </Ariakit.PopoverHeading>
          <Ariakit.PopoverDescription>
            We are going to discuss what we have achieved on the project.
          </Ariakit.PopoverDescription>
          <div>
            <p>12 Jan 2022 18:00 to 19:00</p>
            <p>Alert 10 minutes before start</p>
          </div>
          <Ariakit.Button className="button">Accept</Ariakit.Button>
        </Popover>
      )}
    </>
  );
}