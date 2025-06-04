import {
  projectInsertFormSchema,
  type ProjectInsertFormSchema,
} from "@/server/db/schema/project";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import InputField from "../forms/ui/InputField";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

interface AddListSheetProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: number;
}

const AddListSheet: FC<AddListSheetProps> = ({
  isOpen,
  onClose,
  projectId,
}) => {
  const utils = api.useUtils();
  const { mutateAsync } = api.list.create.useMutation({
    onSuccess: async () => {
      await utils.list.invalidate();
    },
  });

  const form = useForm<ProjectInsertFormSchema>({
    resolver: zodResolver(projectInsertFormSchema),
  });

  const onSubmit: SubmitHandler<ProjectInsertFormSchema> = async (data) => {
    await toast.promise(
      mutateAsync({
        ...data,
        projectId,
      }),
      {
        error: <b>Hubo un error...</b>,
        loading: "Cargando datos...",
        success: <b>Todo salio bien!</b>,
      },
    );
    form.reset();
  };

  return (
    <>
      <Sheet onOpenChange={onClose} open={isOpen}>
        <SheetContent>
          <Form {...form}>
            <form
              className="mb-8 grid gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <SheetHeader className="mb-8">
                <SheetTitle>Create a new List</SheetTitle>
              </SheetHeader>
              <InputField
                autoFocus
                label="List Name"
                name="name"
                placeholder="Enter list name"
                required
              />
              <SheetFooter>
                <Button>Submit</Button>
                <SheetClose asChild>
                  <Button variant="outline">Cancel</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AddListSheet;
