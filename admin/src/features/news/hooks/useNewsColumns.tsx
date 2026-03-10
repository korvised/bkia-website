import { useMemo } from "react";
import { LuEye, LuPencil, LuStar, LuTrash2 } from "react-icons/lu";
import type { Column } from "@/components/ui/table/table";
import { asset, formatDate } from "@/lib";
import type { INews } from "@/features/news/types";
import { NewsCategoryBadge } from "@/features/news/components";

interface Options {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}

function getTitle(news: INews): string {
  return news.title.en || news.title.lo || news.title.zh || "—";
}

export function useNewsColumns({ onEdit, onDelete, canEdit = true, canDelete = true }: Options) {
  return useMemo(
    (): Column<INews>[] => [
      {
        key: "cover",
        header: "",
        render: (item) =>
          item.coverImage?.path ? (
            <img
              src={asset(item.coverImage.path)}
              alt={getTitle(item)}
              className="h-10 w-16 rounded object-cover"
            />
          ) : (
            <div className="h-10 w-16 rounded bg-gray-100" />
          ),
      },
      {
        key: "title",
        header: "Title",
        render: (item) => (
          <div className="max-w-xs">
            <p className="font-medium text-gray-900 truncate">{getTitle(item)}</p>
            <p className="text-xs text-gray-400 font-mono">{item.slug}</p>
          </div>
        ),
      },
      {
        key: "category",
        header: "Category",
        render: (item) => <NewsCategoryBadge category={item.category} />,
      },
      {
        key: "author",
        header: "Author",
        render: (item) => (
          <span className="text-sm text-gray-600">{item.author || "—"}</span>
        ),
      },
      {
        key: "publishDate",
        header: "Publish Date",
        render: (item) => (
          <span className="text-sm text-gray-700">
            {formatDate(item.publishDate)}
          </span>
        ),
      },
      {
        key: "flags",
        header: "Flags",
        render: (item) => (
          <div className="flex items-center gap-2">
            {item.isFeatured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
                <LuStar className="h-3 w-3" />
                Featured
              </span>
            )}
            <span
              className={
                item.isPublished
                  ? "inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
                  : "inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500"
              }
            >
              {item.isPublished ? "Published" : "Draft"}
            </span>
          </div>
        ),
      },
      {
        key: "viewCount",
        header: "Views",
        render: (item) => (
          <span className="inline-flex items-center gap-1 text-sm text-gray-500">
            <LuEye className="h-3.5 w-3.5" />
            {item.viewCount.toLocaleString()}
          </span>
        ),
      },
      {
        key: "actions",
        header: "",
        render: (item) => (
          <div className="flex items-center justify-end gap-2">
            {canEdit && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item.id);
                }}
                className="rounded p-1.5 text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
                title="Edit"
              >
                <LuPencil className="h-4 w-4" />
              </button>
            )}
            {canDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="rounded p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                title="Delete"
              >
                <LuTrash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        ),
      },
    ],
    [onEdit, onDelete, canEdit, canDelete],
  );
}
