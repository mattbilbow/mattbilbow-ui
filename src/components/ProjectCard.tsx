import Image from 'next/image';
import Link from 'next/link';

interface Project {
    id: string;
    title: string;
    description: string;
    icon: string;
    desktopImage: string;
    mobileImage: string;
    url: string;
    isExternal: boolean;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="container mx-auto">
                <div className={`flex flex-col lg:flex-row min-h-[500px]`}>
                    <div className="flex-1 p-8 flex flex-col justify-center">
                        <div className="max-w-lg">
                            <Image
                                src={project.icon}
                                alt={`${project.id} icon`}
                                width={64}
                                height={64}
                                className="mb-0 rounded-md"
                            />

                            <h3 className="text-2xl md:text-3xl font-bold text-dark mb-6 leading-tight">
                                {project.title}
                            </h3>

                            <p className="text-main text-base leading-relaxed mb-8">
                                {project.description}
                            </p>

                            <Link
                                href={project.url}
                                className="inline-flex items-center gap-2 text-accent hover:text-dark transition-colors font-medium text-base group"
                            >
                                Learn more
                                <svg
                                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 relative bg-medium overflow-hidden min-h-[200px]">
                        <div className="hidden md:block relative w-full h-full">
                            <Image
                                src={project.desktopImage}
                                alt={`${project.id} desktop view`}
                                fill
                                className="object-cover object-left mt-5 shadow-md min-h-[200px]"
                                style={{
                                    transform: 'translateX(5%)'
                                }}
                            />
                        </div>
                        <div className="block md:hidden relative w-full h-full min-h-[200px]">
                            <Image
                                src={project.mobileImage}
                                alt={`${project.id} mobile view`}
                                fill
                                className="object-cover mt-5 object-top min-h-[200px]"
                            />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
}