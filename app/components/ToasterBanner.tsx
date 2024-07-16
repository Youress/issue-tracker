import * as Toast from "@radix-ui/react-toast";

interface Props {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toaster = ({ isOpen, setOpen }: Props) => (
  <Toast.Provider swipeDirection="right" duration={500}>
    {isOpen && (
      <Toast.Root className=" bg-white shadow-md">
        <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
          Issue Submitted
        </Toast.Title>
        <Toast.Description>
          Your new issue has been successfully created.
        </Toast.Description>
        <Toast.Action altText="Undo">X</Toast.Action>
        <Toast.Close />
      </Toast.Root>
    )}
    <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
  </Toast.Provider>
);
