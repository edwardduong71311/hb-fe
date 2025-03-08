"use client";

import { Paper, TextInput, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect, useRef } from "react";

import classes from "./main.module.css";
import { useAppSelector, useAppDispatch } from "@/state/hook";
import { getConversationId, streamAnswer } from "@/services/chat.service";
import { addPatientMessage } from "@/state/conversationSlice";
import { ChatMessageType } from "@/types/chat.type";

export default function ChatPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const messageEnd = useRef<HTMLDivElement>(null);

  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.conv.conversation);
  const conversationId = useAppSelector((state) => state.conv.id);
  const loading = useAppSelector((state) => state.conv.loading);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      input: "",
    },
  });

  const handleInput = (values: typeof form.values) => {
    if (!conversationId) return;
    if (loading) return;
    if (!values.input) return;

    dispatch(addPatientMessage(values.input));
    dispatch(
      streamAnswer({
        id: conversationId,
        text: values.input,
      })
    );

    form.setValues({ input: "" });
  };

  useEffect(() => {
    document.title = "Chat";
    dispatch(getConversationId());
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [loading]);

  useEffect(() => {
    messageEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-full">
      <Paper className={classes.terminal} bg="dark">
        <div className="flex-1 overflow-x-auto p-5">
          {messages.map((item, index) => {
            if (item.type === ChatMessageType.BOT) {
              return (
                <pre
                  key={index}
                  color="transparent"
                  style={{
                    textAlign: "left",
                    backgroundColor: "var(--mantine-primary-color-filled)",
                    borderRadius: "2px",
                    padding: "0.5em",
                    color: "white",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                    width: "fit-content",
                    marginBottom: "1em",
                  }}
                >
                  {item.text}
                </pre>
              );
            }

            return (
              <pre
                key={index}
                color="transparent"
                style={{
                  textAlign: "right",
                  color: "#e3fafc",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                  marginBottom: "0.2em",
                }}
              >
                {item.text}
              </pre>
            );
          })}
          <div ref={messageEnd} />
        </div>
        <div className={classes.formWrapper}>
          <form onSubmit={form.onSubmit(handleInput)} className={classes.form}>
            <TextInput
              ref={inputRef}
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
            <Button
              loading={loading}
              loaderProps={{ type: "dots" }}
              type="submit"
              variant="filled"
            >
              Send
            </Button>
          </form>
        </div>
      </Paper>
    </div>
  );
}
