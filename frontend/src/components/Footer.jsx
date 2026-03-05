import { FaUtensils } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="bg-brand-card text-brand-primary/80 px-6 pt-12 pb-8 border-t border-brand-primary/10">
            <div className="max-w-[1400px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-10">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[20px] text-brand-secondary">
                            <FaUtensils />
                        </span>
                        <span className="serif text-xl font-black text-brand-primary relative top-[1px]">
                            Appitat
                        </span>
                    </div>
                    <p className="text-[13px] leading-relaxed">
                        AI-powered recipe discovery tailored to your tastes,
                        pantry, and lifestyle.
                    </p>
                </div>

                {[
                    [
                        "Discover",
                        [
                            "Browse Recipes",
                            "Trending Today",
                            "Seasonal Picks",
                            "Quick Meals",
                        ],
                    ],
                    [
                        "Account",
                        [
                            "Sign Up Free",
                            "Log In",
                            "Saved Recipes",
                            "Meal Planner",
                        ],
                    ],
                    [
                        "Company",
                        ["About Us", "Blog", "Privacy Policy", "Contact"],
                    ],
                ].map(([title, links]) => (
                    <div key={title}>
                        <p className="text-brand-primary font-bold text-xs tracking-widest uppercase mb-3.5">
                            {title}
                        </p>
                        {links.map((l) => (
                            <p
                                key={l}
                                className="text-[13px] mb-2 transition-colors duration-200"
                            >
                                {l}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
            <div className="max-w-[1400px] mx-auto mt-8 border-t border-brand-primary/10 pt-6 text-center text-xs opacity-70">
                © 2026 Appitat · Powered by Gemini AI
            </div>
        </footer>
    );
}
