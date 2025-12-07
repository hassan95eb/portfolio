import React from "react";
import ContactMeForm from "./ContactMeForm";

export default function ContactMe() {
  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center min-h-screen py-8 md:py-16 px-4 sm:px-6"
      aria-label="Contact section"
    >
      <div className="max-w-2xl w-full">
        <article className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-primary-text">
            Get In Touch
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-8">
            Have a question or want to work together? I&apos;d love to hear from
            you.
          </p>
        </article>
        <ContactMeForm />
      </div>
    </section>
  );
}
