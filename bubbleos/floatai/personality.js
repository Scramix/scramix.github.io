const FloatAIPersonality = {

    settings: {
        emojiLevel: "medium",
        engine: "float-distilgpt2"
    },

    load() {
        const saved =
            localStorage.getItem("floatai_personality");

        if (saved) {
            this.settings =
                JSON.parse(saved);
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

    setEngine(engine) {
        this.settings.engine = engine;
        this.save();
    },

    getEngine() {
        return this.settings.engine;
    }
};

FloatAIPersonality.load();
