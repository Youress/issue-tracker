"use client";
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/issueSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Toaster } from "@/app/components/ToasterBanner";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";


type IssueFormData = z.infer<typeof issueSchema>;

interface Props {
  issue?: Issue;
}
const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState<String>();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const onSubmit = async (data: IssueFormData) => {
    try {
      setSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else await axios.post("/api/issues", data);

      setOpen(true);
      router.push("/issues");
      router.refresh()
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occured.");
    }
  };

  return (
    <div className=" space-y-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error} </Callout.Text>
        </Callout.Root>
      )}

      <form className="max-w-xl space-y-3 " onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title"
          {...register("title")}
        >
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}

        <Button type="submit" disabled={isSubmitting}>
         {issue ? "update the issue" : "Submit New issue"} {isSubmitting && <Spinner />}
        </Button>
      </form>
      <Toaster isOpen={isOpen} setOpen={setOpen} />
    </div>
  );
};

export default IssueForm;
