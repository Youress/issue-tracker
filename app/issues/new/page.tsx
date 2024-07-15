"use client";
import { Button, TextField, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/issueSchema";
import { z } from "zod";

type IssueForm = z.infer<typeof issueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState<String>();
  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occured.");
    }
  };

  return (
    <div className="max-w-xl space-y-5">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error} </Callout.Text>
        </Callout.Root>
      )}

      <form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root placeholder="Title" {...register("title")}>
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <SimpleMDE placeholder="description" {...field} />
          )}
        />
        {errors.description && (
          <Text color="red" as="p">{errors.description.message}</Text>
        )}

        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
