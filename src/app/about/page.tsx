import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-light">
            <div className="pt-50 pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-12 items-start">
                        <div className="md:col-span-1">
                            <div className="aspect-square bg-medium rounded-lg overflow-hidden mb-6">
                                <Image
                                    src="/me.jpg"
                                    alt="Matt Bilbow"
                                    width={400}
                                    height={400}
                                    className="w-full h-full object-cover"
                                    priority
                                />
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className={"text-sm font-medium text-main uppercase tracking-wider mb-0 mt-0"}>Location</h3>
                                    <p className="text-dark mt-2">Hertford, England</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-main uppercase tracking-wider mb-0 mt-10">Core Skills</h3>
                                    <p className="text-dark mt-2">Full-stack Development<br/>
                                    UI/UX Design<br/>
                                    Product launch</p>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-main uppercase tracking-wider mb-0 mt-10">Currently</h3>
                                    <p className="text-dark mt-2">Senior Software Engineer at Bullhorn Analytics (previously cube19)</p>
                                </div>
                            </div>
                        </div>

                        {/* Bio Content */}
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4 mt-0">
                                    Matt Bilbow
                                </h1>
                                <p className="text-xl text-main mb-8">
                                    A software engineer and design enthusiast sharing insights on code, aesthetics, user experience and sometimes life.
                                </p>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <p className="text-dark leading-relaxed mb-6">
                                    As an experienced software engineer, I spend my time crafting solutions across the stack. I work with many languages and frameworks but I particularly favor React and Next.js for frontend development, and Ruby on Rails or Elixir/Phoenix for backend systems. Though what matters most is choosing the right tool for the job and writing clean, maintainable code that stands the test of time.
                                </p>

                                <p className="text-dark leading-relaxed mb-6">
                                    I&#39;m also a talented UI, UX and brand designer. Aesthetics have always come intuitively to me. I understand spacing, colour theory,
                                    and visual hierarchy without ever having formally studied them. Being able to visualise the user&#39;s journey and then implement it technically has become one of my greatest professional strengths.
                                </p>

                                <p className="text-dark leading-relaxed mb-6">
                                    My rare skill set allows me to work closely with business leaders and truly understand what&#39;s needed and when. It&#39;s what enabled me to co-found my own startup, which was acquired in 2023. That experience gave me invaluable insight into how business actually works, what leaders need to succeed, and most importantly, how I can bring the most value as both an engineer and if needed a strategic partner.
                                </p>

                                <p className="text-dark leading-relaxed mb-6">
                                    I currently work at Bullhorn as part of a small but highly efficient development team building the Analytics product (formerly cube19). Performance and process are critical when thousands of clients with hundreds of users each depend on our platform every day. It&#39;s the kind of environment where performant code, smart architecture, and reliable delivery aren&#39;t just nice to haves, they&#39;re essential.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills/Expertise Section */}
            <div className="bg-white pt-5 pb-15">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-dark mb-12 text-center">
                        Some of the software and languages I work with
                    </h2>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <h3 className="text-lg font-bold text-dark mb-4">Frontend</h3>
                            <ul className="space-y-2 text-main list-none pl-0">
                                <li>React & Next.js</li>
                                <li>Vue.js</li>
                                <li>TypeScript</li>
                                <li>Tailwind, Emotion, Sass</li>
                                <li>JavaScript (ES6)</li>
                            </ul>
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-bold text-dark mb-4">Backend</h3>
                            <ul className="space-y-2 text-main list-none pl-0">
                                <li>Java 21+</li>
                                <li>Ruby/Rails</li>
                                <li>Phoenix/Elixir</li>
                                <li>PostgreSQL/MySQL</li>
                                <li>MongoDB</li>
                            </ul>
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-bold text-dark mb-4">Design</h3>
                            <ul className="space-y-2 text-main list-none pl-0">
                                <li>Figma</li>
                                <li>Adobe Photoshop</li>
                                <li>Adobe Illustrator</li>
                                <li>Adobe After Effects</li>
                                <li>Balsamiq</li>
                            </ul>
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg text-dark mb-4">Other (hobby only)</h3>
                            <ul className="space-y-2 text-main list-none pl-0">
                                <li>Python</li>
                                <li>Unreal Engine 5</li>
                                <li>Expo</li>
                                <li>LUA</li>
                                <li>C++</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-16 px-6 -mb-10">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-dark mb-6">
                        Let&#39;s Connect
                    </h2>
                    <p className="text-main text-lg mb-8">
                        Interested in collaborating or just want to chat about code or design?<br/>
                        I&#39;d love to connect.
                    </p>

                </div>
            </div>
        </div>
    )
}