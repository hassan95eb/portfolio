import data from "./data.json";
interface Project {
    id: number;
    title: string;
    description: string;
    isFeatured?: boolean;
}

async function fetchPortfolioData() {
    await new Promise((resolve) =>
        setTimeout(resolve, 2000)
    );

    return data;
}
async function Home() {
    const portfolioData = await fetchPortfolioData();
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-luxury-teal">
            <div className="text-luxury-gold text-3xl">
                Hello Project
            </div>
            {portfolioData.map((project: Project) => (
                <article
                    key={project.id}
                    className="p-6 border rounded-lg shadow-md"
                >
                    <h2 className="text-2xl font-semibold mb-2">
                        {project.title}
                    </h2>
                    <p className="text-gray-700">
                        {project.description}
                    </p>
                </article>
            ))}
        </div>
    );
}
export default Home;
