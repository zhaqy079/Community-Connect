import Image from "next/image";

export default function Logo() {
    return (
        <div className="bg-white p-1 shadow-lg rounded-xl items-center justify-center inline-flex">
            <Image 
                src="/logo.svg"
                width={140}
                height={140}
                alt="Community Connect"
            />
        </div>

    );
}