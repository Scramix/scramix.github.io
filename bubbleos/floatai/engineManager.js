import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers";

let generator = null;

const FloatAIEngine = {

    async init() {

        if (generator) return;

        const model =
            FloatAIPersonality.getEngine();

        generator = await pipeline(
            "text-generation",
            model === "float-distilgpt2"
                ? "Xenova/distilgpt2"
                : "Xenova/gpt2"
        );
    },

    async send(messages) {

        await this.init();

        const lastUser =
            messages
                .filter(m => m.role === "user")
                .slice(-1)[0]?.content || "";

        const prompt =
`System: Float AI running in BubbleOS environment.
User: ${lastUser}
Assistant:`;

        const result =
            await generator(prompt, {
                max_new_tokens: 80,
                temperature: 0.7,
                top_p: 0.9
            });

        const text =
            result[0].generated_text;

        return (
            text.split("Assistant:")[1]?.trim()
            || text
        );
    }
};
