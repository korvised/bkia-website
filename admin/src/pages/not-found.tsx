import { TbArrowBackUp } from "react-icons/tb";
import { useNavigation } from "@/hooks";
import { cn } from "@/lib";

export const NotFoundPage = () => {
  const { onGoBack } = useNavigation();

  return (
    <main className="bg-dark h-full w-full">
      <div className="relative isolate min-h-screen">
        <img
          alt=""
          src="/404.avif"
          className="absolute inset-0 -z-10 size-full object-cover object-top"
        />
        <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
          <p className="text-base/8 font-semibold text-white">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-white/70 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => onGoBack()}
              className={cn(
                "flex cursor-pointer items-center gap-x-2 rounded-md px-4 py-1.5 text-sm/7 font-semibold text-white",
                "hover:bg-dark/10 hover:text-white",
              )}
            >
              <TbArrowBackUp className="h-6 w-6" />
              <span className="ml-2">Go back</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
