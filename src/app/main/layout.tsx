"use client";

import { useMemo, useState } from "react";
import {
  IconBellRinging,
  IconCalendarCheck,
  IconLogout,
  IconStethoscope,
} from "@tabler/icons-react";
import { Code, Group } from "@mantine/core";
import classes from "./main.module.css";

const menu = [
  { link: "", label: "Chat", icon: IconBellRinging },
  { link: "", label: "Appointments", icon: IconCalendarCheck },
];

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [active, setActive] = useState("Chat");

  const links = useMemo(() => {
    return menu.map((item) => (
      <a
        className={classes.link}
        data-active={item.label === active || undefined}
        href={item.link}
        key={item.label}
        onClick={(event) => {
          event.preventDefault();
          setActive(item.label);
        }}
      >
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    ));
  }, [menu]);

  return (
    <div className="w-screen h-screen flex">
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <IconStethoscope size={28} style={{ color: "white" }} />
            Health Buddy
            <Code fw={700} className={classes.version}>
              {process.env.NEXT_PUBLIC_APP_VERSION}
            </Code>
          </Group>
          {links}
        </div>

        <div className={classes.footer}>
          <a
            href="#"
            className={classes.link}
            onClick={(event) => event.preventDefault()}
          >
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </a>
        </div>
      </nav>
      {children}
    </div>
  );
}
