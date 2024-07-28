import { Calendar, ChevronRight, Github } from "lucide-react";
import { ReactNode } from "react";

interface CardProps {
    title: ReactNode;
    description: ReactNode;
    tags?: string[];
    githubLink?: string;
    customBg?: string;
    children?: ReactNode;
}

const Card = ({ title, description, tags, githubLink }: CardProps) => (
    <div className="bg-gray-800 hover:bg-gray-750 border border-gray-700 hover:border-gray-600 p-5 rounded-xl cursor-pointer transition-all duration-300 group">
        <div className="space-y-4">
            <div>
                <h2 className="text-xl font-semibold text-white group-hover:text-gray-100 transition-colors duration-300">
                    {title}
                </h2>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-2.5 py-1 rounded text-sm">
                        {tag}
                    </span>
                ))}
            </div>
            {githubLink && (
                <div className="flex items-center gap-2">
                    <Github size={16} className="text-gray-400" />
                    <a
                        href={githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gray-300 hover:underline hover:text-gray-100 transition-colors duration-300"
                    >
                        {githubLink.split("/").slice(-2).join("/")}
                    </a>
                </div>
            )}
        </div>
    </div>
);

const Button = ({ children, icon: Icon }) => (
    <button className="group inline-flex items-center justify-center whitespace-nowrap font-medium border border-gray-600 rounded-md focus:outline-none shadow-sm px-3 py-2 text-sm bg-gray-700 hover:bg-gray-650 hover:border-gray-550 transition-all duration-300">
        {Icon && <Icon className="text-gray-400 group-hover:text-white -ml-0.5 mr-2 h-4 w-4" />}
        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">{children}</span>
    </button>
);

const DashboardCards = () => (
    <div
        className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8"
        style={{
            backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.4' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E\")",
        }}
    >
        <div className="max-w-6xl mx-auto space-y-12">
            <section className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 shadow-text">Custom</h2>
                    <p className="text-gray-400">Create your own service.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card
                        title="Import git repository"
                        description="Get started by importing a repository from GitHub."
                        tags={[]}
                    />
                    <Card
                        title="Generate with AI"
                        description="Generate a custom starter repo with our AI code assistant."
                        tags={[]}
                    >
                        <Button icon={ChevronRight}>Add VS Code extension</Button>
                    </Card>
                    <Card
                        title="Get help from our founders"
                        description="Our CTO can help you plan how to build your AI product."
                        tags={[]}
                    >
                        <Button icon={Calendar}>Book a session</Button>
                    </Card>
                </div>
            </section>
            <section className="space-y-8">
                <div>
                    <h2 className="text-3xl font-bold text-white mb-2 shadow-text">Frameworks</h2>
                    <p className="text-gray-400">Build from pre-built templates.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card
                        title="Flask + Langchain"
                        description="Serve your langchain python application with a Flask API."
                        tags={["python", "flask", "langchain"]}
                        githubLink="https://github.com/restackio/starter-genai-langchain-py"
                    />
                    <Card
                        title="Streamlit + LlamaIndex"
                        description="Serve your llamaindex python application with Streamlit."
                        tags={["python", "streamlit", "llamaindex"]}
                        githubLink="https://github.com/restackio/starter-genai-streamlit-llamaindex-py"
                    />
                </div>
            </section>
        </div>
    </div>
);

export default DashboardCards;
