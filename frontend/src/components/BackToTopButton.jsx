import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`fixed bottom-6 right-6 z-[60] bg-brand-primary text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_18px_5px_rgba(37,79,34,0.45)] focus-visible:ring-offset-brand-bg ${
                isVisible
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-75 translate-y-10 pointer-events-none"
            }`}
        >
            <FiArrowUp className="w-6 h-6 stroke-[2.5]" />
        </button>
    );
}
