"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerSearch,
} from "@/components/ui/emoji-picker";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBoardMutation } from "@/features/board/api/create-board";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export default function CreateBoardButton() {
  const CreateBoardFormSchema = z.object({
    icon: z.string().nonempty(),
    title: z.string().min(1),
    description: z.string().nonempty(),
  });
  type CreateBoardFormValues = z.infer<typeof CreateBoardFormSchema>;

  const form = useForm<CreateBoardFormValues>({
    resolver: zodResolver(CreateBoardFormSchema),
    defaultValues: {
      icon: "👍",
      title: "",
      description: "",
    },
  });

  const { mutate: createBoard } = useCreateBoardMutation();

  const onSubmit = (data: CreateBoardFormValues) => {
    createBoard(data, {
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Icon icon="add" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <FormField
                name="icon"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex gap-2">
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="h-10 w-10 flex items-center justify-center rounded-sm"
                          >
                            {field.value}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <EmojiPicker
                            className="h-[326px]"
                            onEmojiSelect={(e) => {
                              field.onChange(e.emoji);
                            }}
                          >
                            <EmojiPickerSearch />
                            <EmojiPickerContent />
                          </EmojiPicker>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
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
