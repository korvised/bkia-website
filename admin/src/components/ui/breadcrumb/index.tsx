import { Fragment } from "react";
import { Link } from "react-router-dom";
import type { IconType } from "react-icons";
import { LuChevronRight, LuHouse } from "react-icons/lu";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: IconType;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  showHome = true,
  className,
}) => {
  const allItems: BreadcrumbItem[] = showHome
    ? [{ label: "Home", path: "/home", icon: LuHouse }, ...items]
    : items;

  return (
    <nav aria-label="Breadcrumb" className={cn("mb-4", className)}>
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const Icon = item.icon;

          return (
            <Fragment key={index}>
              <li className="flex items-center">
                {isLast || !item.path ? (
                  <span
                    className={cn(
                      "flex items-center gap-1.5",
                      isLast ? "font-medium text-gray-900" : "text-gray-500",
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span className={cn(isLast && "max-w-[200px] truncate")}>
                      {item.label}
                    </span>
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="hover:text-primary flex items-center gap-1.5 text-gray-500 transition-colors"
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>

              {!isLast && (
                <li aria-hidden="true">
                  <LuChevronRight className="h-4 w-4 text-gray-400" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
