const FloatAIPersonality = {

    settings: {
        emojiLevel: "medium",
        engine: "float-distilgpt2"
    },

    load() {
        const saved =
            localStorage.getItem("floatai_personality");

        if (!saved) return;

        try {
            const parsed = JSON.parse(saved);

            // merge instead of overwrite (IMPORTANT FIX)
            this.settings = {
                ...this.settings,
                ...parsed
            };

        } catch (e) {
            console.warn("Corrupt personality data, resetting...");
            this.save();
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
        return this.settings.emojiLevel ?? "medium";
    },

    setEngine(engine) {
        this.settings.engine = engine;
        this.save();
    },

    getEngine() {
        return this.settings.engine ?? "float-distilgpt2";
    }
};

FloatAIPersonality.load();
