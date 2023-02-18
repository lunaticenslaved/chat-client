import React from "react";

import { Divider } from "shared/components/divider";
import { Chat } from "widgets/messenger/chat";
import { Sidebar } from "widgets/messenger/sidebar";

import classes from "./home-page.module.scss";

const HomePage = () => {
  return (
    <div className={classes.root}>
      <Sidebar />
      <Divider vertical />
      <Chat />
    </div>
  );
};

export default HomePage;
