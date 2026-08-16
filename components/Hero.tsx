import Logo from "./ui/Logo"

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center">

      <Logo/>

      <h1 className="py-6 font-bold text-[var(--cc-teal)] text-3xl md:text-5xl lg:text-6xl">
        Community Connect
      </h1>

      <p className="text-center max-w-2xl text-lg text-[var(--cc-text-light)]">
        Helping people discover local services, support, and community
        resources in one accessible place.
      </p>

    </section>
  )
}