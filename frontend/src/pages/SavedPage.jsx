import { useApp } from "../context/AppContext";
import { FiLock } from "react-icons/fi";
import { FaUtensils, FaHeart } from "react-icons/fa6";

export default function SavedPage() {
    const { navigate, saved, toggleSave, user } = useApp();

    if (!user) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
                <FiLock className="text-[64px] text-[#C97D2E] mb-5" />
                <h2 className="serif text-[28px] font-black text-brand-primary mb-3">
                    Log in to save recipes
                </h2>
                <p className="text-brand-primary/70 mb-7">
                    Create a free account to build your personal cookbook.
                </p>
                <button
                    className="btn-primary px-8 py-3.5 rounded-xl text-[15px]"
                    onClick={() => navigate("signup")}
                >
                    Sign Up Free
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-bg px-6 py-8 md:py-12">
            <div className="max-w-[1200px] mx-auto">
                <h1 className="serif slide-up text-[clamp(26px,4vw,42px)] font-black text-brand-primary mb-2 flex items-center gap-2">
                    Your Cookbook{" "}
                    <FaHeart className="text-brand-secondary text-3xl" />
                </h1>
                <p className="slide-up stagger-1 text-brand-primary/70 mb-9">
                    {saved.length} saved recipe{saved.length !== 1 ? "s" : ""}
                </p>

                {saved.length === 0 ? (
                    <div className="text-center py-20 px-6 bg-brand-card rounded-[20px] border border-brand-primary/10">
                        <FaUtensils className="text-[60px] text-brand-secondary mx-auto block mb-6 opacity-60" />
                        <p className="text-brand-primary mb-6">
                            You haven't saved any recipes yet.
                        </p>
                        <button
                            className="btn-primary px-7 py-3 rounded-[11px] text-sm"
                            onClick={() => navigate("dashboard")}
                        >
                            Browse Recipes
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-6">
                        {saved.map((r, i) => (
                            <div
                                key={r.id}
                                className="card slide-up rounded-[20px] overflow-hidden cursor-default"
                                style={{ animationDelay: `${i * 0.07}s` }}
                            >
                                <div
                                    className="h-1.5"
                                    style={{ background: r.accent }}
                                />
                                <div
                                    className="p-5"
                                    onClick={() => navigate("recipe", r)}
                                >
                                    <div className="flex gap-3 items-center mb-3">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                                            style={{
                                                background: r.accent + "22",
                                            }}
                                        >
                                            {r.emoji}
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-primary text-base">
                                                {r.title}
                                            </p>
                                            <p className="text-[13px] text-brand-primary/80 uppercase tracking-wider">
                                                {r.cuisine} · {r.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            className="bg-none border-none cursor-pointer text-xl hover:scale-125 transition-transform"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSave(r);
                                            }}
                                        >
                                            <FaHeart className="text-brand-secondary" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
