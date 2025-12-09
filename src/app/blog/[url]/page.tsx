import React from "react";

export default async function page({
   params,
}: {
   params: Promise<{ url: string }>;
}) {
   const { url } = await params;

   return <div>page{url}</div>;
}
