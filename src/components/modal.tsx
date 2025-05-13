import { Dialog } from "radix-ui";
import {
  dialogContentVariants,
  dialogDescriptionVariants,
  dialogOverlayVariants,
  dialogTitleVariants,
} from "./modal.variants";

interface ModalProps {
  children: React.ReactNode;
  description?: React.ReactNode;
  title: React.ReactNode;
  trigger: React.ReactNode;
}

export function Modal({ children, description, title, trigger }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={dialogOverlayVariants()} />
        <Dialog.Content className={dialogContentVariants()}>
          <div className="border-b border-gray-200 pb-5 mb-5">
            <Dialog.Title className={dialogTitleVariants()}>
              {title}
            </Dialog.Title>
            <Dialog.Description
              className={dialogDescriptionVariants({
                hasDescription: !!description,
              })}
            >
              {description}
            </Dialog.Description>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
