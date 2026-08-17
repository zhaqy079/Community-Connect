import Logo from "./ui/Logo"
import ChatInput from "./ui/ChatInput"

export default function Hero() {

  return (
    <section className="flex flex-col items-center justify-center">

            <h1 className="py-6 font-bold text-[var(--cc-teal)] text-3xl md:text-5xl lg:text-6xl">
        Community Connect
      </h1>

      <Logo/>


      <p className="max-w-2xl text-lg pt-6 text-[var(--cc-text-light)]">
        Helping people discover local services, support, and community
        resources in one accessible place.
      </p>

      <p className="pt-6 text-center font-bold max-w-2xl text-lg text-[var(--cc-text-light)]">
        Describe what you're looking for and we'll help you find the right support.
      </p>

      <ChatInput/>

    </section>
  )
}