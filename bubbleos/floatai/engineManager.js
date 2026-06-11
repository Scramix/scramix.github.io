const FloatAIEngine = {
    generator: null,

    async init() {
        if (this.generator) return;

        try {
            const { pipeline, env } = await import(
                "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js"
            );

            env.allowLocalModels = false;
            env.useBrowserCache = true;

            this.generator = await pipeline(
                "text-generation",
                "Xenova/TinyLlama-1.1B-Chat-v1.0"
            );

        } catch (err) {
            console.error("Init failed:", err);
            this.generator = null;
        }
    },

    buildPrompt(messages) {
        const history = messages
            .slice(-8)
            .map(m => `${m.role}: ${m.content}`)
            .join("\n");

        return `You are Float, a helpful assistant.

${history}

assistant:`;
    },

    async send(messages) {
        try {
            await this.init();

            if (!this.generator) {
                return "Engine failed to load.";
            }

            const prompt = this.buildPrompt(messages);

            const result = await this.generator(prompt, {
                max_new_tokens: 120,
                temperature: 0.7,
                do_sample: true,
            });

            const generated = result?.[0]?.generated_text;

            if (!generated) {
                return "No response generated.";
            }

            // strip prompt safely
            let reply = generated.slice(prompt.length).trim();

            if (!reply) {
                return "I couldn't generate a response.";
            }

            return reply;

        } catch (err) {
            console.error("Float AI Error:", err);
            return "Engine error.";
        }
    }
};
