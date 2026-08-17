import Image from "next/image";

type LogoProps = {
    width?: number,
    height?: number
}

export default function Logo({ width = 100, height = 100 }: LogoProps) {
    return (
        <div className="bg-white p-1 shadow-lg rounded-xl items-center justify-center inline-flex">
            <Image
                src="/logo.svg"
                width={width}
                height={height}
                alt="Community Connect"
            />
        </div>

    );
}