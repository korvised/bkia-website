import { Fragment } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { cn } from "@/lib";

export function BreadcrumDropdown({
  trigger,
  items,
  className,
}: {
  trigger: React.ReactNode | ((open: boolean) => React.ReactNode);
  items: React.ReactNode;
  className?: string;
}) {
  return (
    <Menu as="div" className={cn("relative z-[100]", className)}>
      {({ open }) => (
        <Fragment>
          <MenuButton className="flex items-center gap-1 transition-colors hover:text-white focus:outline-none">
            {typeof trigger === "function" ? trigger(open) : trigger}
          </MenuButton>

          <MenuItems
            anchor="bottom start"
            modal={false}
            className="z-30 mt-2 min-w-[200px] origin-top-left rounded-lg border border-gray-200 bg-white p-1 shadow-xl focus:outline-none"
          >
            {items}
          </MenuItems>
        </Fragment>
      )}
    </Menu>
  );
}
