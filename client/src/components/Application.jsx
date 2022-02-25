import React from "react";
import { Route } from "react-router-dom";
import TopNav from "./shared/TopNav";
import BoardsDashboardContainer from "./dashboard/BoardsDashboardContainer";
import UISection from "./ui/UISection";
import AllBoards from "./ui/AllBoards";
import CardArchived from "./ui/CardArchived";
import CardEditingDescription from "./ui/CardEditingDescription";
import Card_ui from "./ui/Card_ui";
import CopyCardPopover from "./ui/CopyCardPopover";
import CreateBoard from "./ui/CreateBoard";
import DueDatePopover from "./ui/DueDatePopover";
import LabelsPopover_ui from "./ui/LabelsPopover_ui";
import MoveCardPopover from "./ui/MoveCardPopover";
import SingleBoard from "./ui/SingleBoard";
import Board from "./ui/Board";
import Card from "./ui/Card";

const Application = () => {
  return (
    <div>
      <TopNav />
      <Route path="/" exact component={BoardsDashboardContainer} />
      <Route path="/ui" exact component={UISection} />
      <Route path="/ui/allBoards" component={AllBoards} />
      <Route path="/ui/cardArchived" component={CardArchived} />
      <Route
        path="/ui/cardEditingDescription"
        component={CardEditingDescription}
      />
      <Route path="/ui/card" component={Card_ui} />
      <Route path="/ui/copyCardPopover" component={CopyCardPopover} />
      <Route path="/ui/createBoard" component={CreateBoard} />
      <Route path="/ui/dueDatePopover" component={DueDatePopover} />
      <Route path="/ui/labelsPopover" component={LabelsPopover_ui} />
      <Route path="/ui/moveCardPopover" component={MoveCardPopover} />
      <Route path="/ui/singleBoard" component={SingleBoard} />
      <Route path="/(boards|cards)/:id" component={Board} />
      <Route path="/cards/:id" component={Card} />
    </div>
  );
};

export default Application;
