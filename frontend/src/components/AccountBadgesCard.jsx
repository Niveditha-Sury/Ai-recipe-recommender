import { useState, useEffect } from "react";
import { FiLock, FiCheckCircle, FiX } from "react-icons/fi";
import { calculateUserBadges } from "../data/badges";

export function AccountBadgesCard({ user }) {
    // We default cookDays to 14 for demonstration purposes if missing
    const userXp = user?.xp || 0;
    const userCookDays = user?.cookDays || 14;

    const badges = calculateUserBadges(userXp, userCookDays);
    const [activeBadge, setActiveBadge] = useState(null);

    // Prevent body scrolling when modal is open
    useEffect(() => {
        if (activeBadge) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [activeBadge]);

    const xpBadges = badges.filter((b) => b.type === "xp");
    const dayBadges = badges.filter((b) => b.type === "days");

    const renderBadgeGrid = (badgeList) => (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {badgeList.map((badge) => {
                const {
                    id,
                    title,
                    description,
                    emoji,
                    color,
                    bg,
                    isUnlocked,
                    progress,
                } = badge;

                return (
                    <button
                        key={id}
                        onClick={() => setActiveBadge(badge)}
                        className={`cursor-pointer relative rounded-2xl p-4 flex flex-col items-center text-center transition-all border-none outline-none ${
                            isUnlocked
                                ? "bg-brand-card border border-brand-primary/10 shadow-sm hover:scale-105 hover:shadow-[0_0_14px_3px_rgba(245,130,74,0.3)]"
                                : "bg-brand-primary/5 border border-transparent grayscale-80 opacity-60 hover:opacity-100 hover:scale-[1.02]"
                        }`}
                        title={description}
                    >
                        {/* Status Icon */}
                        <div className="absolute top-2 right-2 flex">
                            {isUnlocked ? (
                                <FiCheckCircle
                                    className="text-brand-secondary"
                                    size={14}
                                />
                            ) : (
                                <FiLock
                                    className="text-brand-primary/40"
                                    size={14}
                                />
                            )}
                        </div>

                        {/* Badge Illustration */}
                        <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center text-[28px] mb-3 ${bg}`}
                            style={{
                                color: isUnlocked ? color : "inherit",
                                textShadow: isUnlocked
                                    ? `0 2px 10px ${color}40`
                                    : "none",
                            }}
                        >
                            {emoji}
                        </div>

                        <h4 className="text-[13px] font-bold text-brand-primary leading-tight mb-1">
                            {title}
                        </h4>

                        {/* Progress Bar for Locked */}
                        {!isUnlocked && progress > 0 ? (
                            <div className="w-full bg-brand-primary/10 rounded-full h-1 mt-auto">
                                <div
                                    className="bg-brand-primary/40 h-1 rounded-full"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        ) : !isUnlocked ? (
                            <span className="text-[11px] text-brand-primary/50 mt-auto uppercase font-bold tracking-wider">
                                Locked
                            </span>
                        ) : null}
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto">
            {/* Overview Stats */}
            <div className="card slide-up stagger-1 rounded-card p-6 text-center">
                <h2 className="serif text-[26px] font-black text-brand-primary mb-2">
                    Your Cooking Milestones
                </h2>
                <p className="text-base text-brand-primary/70 mb-6 max-w-lg mx-auto">
                    Missions accomplished! Earn XP and cook consecutively to
                    unlock these exclusive badges for your chef profile.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <div className="bg-brand-bg px-6 py-3 rounded-xl border border-brand-primary/10">
                        <span className="text-[12px] uppercase tracking-widest text-brand-primary/60 font-bold block mb-1">
                            Current XP
                        </span>
                        <span className="text-xl font-black text-brand-primary">
                            {userXp.toLocaleString()}
                        </span>
                    </div>
                    <div className="bg-brand-bg px-6 py-3 rounded-xl border border-brand-primary/10">
                        <span className="text-[12px] uppercase tracking-widest text-brand-primary/60 font-bold block mb-1">
                            Days Cooked
                        </span>
                        <span className="text-xl font-black text-brand-primary">
                            {userCookDays}
                        </span>
                    </div>
                    <div className="bg-brand-bg px-6 py-3 rounded-xl border border-brand-primary/10">
                        <span className="text-[12px] uppercase tracking-widest text-brand-primary/60 font-bold block mb-1">
                            Badges Unlocked
                        </span>
                        <span className="text-xl font-black text-brand-secondary">
                            {badges.filter((b) => b.isUnlocked).length} /{" "}
                            {badges.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* XP Badges Section */}
            <div className="card slide-up stagger-2 rounded-card p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6 border-b border-brand-primary/10 pb-4">
                    <div>
                        <h3 className="serif text-[22px] font-black text-brand-primary">
                            XP Progression
                        </h3>
                        <p className="text-[14px] text-brand-primary/60 mt-1">
                            Badges awarded for generating recipes and expanding
                            your culinary skills.
                        </p>
                    </div>
                </div>
                {renderBadgeGrid(xpBadges)}
            </div>

            {/* Days Cooked Badges Section */}
            <div className="card slide-up stagger-3 rounded-card p-6 lg:p-8">
                <div className="flex items-center justify-between mb-6 border-b border-brand-primary/10 pb-4">
                    <div>
                        <h3 className="serif text-[22px] font-black text-brand-primary">
                            Consistency Streaks
                        </h3>
                        <p className="text-[14px] text-brand-primary/60 mt-1">
                            Badges awarded for building a consistent habit of
                            cooking meals over time.
                        </p>
                    </div>
                </div>
                {renderBadgeGrid(dayBadges)}
            </div>

            {/* Modal Detail Overlay */}
            {activeBadge && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-primary/40 backdrop-blur-sm slide-up"
                    onClick={() => setActiveBadge(null)}
                >
                    <div
                        className="bg-brand-card rounded-card shadow-2xl w-full max-w-sm overflow-hidden flex flex-col items-center relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header/Banner */}
                        <div
                            className="w-full h-32 flex items-center justify-center relative"
                            style={{
                                backgroundColor:
                                    activeBadge.bg
                                        .replace("bg-", "")
                                        .replace("-100", "") === "bg-brand-bg"
                                        ? "#EDE4C2"
                                        : activeBadge.color + "22",
                            }}
                        >
                            <button
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-brand-primary/5 text-brand-primary/60 hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
                                onClick={() => setActiveBadge(null)}
                            >
                                <FiX size={18} />
                            </button>

                            <div
                                className={`absolute -bottom-10 w-24 h-24 rounded-full flex items-center justify-center text-[48px] shadow-lg border-4 border-white ${activeBadge.bg} ${!activeBadge.isUnlocked ? "grayscale opacity-80" : ""}`}
                                style={{
                                    color: activeBadge.isUnlocked
                                        ? activeBadge.color
                                        : "inherit",
                                }}
                            >
                                {activeBadge.emoji}
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="pt-14 px-8 pb-8 text-center flex flex-col items-center w-full">
                            <h3 className="serif text-[26px] font-black text-brand-primary leading-tight mb-2">
                                {activeBadge.title}
                            </h3>

                            {activeBadge.isUnlocked ? (
                                <div className="bg-brand-secondary/10 text-brand-secondary text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 flex items-center gap-1.5">
                                    <FiCheckCircle size={12} /> Badge Unlocked
                                </div>
                            ) : (
                                <div className="bg-brand-primary/10 text-brand-primary/60 text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 flex items-center gap-1.5">
                                    <FiLock size={12} /> Locked Badge
                                </div>
                            )}

                            <p className="text-[15px] text-brand-primary/80 mb-6 font-medium">
                                {activeBadge.description}
                            </p>

                            {/* Detailed Progress Bar */}
                            <div className="w-full bg-brand-bg rounded-xl p-4 border border-brand-primary/10 mb-2">
                                <div className="flex justify-between text-[13px] font-bold mb-2">
                                    <span className="text-brand-primary/60 uppercase tracking-widest">
                                        Criteria Progress
                                    </span>
                                    <span className="text-brand-primary">
                                        {activeBadge.type === "xp"
                                            ? `${userXp.toLocaleString()} / ${activeBadge.threshold.toLocaleString()} XP`
                                            : `${userCookDays} / ${activeBadge.threshold} Days`}
                                    </span>
                                </div>
                                <div className="w-full bg-brand-primary/10 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${activeBadge.progress}%`,
                                            backgroundColor:
                                                activeBadge.isUnlocked
                                                    ? activeBadge.color
                                                    : "var(--brand-primary)",
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
