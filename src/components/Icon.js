import React from "react";

export default function Icon({ iconName }) {
  return <i className={`mx-2 bi bi-${iconName ? iconName : "list"}`}></i>;
}
