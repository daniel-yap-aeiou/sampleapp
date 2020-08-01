import React from "react";
import { Subreddit } from "./types";
import { Badge } from "react-bootstrap";

type Props = {
  item: Subreddit,
  itemSelected: (item: Subreddit) => void,
  selected: boolean,
};

export default function NavigationItem(props: Props) {
  return (
    <Badge
      onClick={() => {
        props.itemSelected(props.item);
      }}
      className={props.selected ? "selected badge-pill badge-secondary subreddit" : "badge-pill badge-secondary subreddit"}
    >
      {props.item.data.display_name}
    </Badge>
  );
}
