import React from "react";
import { Story } from "./types";
import Logo from "../../logo.svg";

interface Props {
  items: Array<Story>;
}

export default function StoryList(props: Props) {
  return (
    <table className="table table-hover">
      <tbody>
        {props.items.map((item) => (
          <tr key={item.data.id}>
            <td>
              <p className="score" title="score">
                {item.data.score}
              </p>
            </td>
            <td>
                <img alt="reddit" src={item.data.thumbnail && item.data.thumbnail.includes("http") ? item.data.thumbnail : Logo} />
            </td>
            <td>
              <p className="title">
                <a
                  href={item.data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="reddit-client"
                >
                  {item.data.title}
                </a>
              </p>
              <p className="author">
                Posted by <span>{item.data.author}</span>
              </p>
              <p>
                <span className="count">Ups: {item.data.ups}</span>
                &nbsp;&nbsp;&nbsp;
                <span className="count">Downs: {item.data.downs}</span>
              </p>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
