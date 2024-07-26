import React, { useState } from 'react';
import { ChevronLeft, MessageSquare, Calendar, ChevronDown, ChevronUp, Github, Check, Code } from 'lucide-react';

const Sidebar = () => (
    <div className="w-full sm:w-1/3 space-y-8 p-8">
        <div className="space-y-4">
            <button className="group inline-flex items-center justify-center whitespace-nowrap font-medium border border-transparent rounded-md focus:outline-none shadow-sm disabled:cursor-not-allowed disabled:opacity-50 px-2.5 py-1.5 text-xs hover:bg-gray-700 text-gray-200">
                <ChevronLeft className="mr-2 h-4 w-4" />
                <span className="truncate">Back</span>
            </button>
            <h1 className="text-2xl font-semibold text-gray-50">Get started</h1>
            <p className="text-gray-400 max-w-xs">Please follow the steps to configure your repository and deploy it.</p>
        </div>
        <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Git repo</p>
            <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-gray-400" />
                <a href="https://github.com/restackio/starter-genai-langchain-py" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-100 hover:underline truncate">
                    restackio/starter-genai-langchain-py
                </a>
            </div>
        </div>
        <div className="border-t border-gray-600 py-4">
            <div className="space-y-4">
                <p className="text-gray-500">Need help?</p>
                <div className="space-y-2">
                    <p className="text-xs text-gray-400">Our team is available by chat.</p>
                    <button className="group inline-flex items-center justify-center whitespace-nowrap font-medium border border-transparent rounded-md focus:outline-none shadow-sm disabled:cursor-not-allowed disabled:opacity-50 px-2.5 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-gray-500 text-white">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span className="truncate">Chat with us</span>
                    </button>
                </div>
                <div className="space-y-2">
                    <p className="text-xs text-gray-400">Our CTO can help you build an AI product.</p>
                    <button className="group inline-flex items-center justify-center whitespace-nowrap font-medium border border-transparent rounded-md focus:outline-none shadow-sm disabled:cursor-not-allowed disabled:opacity-50 px-2.5 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 border-gray-600 hover:border-gray-500 text-white">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span className="truncate">Book a session</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
);

const SetupStep = ({ title, isActive, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <section className={`${isActive ? '' : 'pointer-events-none opacity-50'}`}>
            <div className="inline-block p-4 w-full h-full border bg-gradient-to-br from-gray-700 to-gray-700 hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-700 hover:drop-shadow-xl border-gray-600 rounded-lg px-1 py-0 space-y-4">
                <div>
                    <button className="w-full" onClick={() => setIsOpen(!isOpen)}>
                        <div className="flex w-full justify-between p-4 items-center text-gray-400 group space-x-4">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400 group-hover:text-gray-200">{title}</span>
                            {isOpen ? (
                                <ChevronUp className="w-5 h-5 group-hover:text-gray-200" />
                            ) : (
                                <ChevronDown className="w-5 h-5 group-hover:text-gray-200" />
                            )}
                        </div>
                    </button>
                    {isOpen && <div className="pt-0 p-4">{children}</div>}
                </div>
            </div>
        </section>
    );
};

const SetupPageLayout = () => (
    <div className="min-h-screen text-white bg-gray-900">
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col sm:flex-row gap-8">
                <Sidebar />
                <div className="w-full sm:w-2/3 space-y-4">
                    <SetupStep title="Create repository" isActive={true}>
                        <div className="space-y-6">
                            <p className="text-gray-200">To ensure you can easily update your project after deploying it, a Git repository must be created. Every push to that Git repository will be deployed automatically.</p>
                            <div>
                                <div className="mb-6">
                                    <label className="block mb-1 text-gray-100 text-sm font-medium">Organization</label>
                                    <button className="group inline-flex items-center justify-center whitespace-nowrap font-medium border border-transparent rounded-md focus:outline-none shadow-sm disabled:cursor-not-allowed disabled:opacity-50 px-3 py-1.5 text-sm bg-purple-600 hover:bg-purple-500 border-purple-500 hover:border-purple-400 h-10">
                                        <Github className="text-white mr-4 w-4 h-4" />
                                        <span className="truncate">+ Add GitHub organization</span>
                                    </button>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="repositoryName" className="block mb-1 text-gray-100 text-sm font-medium">Repository name</label>
                                    <input
                                        className="disabled:opacity-50 block w-full bg-gray-900 rounded-md shadow-sm focus:ring-purple-400 border-1 border-transparent mb-6"
                                        type="text"
                                        value="starter-genai-langchain-py"
                                        name="repositoryName"
                                    />
                                </div>
                                <div className="mb-6">
                                    <div className="flex items-center">
                                        <button className="bg-black relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500" role="switch" aria-checked="false">
                                            <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                                        </button>
                                        <span className="ml-3 text-sm text-gray-100">Create private Repository</span>
                                    </div>
                                </div>
                                <button className="px-3 py-1.5 text-sm bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-md text-white">
                                    Create
                                </button>
                            </div>
                        </div>
                    </SetupStep>

                    <SetupStep title="Local setup" isActive={false}>
                        <div className="text-gray-100 space-y-4">
                            <p>You are ready to run your repository locally:</p>
                            <div className="space-y-2">
                                <div className="p-4 bg-gray-900 sm:h-12 rounded-lg sm:flex gap-4 items-center justify-between text-white space-y-4 sm:space-y-0">
                                    <p>Open it in your favorite code editor:</p>
                                    <div className="flex items-center gap-2">
                                        <button className="px-2.5 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-md text-white">
                                            VS Code
                                        </button>
                                        <button className="px-2.5 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-md text-white">
                                            Cursor
                                        </button>
                                        <button className="px-2.5 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-md text-white">
                                            JetBrains IDE
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 bg-gray-900 sm:h-12 rounded-lg sm:flex gap-4 items-center justify-between text-white space-y-4 sm:space-y-0">
                                    <p>Or directly on GitHub: </p>
                                    <button className="px-2.5 py-1.5 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 rounded-md text-white">
                                        Open GitHub repo
                                    </button>
                                </div>
                            </div>
                            <p>Push a commit and Restack will automatically build and deploy your application.</p>
                        </div>
                    </SetupStep>

                    <SetupStep title="Deploy" isActive={false}>
                        <div className="space-y-4">
                            <div className="text-gray-200">
                                <p>Preparing repository.</p>
                            </div>
                            <div className="p-4 space-y-4 bg-gray-800 border border-gray-600 rounded-md divide-y divide-gray-600">
                                <div className="">
                                    <button className="text-gray-500 text-sm w-full text-left flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Check className="w-4 h-4 mr-1" />
                                            <span>GitHub commit</span>
                                        </div>
                                    </button>
                                </div>
                                <div className="pt-4">
                                    <button className="text-gray-500 text-sm w-full text-left flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Code className="w-4 h-4 mr-1" />
                                            <span>Building logs</span>
                                        </div>
                                    </button>
                                </div>
                                <div className="pt-4">
                                    <button className="text-gray-500 text-sm w-full text-left flex justify-between items-center">
                                        <div className="flex items-center">
                                            <Code className="w-4 h-4 mr-1" />
                                            <span>Deploying application</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </SetupStep>
                </div>
            </div>
        </div>
    </div>
);

export default SetupPageLayout;
