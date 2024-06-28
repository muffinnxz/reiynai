import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            {/* Hero Section */}
            <section className="w-full py-12 sm:py-16 md:py-24 lg:py-32 bg-primary text-primary-foreground border border-border flex flex-col items-center">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl text-center">
                    Explore Generative AI with Ease
                </h1>
                <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl text-center mt-4">
                    Learn and experiment with cutting-edge AI tools in one
                    place.
                </p>
                <Button asChild className="bg-foreground text-background mt-6">
                    <Link href="/explore-courses">Get Started</Link>
                </Button>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-background border border-border">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                                Our Features
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                                Discover Our Platform
                            </h2>
                            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Explore the benefits of using our platform to
                                enhance your learning experience.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                        <Card className="border border-border">
                            <CardHeader>
                                <CardTitle>User-Friendly</CardTitle>
                                <CardDescription>
                                    Easily navigate and learn with our intuitive
                                    interface.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Our platform is designed with user
                                    experience in mind, making it easy to find
                                    and access the tools and resources you need.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border border-border">
                            <CardHeader>
                                <CardTitle>Cost-Effective</CardTitle>
                                <CardDescription>
                                    Access powerful AI tools without breaking
                                    the bank.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    We offer competitive pricing plans to ensure
                                    that you can leverage the power of AI
                                    without incurring high costs.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border border-border">
                            <CardHeader>
                                <CardTitle>Comprehensive Support</CardTitle>
                                <CardDescription>
                                    Get help when you need it with our dedicated
                                    support team.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>
                                    Our support team is available to assist you
                                    with any questions or issues you may
                                    encounter.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Course Example */}
        </main>
    );
}
