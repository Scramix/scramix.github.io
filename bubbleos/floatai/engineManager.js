const FloatAIEngine = {
    generator: null,

    async init() {
        if (this.generator) return;

        const { pipeline } = await import(
            "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js"
        );

        this.generator = await pipeline(
            "text2text-generation",
            "Xenova/flan-t5-small"
        );
    },

    async send(messages) {
        try {
            await this.init();

            const lastUser =
                [...messages]
                    .filter(m => m.role === "user")
                    .slice(-1)[0]?.content || "";

            const history =
                messages
                    .slice(-6)
                    .map(m => `${m.role}: ${m.content}`)
                    .join("\n");

            const prompt =
`Hello.

Conversation:
${history}

User question:
${lastUser}

Respond clearly and concisely.`;

            const result = await this.generator(prompt, {
                max_new_tokens: 120
            });

            const text = result?.[0]?.generated_text?.trim();

            return text || "Error. Please resend your message.";
        } catch (err) {
            console.error("FloatAIEngine error:", err);
            return "Error. Please resend your message.";
        }
    }
};
