import {
  issueInsertFormSchema,
  type IssueInsertFormSchema,
} from "@/server/db/schema/issues";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import InputField from "../forms/ui/InputField";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Form } from "../ui/form";

interface AddIssueBlockProps {
  listId: number;
  onClose: () => void;
}

const AddIssueBlock: FC<AddIssueBlockProps> = ({ listId, onClose }) => {
  const utils = api.useUtils();
  const { isPending, mutateAsync } = api.issue.create.useMutation({
    onSuccess: async () => {
      await utils.issue.invalidate();
    },
  });

  const form = useForm<IssueInsertFormSchema>({
    resolver: zodResolver(issueInsertFormSchema),
  });

  const onSubmit: SubmitHandler<IssueInsertFormSchema> = async (data) => {
    await toast.promise(
      mutateAsync({
        ...data,
        listId,
      }),
      {
        error: <b>Hubo un error...</b>,
        loading: "Cargando datos...",
        success: <b>Todo salio bien!</b>,
      },
    );
    form.reset();
    onClose();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a new Issue</CardTitle>
      </CardHeader>
      <CardFooter className="flex-col gap-2">
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <InputField
              autoFocus
              label="Issue Name"
              name="name"
              placeholder="Enter a name"
              required
            />

            <Button>Create Issue</Button>
            <Button disabled={isPending} onClick={onClose} variant="outline">
              Cancel
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
};

export default AddIssueBlock;
