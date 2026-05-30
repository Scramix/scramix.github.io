const FloatAIPersonality = {
    settings: {
        emojiLevel: "medium", // "none", "low", "medium", "high"
    },

    load() {
        const saved = localStorage.getItem("floatai_personality");
        if (saved) {
            this.settings = JSON.parse(saved);
        }
    },

    save() {
        localStorage.setItem(
            "floatai_personality",
            JSON.stringify(this.settings)
        );
    },

    setEmojiLevel(level) {
        this.settings.emojiLevel = level;
        this.save();
    },

    getEmojiLevel() {
        return this.settings.emojiLevel;
    },

    applyEmojis(text) {
        const level = this.settings.emojiLevel;

        if (level === "none") return text;

        const emojis = {
            low: ["🫧"],
            medium: ["🫧", "✨", "💡"],
            high: ["🫧", "✨", "💡", "🤖", "🚀", "🌊"]
        };

        const pool = emojis[level] || [];

        if (pool.length === 0) return text;

        // randomly sprinkle 1–3 emojis at the end
        const count = level === "high" ? 3 : level === "medium" ? 2 : 1;

        let added = "";
        for (let i = 0; i < count; i++) {
            added += " " + pool[Math.floor(Math.random() * pool.length)];
        }

        return text + added;
    }
};

// auto-load when script runs
FloatAIPersonality.load();
