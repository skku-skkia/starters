import { createContext, ReactNode, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useClickAway } from "@uidotdev/usehooks";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Icon } from "./icon";

type ModalContextType = {
  onClose: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal subcomponents must be used within <Modal>");
  }

  return context;
}

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: string | number;
  height?: string | number;
  maxWidth?: string;
  maxHeight?: string;
  backdropClassName?: string;
  modalClassName?: string;
};

export function Modal({
  open,
  onClose,
  children,
  width = "90vw",
  height = "auto",
  maxWidth = "500px",
  maxHeight = "90vh",
  backdropClassName = "",
  modalClassName = "",
}: ModalProps) {
  const modalRef = useClickAway<HTMLDivElement>(() => {
    if (open) {
      onClose();
    }
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <ModalContext.Provider value={{ onClose }}>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={cn(
                "fixed inset-0 z-40 bg-black/10",
                backdropClassName,
              )}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              ref={modalRef}
              className={cn(
                "fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-6 ",
                "flex flex-col",
                modalClassName,
              )}
              style={{
                width,
                height,
                maxWidth,
                maxHeight,
                overflowY: "auto",
                boxSizing: "border-box",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                duration: 0.2,
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export function ModalHeader({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { onClose } = useModalContext();

  return (
    <div className={cn("mb-4 text-lg font-semibold", className)} {...props}>
      {children}

      <Button
        onClick={onClose}
        variant="ghost"
        className={cn("absolute top-4 right-4 p-2", className)}
      >
        <Icon icon="x" />
      </Button>
    </div>
  );
}

export function ModalContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mb-4", className)} {...props} />;
}
