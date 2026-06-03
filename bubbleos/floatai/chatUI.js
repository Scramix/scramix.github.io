const FloatUI = {

    init() {

        this.chatBox =
            document.getElementById("chatBox");

        this.input =
            document.getElementById("chatInput");

        this.sendBtn =
            document.getElementById("sendBtn");

        this.list =
            document.getElementById("chatList");

        document.getElementById("newChatBtn")
            .onclick = () => this.newChat();

        document.getElementById("chatSearch")
            .oninput = (e) =>
                this.renderSidebar(
                    FloatAIChats.search(e.target.value)
                );

        this.sendBtn.onclick = () => this.send();

        this.newChat();
    },

    newChat() {

        const chat =
            FloatAIChats.createChat();

        this.renderSidebar(FloatAIChats.chats);

        this.renderChat(chat.id);
    },

    renderSidebar(chats) {

        this.list.innerHTML = "";

        chats.forEach(chat => {

            const btn =
                document.createElement("button");

            btn.textContent = chat.title;

            btn.onclick = () =>
                this.renderChat(chat.id);

            this.list.appendChild(btn);
        });
    },

    renderChat(id) {

        FloatAIChats.activeChatId = id;

        const chat =
            FloatAIChats.getActiveChat();

        this.chatBox.innerHTML = "";

        chat.messages.forEach(m => {

            const div =
                document.createElement("div");

            div.className = m.role;
            div.textContent = m.content;

            this.chatBox.appendChild(div);
        });
    },

    async send() {

        const text =
            this.input.value.trim();

        if (!text) return;

        this.input.value = "";

        FloatAIChats.addMessage("user", text);

        this.renderChat(FloatAIChats.activeChatId);

        const chat =
            FloatAIChats.getActiveChat();

        const reply =
            await FloatAIEngine.send(chat.messages);

        FloatAIChats.addMessage("assistant", reply);

        this.renderChat(chat.id);
    }
};

window.addEventListener("load", () =>
    FloatUI.init()
);
