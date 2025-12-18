"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useBoards } from "@/features/board/api/get-boards";
import { useCreatePostMutation } from "@/features/post/api/create-post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function CreatePostButton() {
  const CreatePostFormSchema = z.object({
    title: z.string().nonempty("Title is required"),
    content: z.string().nonempty("Content is required"),
    boardId: z.number().nonoptional("Board is required"),
    isPublic: z.boolean(),
    isCommentingAllowed: z.boolean(),
  });
  type CreatePostFormValues = z.infer<typeof CreatePostFormSchema>;

  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(CreatePostFormSchema),
    defaultValues: {
      title: "",
      content: "",
      boardId: undefined,
      isPublic: true,
      isCommentingAllowed: true,
    },
  });

  const { data: boards } = useBoards();
  const { mutate: createPost } = useCreatePostMutation();

  const onSubmit = (data: CreatePostFormValues) => {
    createPost(data);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Icon icon="write" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col min-w-md gap-4"
          >
            <FormField
              name="boardId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex">
                  <FormLabel>Board</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(parseInt(value));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a board" />
                      </SelectTrigger>
                      <SelectContent>
                        {boards &&
                          boards.map((board) => (
                            <SelectItem key={board.id} value={`${board.id}`}>
                              {board.title}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="content"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea rows={10} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="isPublic"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel>Public?</FormLabel>
                  <FormControl>
                    <Switch
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="isCommentingAllowed"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel>Comments Allowed?</FormLabel>
                  <FormControl>
                    <Switch
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-4 self-end">
              Create
            </Button>
          </form>
        </Form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
