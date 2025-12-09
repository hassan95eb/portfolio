import React from "react";

export default async function page({ params }) {
   const { url } = await params;

   return <div>page{url}</div>;
}
