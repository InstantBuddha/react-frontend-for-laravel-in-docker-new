import React from "react";
import { Helmet } from "react-helmet-async";

export default function HelmetMetaData({ title, description, type}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
