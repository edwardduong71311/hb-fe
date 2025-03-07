"use client";

import { Text, Paper, Code, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useCallback, useEffect, useState } from "react";

import classes from "./main.module.css";
import { chatWithBot } from "@/services/chat.service";
import { ChatResponse } from "@/types/chat.type";

export default function ChatPage() {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    document.title = "Chat";
  }, []);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      input: "",
    },
  });

  const handleInput = (values: typeof form.values) => {
    if (!values.input) return;
    chatWithBot(values.input);
  };

  return (
    <div className="w-full h-full">
      <Paper className={classes.terminal} bg="dark">
        <div className="flex-1 flex flex-col gap-1 overflow-x-auto p-2">
          <Code block>{text}</Code>
        </div>

        <div className={classes.formWrapper}>
          <form onSubmit={form.onSubmit(handleInput)} className={classes.form}>
            <TextInput
              className="flex-1"
              variant="unstyled"
              placeholder="$ Type a command..."
              key={form.key("input")}
              {...form.getInputProps("input")}
              styles={{
                input: {
                  backgroundColor: "transparent",
                  color: "white",
                  fontFamily: "monospace",
                  border: "none",
                  outline: "none",
                },
              }}
            />
            <Button type="submit" variant="filled">
              Send
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}
