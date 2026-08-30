import Logo from "./ui/Logo"
import InitialChatInput from "./ui/chat/InitialChatInput"

export default function Hero() {

  return (
    <section className="flex flex-col items-center justify-center px-4">

      <h1 className="pt-8 pb-6 font-bold text-center  text-[var(--cc-teal)] text-3xl md:text-5xl lg:text-6xl">
        Community Connect
      </h1>

      <Logo />

      <p className="max-w-2xl text-lg pt-6 text-center text-[var(--cc-text-light)] leading-relaxed sm:text-xl">
        {/* Helping people discover local services, support, and community
        resources in one accessible place. */}
        Find South Australian support in one accessible place.
      </p>

      <p className="pt-6 text-center font-bold max-w-2xl text-lg text-[var(--cc-text-light)]">
        {/* Describe what you're looking for and we'll help you find the right support. */}
        What support are you looking for?
      </p>

      <InitialChatInput />

    </section>
  )
}