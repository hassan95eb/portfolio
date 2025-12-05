import React from "react";

export default function SocialWidget() {
    return (
        <div className="bg-white min-h-screen flex items-center justify-center">
            <div className="p-6 bg-gray-50 rounded-xl shadow-xl max-w-xs w-full sm:max-w-sm lg:max-w-xs">
                <h3 className="text-lg font-semibold text-primary-dark mb-4 border-b pb-2">
                    Connect with me
                </h3>
                <div className="flex flex-col space-y-4">
                    <a
                        href="#"
                        className="flex items-center space-x-3 text-gray-700 hover:text-pink-600 icon-link"
                    >
                        <i
                            data-lucide="instagram"
                            className="w-6 h-6"
                        ></i>
                        <span className="text-sm font-medium">
                            Instagram
                        </span>
                    </a>

                    <a
                        href="#"
                        className="flex items-center space-x-3 text-gray-700 hover:text-blue-700 icon-link"
                    >
                        <i
                            data-lucide="linkedin"
                            className="w-6 h-6"
                        ></i>
                        <span className="text-sm font-medium">
                            LinkedIn
                        </span>
                    </a>

                    <a
                        href="#"
                        className="flex items-center space-x-3 text-gray-700 hover:text-red-500 icon-link"
                    >
                        <i
                            data-lucide="dribbble"
                            className="w-6 h-6"
                        ></i>
                        <span className="text-sm font-medium">
                            Behance/Dribbble
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}
