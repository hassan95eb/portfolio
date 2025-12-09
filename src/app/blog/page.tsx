import AnimatedBlogTitle from "@/components/AnimatedBlogTitle";
import data from "../db.json";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Blog() {
   return (
      <div className="w-full h-screen bg-background">
         <div className="container mx-auto h-full flex items-center justify-center">
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
                     <Link
                        href={`/blog/${post.seo_and_management_notes.internal_links_suggested[0].target_url}`}
                        key={post.id}
                        className="mb-8 p-6 rounded-lg w-full hover:shadow-lg transition-shadow duration-300"
                     >
                        <Image
                           src={post.image}
                           alt={
                              post.article_content
                                 .title
                           }
                           width={120}
                           height={120}
                        />
                        <h2 className="text-xl font-semibold mb-2 text-primary-text">
                           {
                              post.article_content
                                 .title
                           }
                        </h2>
                     </Link>
                  );
               })}
            </section>
         </div>
      </div>
   );
}
