import { pipeline } from "https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2/dist/transformers.min.js";

let generator = null;

const FloatAIEngine = {

    async init() {

        if (generator) return;

        const model =
            FloatAIPersonality.getEngine();

        // safer model selection
        const modelName =
            model === "float-distilgpt2"
                ? "Xenova/distilgpt2"
                : "Xenova/gpt2";

        generator = await pipeline(
            "text-generation",
            modelName
        );
    },

    async send(messages) {

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
`You are Float AI, a helpful assistant inside a retro OS.

Conversation:
${history}

user: ${lastUser}
assistant:`;

        const result =
            await generator(prompt, {
                max_new_tokens: 100,
                temperature: 0.8,
                top_p: 0.95,
                repetition_penalty: 1.1
            });

        let text =
            result?.[0]?.generated_text || "";

        // safer extraction
        const split =
            text.split("assistant:");

        if (split.length > 1) {
            text = split[split.length - 1];
        }

        text = text.trim();

        // fallback so it NEVER returns empty
        if (!text) {
            return "…Float AI failed to generate a response.";
        }

        return text;
    }
};
