import { cn } from "@/lib";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
}

export const LoadingSpin: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        "flex h-full w-full items-center justify-center",
        className,
      )}
    >
      <div className="border-dark h-10 w-10 animate-spin rounded-full border-4 border-t-transparent" />
    </div>
  );
};

export const LoadingSpinIcon: React.FC<
  React.ComponentPropsWithoutRef<"span"> & { borderColor?: string }
> = ({ className, borderColor, ...props }) => (
  <span
    {...props}
    className={cn(
      className,
      borderColor || "border-gray-900",
      "h-5 w-5 animate-spin rounded-full border-4 border-t-transparent",
    )}
  />
);

export const LoadingWithPlaneAndEarth: React.FC<
  React.ComponentPropsWithoutRef<"div">
> = ({ className, ...props }) => {
  return (
    <div
      {...props}
      className={cn(
        className,
        "pointer-events-none relative h-20 w-20 rounded-full",
      )}
    >
      {/* Earth */}
      <div>
        <img src="/earth.svg" alt="Earth" className="h-20 w-20" />
      </div>

      {/* Plane orbiting */}
      <div className="reverse-spin absolute top-0 left-0">
        <img src="/plane.svg" alt="Plane" className="h-20 w-20" />
      </div>
    </div>
  );
};

export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/10">
      <LoadingWithPlaneAndEarth className="bg-white shadow-2xl" />
    </div>
  );
};
