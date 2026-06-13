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
            "Xenova/TinyLlama-1.1B-Chat-v1.0"
        );
    },

    async send(messages) {
        try {
            await this.init();

            const history = messages
                .slice(-8)
                .map(m => `${m.role}: ${m.content}`)
                .join("\n");

            const prompt = `Hi Float.

${history}

assistant:`;

            const generationPromise = this.generator(prompt, {
                max_new_tokens: 64,
                temperature: 0.7,
                do_sample: true
            });

            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                    reject(new Error("Generation timed out"));
                }, 30000);
            });

            const result = await Promise.race([
                generationPromise,
                timeoutPromise
            ]);

            const generated =
                result?.[0]?.generated_text || "";

            const reply = generated
                .slice(prompt.length)
                .trim();

            return reply || "I couldn't generate a response.";

        } catch (err) {
            console.error("Float AI Error:", err);
            return `Engine error: ${err?.message || err}`;
        }
    }
};
