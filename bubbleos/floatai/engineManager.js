const FloatAIEngine = {
    generator: null,

    async init() {
        if (this.generator) return;

        const { pipeline, env } = await import(
            "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js"
        );

        env.allowLocalModels = false;
        env.useBrowserCache = true;

        this.generator = await pipeline(
            "text-generation",
            "Xenova/phi-1_5-mini"
        );
    },

    async send(messages) {
        try {
            await this.init();

            const history =
                messages
                    .slice(-8)
                    .map(m => `${m.role}: ${m.content}`)
                    .join("\n");

            const prompt =
`Hello, Float.

${history}

assistant:`;

            const result = await this.generator(prompt, {
                max_new_tokens: 100,
                temperature: 0.7,
                do_sample: true
            });

            let text =
                result?.[0]?.generated_text || "";

            const idx = text.lastIndexOf("assistant:");

            if (idx !== -1) {
                text = text.slice(idx + 10);
            }

            text = text.trim();

            return text || "I couldn't generate a response.";
        } catch (err) {
            console.error(err);
            return "Engine error.";
        }
    }
};
