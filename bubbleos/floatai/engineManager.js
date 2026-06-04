console.log("Generator:", this.generator);

const result = await this.generator(prompt, {
    max_new_tokens: 120
});

console.log("Result:", result);
