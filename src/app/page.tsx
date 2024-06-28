import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            {/* Hero Section */}
            <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-primary text-primary-foreground border border-border">
                <div className="container px-4 md:px-6">
                    <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                    Explore Generative AI with Ease
                                </h1>
                                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                    Learn and experiment with cutting-edge AI
                                    tools in one place.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button
                                    asChild
                                    className="bg-foreground text-background"
                                >
                                    <Link href="/explore-courses">
                                        Get Started
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <img
                            src="/image.png"
                            width="550"
                            height="550"
                            alt="Hero"
                            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
