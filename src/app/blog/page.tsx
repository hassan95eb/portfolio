import AnimatedBlogTitle from "@/components/AnimatedBlogTitle";
import data from "../db.json";
import React from "react";
import { div } from "framer-motion/client";

export default function Blog() {
   return (
      <div className="w-full h-screen bg-background">
         <div className="flex items-center justify-center h-full">
            <section className="h-full w-1/2 flex flex-col justify-center items-center">
               <AnimatedBlogTitle>
                  <h1 className="text-9xl font-bold leading-none text-primary-text">
                     <div className="title-line">
                        BL
                     </div>
                     <div className="title-line">
                        OG
                     </div>
                     <div className="title-line">
                        NEWS
                     </div>
                  </h1>
               </AnimatedBlogTitle>
            </section>
            <section className="h-full w-1/2 flex flex-col justify-center items-start pl-8">
               {data.blog.posts.map((post) => {
                  return (
                     <code
                        className=""
                        key={post.id}
                        dangerouslySetInnerHTML={{
                           __html:
                              post.article_content
                                 .title,
                        }}
                     ></code>
                  );
               })}
            </section>
         </div>
      </div>
   );
}
