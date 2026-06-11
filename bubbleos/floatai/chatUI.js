const FloatUI = {
    init() {
        this.chatBox = document.getElementById("chatBox");
        this.input = document.getElementById("chatInput");
        this.sendBtn = document.getElementById("sendBtn");
        this.list = document.getElementById("chatList");

        this.input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.send();
            }
        });

        document.getElementById("newChatBtn").onclick = () => this.newChat();

        const settingsBtn = document.getElementById("settingsBtn");
        if (settingsBtn) {
            settingsBtn.onclick = () => {
                const modal = document.getElementById("settingsModal");
                if (modal) modal.style.display = "block";
            };
        }

        document.getElementById("chatSearch").oninput = (e) =>
            this.renderSidebar(FloatAIChats.search(e.target.value));

        this.sendBtn.onclick = () => this.send();

        this.newChat();
    },

    newChat() {
        const chat = FloatAIChats.createChat();
        this.renderSidebar(FloatAIChats.chats);
        this.renderChat(chat.id);
    },

    renderSidebar(chats) {
        this.list.innerHTML = "";

        chats.forEach(chat => {
            const row = document.createElement("div");
            row.className = "chatRow";

            const btn = document.createElement("button");
            btn.className = "chatBtn";
            btn.textContent = chat.title;

            btn.onclick = () => this.renderChat(chat.id);

            const menu = document.createElement("button");
            menu.className = "menuBtn";
            menu.textContent = "⋮";

            menu.onclick = (e) => {
                e.stopPropagation();

                const ok = confirm(
                    `Delete chat "${chat.title}"?`
                );

                if (!ok) return;

                FloatAIChats.deleteChat(chat.id);

                this.renderSidebar(FloatAIChats.chats);

                if (FloatAIChats.activeChatId === chat.id) {
                    this.newChat();
                }
            };

            row.appendChild(btn);
            row.appendChild(menu);
            this.list.appendChild(row);
        });
    },

    renderChat(id) {
        FloatAIChats.activeChatId = id;

        const chat = FloatAIChats.getActiveChat();
        if (!chat) return;

        this.chatBox.innerHTML = "";

        for (const m of chat.messages) {
            const div = document.createElement("div");
            div.className = m.role;
            div.textContent = m.content;
            this.chatBox.appendChild(div);
        }

        this.chatBox.scrollTop = this.chatBox.scrollHeight;
    },

    async send() {
        const text = this.input.value.trim();
        if (!text) return;

        this.input.value = "";

        FloatAIChats.addMessage("user", text);
        this.renderChat(FloatAIChats.activeChatId);

        const chat = FloatAIChats.getActiveChat();
        if (!chat) return;

        FloatAIChats.addMessage("assistant", "…thinking");
        this.renderChat(chat.id);

        try {
            const reply = await FloatAIEngine.send(chat.messages);

            chat.messages.pop();
            FloatAIChats.addMessage("assistant", reply);
        } catch (err) {
            chat.messages.pop();
            FloatAIChats.addMessage("assistant", "Engine error.");
            console.error("Chat send error:", err);
        }

        this.renderChat(chat.id);
    }
};

window.addEventListener("load", () => FloatUI.init());
