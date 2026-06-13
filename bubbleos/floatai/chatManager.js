const FloatAIChats = {
    chats: [],
    activeChatId: null,

    load() {
        const saved = localStorage.getItem("floatai_chats");
        this.chats = saved ? JSON.parse(saved) : [];
    },

    save() {
        localStorage.setItem(
            "floatai_chats",
            JSON.stringify(this.chats)
        );
    },

    createChat() {
        const chat = {
            id: Date.now(),
            title: "New Chat",
            messages: []
        };

        this.chats.unshift(chat);
        this.activeChatId = chat.id;
        this.save();

        return chat;
    },

    getActiveChat() {
        return this.chats.find(
            c => c.id === this.activeChatId
        );
    },

    addMessage(role, content) {
        const chat = this.getActiveChat();
        if (!chat) return;

        chat.messages.push({
            role,
            content
        });

        if (
            chat.title === "New Chat" &&
            role === "user"
        ) {
            chat.title = content.slice(0, 28);
        }

        this.save();
    },

    deleteChat(id) {
        this.chats = this.chats.filter(
            chat => chat.id !== id
        );

        if (this.activeChatId === id) {
            if (this.chats.length > 0) {
                this.activeChatId =
                    this.chats[0].id;
            } else {
                this.activeChatId = null;
            }
        }

        this.save();
    },

    search(query) {
        const q = query.toLowerCase();

        return this.chats.filter(
            c =>
                c.title
                    .toLowerCase()
                    .includes(q) ||
                c.messages.some(
                    m =>
                        m.content
                            .toLowerCase()
                            .includes(q)
                )
        );
    }
};

FloatAIChats.load();
