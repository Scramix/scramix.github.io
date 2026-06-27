import * as webllm from "https://esm.run/@mlc-ai/web-llm";

console.table(
    webllm.prebuiltAppConfig.model_list.map(m => ({
        id: m.model_id
    }))
);

const FloatAIEngine = {
    engine: null,
    model: "", // Decent browser model

    async init() {
        if (this.engine) return;

        this.engine = await webllm.CreateMLCEngine(this.model, {
            initProgressCallback: (p) => {
                console.log("Loading:", p);
            }
        });
    },

    async send(messages) {
        try {
            await this.init();

            const formatted = messages.map(m => ({
                role: m.role,
                content: m.content
            }));

            const reply = await this.engine.chat.completions.create({
                messages: formatted,
                temperature: 0.7,
                max_tokens: 200
            });

            return reply.choices?.[0]?.message?.content
                ?? "No response.";

        } catch (err) {
            console.error("WebLLM error:", err);
            return "Engine error.";
        }
    }
};

window.FloatAIEngine = FloatAIEngine;
