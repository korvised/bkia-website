import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { LuX } from "react-icons/lu";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = "max-w-lg",
}: ModalProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      {/* Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          className={`w-full ${maxWidth} overflow-hidden rounded-xl bg-white shadow-2xl`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <DialogTitle className="text-base font-semibold text-gray-900">
              {title}
            </DialogTitle>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            >
              <LuX className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="px-6 py-5">{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
