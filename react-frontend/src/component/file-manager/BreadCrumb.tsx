/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export function CollapsedBreadcrumbs(props: any) {
  const navigate = (breadcrumb: any) => {
    props.navigate(breadcrumb.url);
  };
  return (
    <div role="presentation" onClick={handleClick} style={{ margin: "10px" }}>
      <Breadcrumbs separator="›" maxItems={4} aria-label="breadcrumb">
        {props.breadcrumbs.map((breadcrumb: any, index: any) => {
          const lastLink = index === props.breadcrumbs.length - 1;
          return lastLink ? (
            <div key={index}>{breadcrumb.title}</div>
          ) : (
            <Link
              underline={"always"}
              color="text.primary"
              href="#"
              key={index}
              onClick={() => {
                navigate(breadcrumb);
              }}
            >
              {breadcrumb.title}
            </Link>
          );
        })}
      </Breadcrumbs>
    </div>
  );
}
