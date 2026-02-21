(function() {
"use strict";

        const MODELS = [
            // Free Models (Expanded)
            { id: 'google/gemini-2.0-flash-exp:free', name: 'Gemini 2.0 Flash', free: true, image: true, audio: false },
            { id: 'google/gemma-3-27b-it:free', name: 'Gemma 3 27B', free: true, image: true, audio: false },
            { id: 'google/gemma-3-12b-it:free', name: 'Gemma 3 12B', free: true, image: true, audio: false },
            { id: 'google/gemma-3-4b-it:free', name: 'Gemma 3 4B', free: true, image: true, audio: false },
            { id: 'google/gemma-3-1b-it:free', name: 'Gemma 3 1B', free: true, image: false, audio: false },
            { id: 'xiaomi/mimo-v2-flash:free', name: 'MiMo v2 Flash', free: true, image: false, audio: false },
            { id: 'allenai/olmo-3.1-32b-think:free', name: 'OLMo 3.1 32B Think', free: true, image: false, audio: false },
            { id: 'nvidia/nemotron-3-nano-30b-a3b:free', name: 'Nemotron 3 Nano 30B', free: true, image: false, audio: false },
            { id: 'deepseek/deepseek-r1-distill-llama-70b:free', name: 'DeepSeek R1 Distill 70B', free: true, image: false, audio: false },
            { id: 'deepseek/deepseek-r1-distill-qwen-32b:free', name: 'DeepSeek R1 Distill 32B', free: true, image: false, audio: false },
            { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1', free: true, image: false, audio: false },
            { id: 'qwen/qwen3-235b-a22b:free', name: 'Qwen3 235B', free: true, image: false, audio: false },
            { id: 'qwen/qwen3-32b:free', name: 'Qwen3 32B', free: true, image: false, audio: false },
            { id: 'qwen/qwen3-14b:free', name: 'Qwen3 14B', free: true, image: false, audio: false },
            { id: 'qwen/qwen3-8b:free', name: 'Qwen3 8B', free: true, image: false, audio: false },
            { id: 'qwen/qwen-2.5-vl-32b-instruct:free', name: 'Qwen 2.5 VL 32B', free: true, image: true, audio: false },
            { id: 'qwen/qwen-2.5-vl-72b-instruct:free', name: 'Qwen 2.5 VL 72B', free: true, image: true, audio: false },
            { id: 'qwen/qwen-2.5-coder-32b-instruct:free', name: 'Qwen 2.5 Coder 32B', free: true, image: false, audio: false },
            { id: 'meta-llama/llama-3.3-70b-instruct:free', name: 'Llama 3.3 70B', free: true, image: false, audio: false },
            { id: 'meta-llama/llama-3.2-3b-instruct:free', name: 'Llama 3.2 3B', free: true, image: false, audio: false },
            { id: 'meta-llama/llama-3.2-1b-instruct:free', name: 'Llama 3.2 1B', free: true, image: false, audio: false },
            { id: 'meta-llama/llama-3.2-11b-vision-instruct:free', name: 'Llama 3.2 11B Vision', free: true, image: true, audio: false },
            { id: 'meta-llama/llama-4-scout:free', name: 'Llama 4 Scout', free: true, image: true, audio: false },
            { id: 'meta-llama/llama-4-maverick:free', name: 'Llama 4 Maverick', free: true, image: true, audio: false },
            { id: 'mistralai/mistral-small-3.1-24b-instruct:free', name: 'Mistral Small 3.1 24B', free: true, image: true, audio: false },
            { id: 'mistralai/mistral-7b-instruct:free', name: 'Mistral 7B', free: true, image: false, audio: false },
            { id: 'microsoft/phi-4:free', name: 'Phi-4', free: true, image: false, audio: false },
            { id: 'microsoft/phi-4-multimodal-instruct:free', name: 'Phi-4 Multimodal', free: true, image: true, audio: true },
            { id: 'microsoft/phi-3-mini-128k-instruct:free', name: 'Phi-3 Mini', free: true, image: false, audio: false },
            { id: 'nvidia/llama-3.1-nemotron-70b-instruct:free', name: 'Nemotron 70B', free: true, image: false, audio: false },
            { id: 'moonshotai/kimi-vl-a3b-thinking:free', name: 'Kimi VL A3B Think', free: true, image: true, audio: false },
            { id: 'bytedance-research/ui-tars-72b:free', name: 'UI-TARS 72B', free: true, image: true, audio: false },
            { id: 'huggingfaceh4/zephyr-7b-beta:free', name: 'Zephyr 7B', free: true, image: false, audio: false },
            { id: 'openchat/openchat-7b:free', name: 'OpenChat 7B', free: true, image: false, audio: false },
            { id: 'nousresearch/deephermes-3-llama-3-8b-preview:free', name: 'DeepHermes 3 8B', free: true, image: false, audio: false },
            // OpenAI
            { id: 'openai/gpt-3.5-turbo', name: 'GPT-3.5 Turbo', free: false, image: false, audio: false },
            { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', free: false, image: true, audio: false },
            { id: 'openai/gpt-4o', name: 'GPT-4o', free: false, image: true, audio: true },
            { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo', free: false, image: true, audio: false },
            { id: 'openai/o1-mini', name: 'O1 Mini', free: false, image: false, audio: false },
            { id: 'openai/o1-preview', name: 'O1 Preview', free: false, image: false, audio: false },
            // Anthropic
            { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet', free: false, image: true, audio: false },
            { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', free: false, image: true, audio: false },
            { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus', free: false, image: true, audio: false },
            // Google
            { id: 'google/gemini-pro-1.5', name: 'Gemini Pro 1.5', free: false, image: true, audio: true },
            { id: 'google/gemini-flash-1.5', name: 'Gemini Flash 1.5', free: false, image: true, audio: false },
            // Meta Llama
            { id: 'meta-llama/llama-3.3-70b-instruct', name: 'Llama 3.3 70B', free: false, image: false, audio: false },
            { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B', free: false, image: false, audio: false },
            { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B', free: false, image: false, audio: false },
            { id: 'meta-llama/llama-3.1-8b-instruct', name: 'Llama 3.1 8B', free: false, image: false, audio: false },
            // DeepSeek
            { id: 'deepseek/deepseek-chat', name: 'DeepSeek V3', free: false, image: false, audio: false },
            { id: 'deepseek/deepseek-r1', name: 'DeepSeek R1', free: false, image: false, audio: false },
            // Mistral
            { id: 'mistralai/mistral-large', name: 'Mistral Large', free: false, image: false, audio: false },
            { id: 'mistralai/mixtral-8x7b-instruct', name: 'Mixtral 8x7B', free: false, image: false, audio: false },
            { id: 'mistralai/codestral-latest', name: 'Codestral', free: false, image: false, audio: false },
            // Qwen
            { id: 'qwen/qwen-2.5-72b-instruct', name: 'Qwen 2.5 72B', free: false, image: false, audio: false },
            { id: 'qwen/qwen-2.5-coder-32b-instruct', name: 'Qwen 2.5 Coder 32B', free: false, image: false, audio: false },
            // Perplexity
            { id: 'perplexity/llama-3.1-sonar-huge-128k-online', name: 'Sonar Huge (Online)', free: false, image: false, audio: false },
            { id: 'perplexity/llama-3.1-sonar-large-128k-online', name: 'Sonar Large (Online)', free: false, image: false, audio: false },
            // xAI
            { id: 'x-ai/grok-2-1212', name: 'Grok 2', free: false, image: true, audio: false },
            { id: 'x-ai/grok-beta', name: 'Grok Beta', free: false, image: false, audio: false },
            // Cohere
            { id: 'cohere/command-r-plus', name: 'Command R+', free: false, image: false, audio: false },
            { id: 'cohere/command-r', name: 'Command R', free: false, image: false, audio: false },
        ];

        // ============ DOM Elements ============
        const sidebar = document.getElementById('sidebar');
        const chatList = document.getElementById('chatList');
        const emptyState = document.getElementById('emptyState');
        const newChatBtn = document.getElementById('newChatBtn');
        const closeSidebar = document.getElementById('closeSidebar');
        const menuBtn = document.getElementById('menuBtn');
        const landingView = document.getElementById('landingView');
        const chatView = document.getElementById('chatView');
        const messagesContainer = document.getElementById('messages');
        const questionInput = document.getElementById('questionInput');
        const voiceBtn = document.getElementById('voiceBtn');
        const sendBtn = document.getElementById('sendBtn');

        const settingsBtn = document.getElementById('settingsBtn');
        const settingsModal = document.getElementById('settingsModal');
        const closeSettingsModal = document.getElementById('closeSettingsModal');
        const apiKeyInput = document.getElementById('apiKeyInput');
        const saveKeyBtn = document.getElementById('saveKeyBtn');
        const clearKeyBtn = document.getElementById('clearKeyBtn');
        const apiWarning = document.getElementById('apiWarning');
        const openSettingsLink = document.getElementById('openSettingsLink');
        const toast = document.getElementById('toast');
        const modelBtn = document.getElementById('modelBtn');
        const modelModal = document.getElementById('modelModal');
        const closeModelModal = document.getElementById('closeModelModal');
        const modelSearch = document.getElementById('modelSearch');
        const modelList = document.getElementById('modelList');
        const currentModelName = document.getElementById('currentModelName');
        const attachBtn = document.getElementById('attachBtn');
        const fileInput = document.getElementById('fileInput');
        const filePreview = document.getElementById('filePreview');

        // ============ State ============
        let chats = [];
        let currentChatId = null;
        let currentModel = localStorage.getItem('vchat-model') || 'openai/gpt-3.5-turbo';
        let pendingImage = null; // base64 image data

        // ============ Utilities ============
        let toastTimer;
        const showToast = (msg, timeout = 2500) => {
            toast.textContent = msg;
            toast.classList.add('show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(() => toast.classList.remove('show'), timeout);
        };

        const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

        // Auto-resize textarea
        questionInput.addEventListener('input', () => {
            questionInput.style.height = 'auto';
            questionInput.style.height = Math.min(questionInput.scrollHeight, 120) + 'px';
            sendBtn.disabled = questionInput.value.trim().length === 0;
        });

        // ============ Model Selector ============
        const updateModelDisplay = () => {
            const model = MODELS.find(m => m.id === currentModel) || MODELS[0];
            currentModelName.textContent = model.name.split(' ').slice(0, 2).join(' ');
        };

        const renderModelList = (filter = '') => {
            const filtered = MODELS.filter(m =>
                m.name.toLowerCase().includes(filter.toLowerCase()) ||
                m.id.toLowerCase().includes(filter.toLowerCase())
            );

            modelList.innerHTML = filtered.map(m => `
            <div class="model-item ${m.id === currentModel ? 'selected' : ''}" data-id="${m.id}">
                <div class="model-info">
                    <div class="model-name">${m.name}</div>
                    <div class="model-meta">
                        ${m.free ? '<span class="model-tag free">Free</span>' : ''}
                        ${m.image ? '<span class="model-tag image">📷 Image</span>' : ''}
                        ${m.audio ? '<span class="model-tag audio">🎵 Audio</span>' : ''}
                    </div>
                </div>
            </div>
        `).join('');

            modelList.querySelectorAll('.model-item').forEach(item => {
                item.addEventListener('click', () => {
                    currentModel = item.dataset.id;
                    localStorage.setItem('vchat-model', currentModel);
                    updateModelDisplay();
                    modelModal.classList.remove('active');
                    showToast(`Model: ${MODELS.find(m => m.id === currentModel)?.name}`);
                });
            });
        };

        modelBtn.addEventListener('click', () => {
            modelSearch.value = '';
            renderModelList();
            modelModal.classList.add('active');
        });

        closeModelModal.addEventListener('click', () => modelModal.classList.remove('active'));
        modelModal.addEventListener('click', (e) => {
            if (e.target === modelModal) modelModal.classList.remove('active');
        });

        modelSearch.addEventListener('input', () => renderModelList(modelSearch.value));

        updateModelDisplay();

        // ============ File Upload ============
        const getCurrentModelInfo = () => MODELS.find(m => m.id === currentModel) || { image: false };
        let pendingFile = null; // { type: 'image'|'text', data: base64/text, name: string }

        // Industry-standard image compression: max 1024px, JPEG 0.8 quality, target ~500KB
        const compressImage = (file) => {
            return new Promise((resolve) => {
                const img = new Image();
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                img.onload = () => {
                    const MAX_SIZE = 1024;
                    let { width, height } = img;

                    // Scale down if larger than MAX_SIZE
                    if (width > MAX_SIZE || height > MAX_SIZE) {
                        if (width > height) {
                            height = Math.round((height * MAX_SIZE) / width);
                            width = MAX_SIZE;
                        } else {
                            width = Math.round((width * MAX_SIZE) / height);
                            height = MAX_SIZE;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // Progressive quality reduction to stay under 500KB
                    let quality = 0.8;
                    let dataUrl = canvas.toDataURL('image/jpeg', quality);
                    while (dataUrl.length > 700000 && quality > 0.3) {
                        quality -= 0.1;
                        dataUrl = canvas.toDataURL('image/jpeg', quality);
                    }

                    resolve(dataUrl);
                };

                img.src = URL.createObjectURL(file);
            });
        };

        // Supported text file extensions
        const TEXT_EXTENSIONS = ['.py', '.js', '.ts', '.jsx', '.tsx', '.json', '.md', '.txt', '.html', '.css', '.java', '.c', '.cpp', '.h', '.go', '.rs', '.rb', '.php', '.sql', '.yaml', '.yml', '.xml', '.sh', '.bat'];
        const isTextFile = (name) => TEXT_EXTENSIONS.some(ext => name.toLowerCase().endsWith(ext));

        const clearFilePreview = () => {
            pendingImage = null;
            pendingFile = null;
            filePreview.classList.remove('show');
            filePreview.innerHTML = '';
            attachBtn.classList.remove('has-file');
            fileInput.value = '';
        };

        const showFilePreview = (file, data, type, compressedSize = null) => {
            const sizeMB = ((compressedSize || file.size) / 1024).toFixed(1);
            const sizeLabel = compressedSize ? `${sizeMB} KB (compressed)` : `${sizeMB} KB`;

            if (type === 'image') {
                pendingImage = data;
                pendingFile = { type: 'image', data, name: file.name };
                filePreview.innerHTML = `
                    <img src="${data}" alt="Preview">
                    <div class="file-preview-info">
                        <div class="file-preview-name">${file.name}</div>
                        <div class="file-preview-size">${sizeLabel}</div>
                    </div>
                    <button class="file-preview-remove" id="removeFile">✕</button>
                `;
            } else {
                pendingImage = null;
                pendingFile = { type: 'text', data, name: file.name };
                const isPdf = file.name.toLowerCase().endsWith('.pdf');
                const icon = isPdf ? '📕' : (file.name.endsWith('.py') ? '🐍' : file.name.endsWith('.js') ? '📜' : '📄');
                filePreview.innerHTML = `
                    <div class="file-icon">${icon}</div>
                    <div class="file-preview-info">
                        <div class="file-preview-name">${file.name}</div>
                        <div class="file-preview-size">${sizeMB} KB</div>
                    </div>
                    <button class="file-preview-remove" id="removeFile">✕</button>
                `;
            }

            filePreview.classList.add('show');
            attachBtn.classList.add('has-file');
            document.getElementById('removeFile').addEventListener('click', clearFilePreview);
            sendBtn.disabled = false;
        };

        attachBtn.addEventListener('click', () => fileInput.click());

        fileInput.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (file.size > 20 * 1024 * 1024) {
                showToast('File too large (max 20MB)');
                return;
            }

            // Handle images
            if (file.type.startsWith('image/')) {
                const modelInfo = getCurrentModelInfo();
                if (!modelInfo.image) {
                    showToast(`${modelInfo.name || 'This model'} doesn't support images. Select a vision model.`);
                    fileInput.value = '';
                    return;
                }
                showToast('Compressing image...');
                const compressed = await compressImage(file);
                const compressedSize = Math.round((compressed.length * 3) / 4); // base64 to bytes
                showFilePreview(file, compressed, 'image', compressedSize);
                showToast(`Image compressed to ${(compressedSize / 1024).toFixed(0)} KB`);
                return;
            }

            // Handle text/code files
            if (isTextFile(file.name)) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    const text = ev.target.result;
                    if (text.length > 100000) {
                        showToast('File too long (max 100K chars). Truncating...');
                    }
                    showFilePreview(file, text.substring(0, 100000), 'text');
                };
                reader.readAsText(file);
                return;
            }

            // Handle PDF
            if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
                showToast('Extracting text from PDF...');
                try {
                    const arrayBuffer = await file.arrayBuffer();
                    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                    let fullText = '';

                    for (let i = 1; i <= pdf.numPages; i++) {
                        const page = await pdf.getPage(i);
                        const textContent = await page.getTextContent();
                        const pageText = textContent.items.map(item => item.str).join(' ');
                        fullText += `--- Page ${i} ---\n${pageText}\n\n`;
                    }

                    if (fullText.length > 100000) {
                        showToast('PDF too long. Truncating to 100K chars.');
                        fullText = fullText.substring(0, 100000);
                    }

                    showFilePreview(file, fullText, 'text');
                    showToast(`PDF text extracted (${pdf.numPages} pages)`);
                } catch (e) {
                    console.error('PDF Error:', e);
                    showToast('Failed to read PDF. Is it password protected?');
                }
                return;
            }

            showToast('Unsupported file type. Use images or code files.');
        });

        // ============ Encryption ============
        // ============ Encryption (Seamless) ============
        // Auto-initialize key if missing
        let encryptionKey = localStorage.getItem('vchat-enc-key');
        if (!encryptionKey) {
            encryptionKey = crypto.randomUUID ? crypto.randomUUID() : 'auto-key-' + Math.random().toString(36).substring(2);
            localStorage.setItem('vchat-enc-key', encryptionKey);
        }

        const ENCRYPTED_MARKER = 'VCHAT_ENC:';

        const encrypt = (data) => {
            try {
                const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
                return ENCRYPTED_MARKER + encrypted;
            } catch (e) {
                console.warn('Encryption failed:', e);
                return JSON.stringify(data);
            }
        };

        const decrypt = (data) => {
            if (!data) return [];
            if (!data.startsWith(ENCRYPTED_MARKER)) {
                try { return JSON.parse(data); } catch { return []; }
            }
            try {
                const encrypted = data.substring(ENCRYPTED_MARKER.length);
                const bytes = CryptoJS.AES.decrypt(encrypted, encryptionKey);
                const decrypted = bytes.toString(CryptoJS.enc.Utf8);
                return decrypted ? JSON.parse(decrypted) : [];
            } catch (e) {
                console.warn('Decryption failed - key mismatch?', e);
                // If decryption fails (e.g. data from another session), start fresh or handle gracefully
                return [];
            }
        };

        // ============ Chat Storage (Encrypted) ============
        const saveChats = () => {
            try {
                localStorage.setItem('vchat-chats', encrypt(chats));
            } catch (e) {
                console.warn('Could not save chats:', e);
            }
        };

        const loadChats = () => {
            try {
                const saved = localStorage.getItem('vchat-chats');
                chats = decrypt(saved);
            } catch (e) {
                console.warn('Could not load chats:', e);
                chats = [];
            }
        };

        // ============ Chat List Rendering ============
        const renderChatList = () => {
            const items = chatList.querySelectorAll('.chat-item');
            items.forEach(item => item.remove());

            if (chats.length === 0) {
                emptyState.style.display = 'block';
            } else {
                emptyState.style.display = 'none';
                chats.forEach(chat => {
                    const item = document.createElement('div');
                    item.className = 'chat-item' + (chat.id === currentChatId ? ' active' : '');
                    item.innerHTML = `
                    <span class="chat-item-title">${chat.title || 'New chat'}</span>
                    <button class="chat-item-delete" data-id="${chat.id}" title="Delete">🗑️</button>
                `;
                    item.addEventListener('click', (e) => {
                        if (!e.target.classList.contains('chat-item-delete')) loadChat(chat.id);
                    });
                    chatList.appendChild(item);
                });

                chatList.querySelectorAll('.chat-item-delete').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        deleteChat(btn.dataset.id);
                    });
                });
            }
        };

        // ============ Chat Management ============
        const createNewChat = () => {
            const chat = { id: generateId(), title: '', messages: [], createdAt: Date.now() };
            chats.unshift(chat);
            saveChats();
            currentChatId = chat.id;
            renderChatList();
            showLandingView();
            return chat;
        };

        const loadChat = (chatId) => {
            const chat = chats.find(c => c.id === chatId);
            if (!chat) return;

            currentChatId = chatId;
            renderChatList();

            if (chat.messages.length === 0) {
                showLandingView();
            } else {
                showChatView();
                messagesContainer.innerHTML = '';
                chat.messages.forEach(msg => addMessageToDOM(msg.content, msg.role, msg.role === 'assistant'));
            }

            if (window.innerWidth <= 768) sidebar.classList.remove('open');
        };

        const deleteChat = (chatId) => {
            chats = chats.filter(c => c.id !== chatId);
            saveChats();

            if (currentChatId === chatId) {
                if (chats.length > 0) loadChat(chats[0].id);
                else { currentChatId = null; showLandingView(); }
            }

            renderChatList();
            showToast('Chat deleted');
        };

        const getCurrentChat = () => chats.find(c => c.id === currentChatId);

        // ============ View Management ============
        const showLandingView = () => {
            landingView.classList.remove('hidden');
            chatView.classList.remove('active');
            messagesContainer.innerHTML = '';
        };

        const showChatView = () => {
            landingView.classList.add('hidden');
            chatView.classList.add('active');
        };

        // ============ API Key ============
        const getApiKey = () => localStorage.getItem('vchat-api-key') || '';
        const setApiKey = (key) => {
            if (key) localStorage.setItem('vchat-api-key', key);
            else localStorage.removeItem('vchat-api-key');
            updateApiWarning();
        };

        const updateApiWarning = () => {
            apiWarning.classList.toggle('show', !getApiKey());
        };

        // ============ Messages ============
        const addMessageToDOM = (content, role, showActions = false) => {
            const msg = document.createElement('div');
            msg.className = `message ${role}`;

            // Parse markdown for assistant messages (sanitized to prevent XSS)
            const displayContent = role === 'assistant'
                ? DOMPurify.sanitize(marked.parse(content))
                : content;

            let html = `<div class="message-content">${displayContent}</div>`;

            if (showActions && role === 'assistant') {
                html += `
                <div class="message-actions">
                    <button class="action-btn copy-btn" title="Copy">📋</button>
                    <button class="action-btn speak-btn" title="Speak">🔊</button>
                </div>
            `;
            }

            msg.innerHTML = html;
            messagesContainer.appendChild(msg);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;

            const copyBtn = msg.querySelector('.copy-btn');
            const speakBtn = msg.querySelector('.speak-btn');

            if (copyBtn) {
                copyBtn.addEventListener('click', () => {
                    navigator.clipboard.writeText(content).then(() => showToast('Copied!'));
                });
            }

            if (speakBtn) {
                speakBtn.addEventListener('click', () => {
                    if ('speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                        const utter = new SpeechSynthesisUtterance(content);
                        utter.lang = 'en-US';
                        window.speechSynthesis.speak(utter);
                    }
                });
            }

            return msg;
        };

        const showTypingIndicator = (modelId) => {
            const isReasoning = modelId && (
                modelId.toLowerCase().includes('r1') ||
                modelId.toLowerCase().includes('think') ||
                modelId.toLowerCase().includes('o1') ||
                modelId.toLowerCase().includes('reasoning')
            );
            const text = isReasoning ? 'Thinking...' : 'Responding...';

            const indicator = document.createElement('div');
            indicator.className = 'message assistant';
            indicator.id = 'typingIndicator';
            indicator.innerHTML = `
                <div class="thinking-indicator">
                    <div class="thinking-pulse"></div>
                    <span>${text}</span>
                </div>
            `;
            messagesContainer.appendChild(indicator);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };

        const removeTypingIndicator = () => {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) indicator.remove();
        };

        // ============ Send Message ============
        const sendMessage = async (text) => {
            const question = text.trim();
            if (!question) return;

            const apiKey = getApiKey();
            if (!apiKey) {
                showToast('Please add your API key first');
                settingsBtn.click();
                return;
            }

            if (!currentChatId) createNewChat();

            const chat = getCurrentChat();
            if (!chat) return;

            showChatView();
            chat.messages.push({ role: 'user', content: question });

            if (!chat.title) {
                chat.title = question.substring(0, 40) + (question.length > 40 ? '...' : '');
                renderChatList();
            }

            saveChats();

            // Capture file data before clearing
            const imageToSend = pendingImage;
            const fileToSend = pendingFile;

            const msgEl = addMessageToDOM(question, 'user');
            // Add image/file thumbnail if attached
            if (imageToSend && msgEl) {
                const img = document.createElement('img');
                img.src = imageToSend;
                img.className = 'chat-image-thumb';
                img.alt = 'Attached image';
                msgEl.querySelector('.message-content').prepend(img);
            } else if (fileToSend && fileToSend.type === 'text' && msgEl) {
                const badge = document.createElement('div');
                badge.className = 'chat-file-badge';
                badge.textContent = `📎 ${fileToSend.name}`;
                msgEl.querySelector('.message-content').prepend(badge);
            }

            questionInput.value = '';
            questionInput.style.height = 'auto';
            sendBtn.disabled = true;
            clearFilePreview();

            sendBtn.innerHTML = '<span class="spinner"></span>';
            showTypingIndicator(currentModel);

            try {
                const requestBody = { question, api_key: apiKey, model: currentModel };
                if (imageToSend) requestBody.image = imageToSend;
                if (fileToSend && fileToSend.type === 'text') {
                    requestBody.file_context = fileToSend.data;
                    requestBody.file_name = fileToSend.name;
                }

                const response = await fetch('/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestBody)
                });

                const data = await response.json();
                removeTypingIndicator();

                const answer = data?.answer || 'Sorry, I could not get a response.';
                chat.messages.push({ role: 'assistant', content: answer });
                saveChats();
                addMessageToDOM(answer, 'assistant', true);
            } catch (err) {
                removeTypingIndicator();
                const errorMsg = 'Sorry, something went wrong. Please try again.';
                chat.messages.push({ role: 'assistant', content: errorMsg });
                saveChats();
                addMessageToDOM(errorMsg, 'assistant');
                showToast('Request failed');
            } finally {
                sendBtn.innerHTML = '<svg class="send-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>';
            }
        };

        // ============ Event Listeners ============
        newChatBtn.addEventListener('click', createNewChat);

        // Unified sidebar toggle — single class for all viewports
        const toggleSidebar = () => sidebar.classList.toggle('sidebar-hidden');
        const openSidebar = () => sidebar.classList.remove('sidebar-hidden');
        const closeSidebarFn = () => sidebar.classList.add('sidebar-hidden');

        closeSidebar.addEventListener('click', closeSidebarFn);
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openSidebar();
        });

        // On mobile, start with sidebar hidden
        if (window.innerWidth <= 768) {
            sidebar.classList.add('sidebar-hidden');
        }

        // Close sidebar when clicking outside (works on ALL viewports)
        document.addEventListener('click', (e) => {
            if (!sidebar.classList.contains('sidebar-hidden') && !sidebar.contains(e.target)) {
                closeSidebarFn();
            }
        });

        // Settings
        settingsBtn.addEventListener('click', () => {
            apiKeyInput.value = getApiKey();
            settingsModal.classList.add('active');
        });
        openSettingsLink.addEventListener('click', () => settingsBtn.click());
        closeSettingsModal.addEventListener('click', () => settingsModal.classList.remove('active'));
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) settingsModal.classList.remove('active');
        });
        saveKeyBtn.addEventListener('click', () => {
            const key = apiKeyInput.value.trim();
            setApiKey(key);
            settingsModal.classList.remove('active');
            showToast(key ? 'API key saved!' : 'API key cleared');
        });
        clearKeyBtn.addEventListener('click', () => {
            apiKeyInput.value = '';
            setApiKey('');
            showToast('API key cleared');
        });

        // Encryption handlers
        const clearAllChatsBtn = document.getElementById('clearAllChatsBtn');

        if (clearAllChatsBtn) {
            clearAllChatsBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete ALL chats? This cannot be undone.')) {
                    chats = [];
                    currentChatId = null;
                    saveChats();
                    renderChatList();
                    showLandingView();
                    showToast('All chats deleted.');
                }
            });
        }

        // Initialize (Auto-load)
        loadChats();
        renderChatList();
        if (chats.length > 0) loadChat(chats[0].id);
        updateApiWarning(); // Ensure API warning state is correct

        questionInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(questionInput.value);
            }
        });

        sendBtn.addEventListener('click', () => sendMessage(questionInput.value));

        // ============ Voice Input ============
        let recognition;
        if ('webkitSpeechRecognition' in window) recognition = new webkitSpeechRecognition();
        else if ('SpeechRecognition' in window) recognition = new SpeechRecognition();

        if (recognition) {
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;

            const startVoice = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    stream.getTracks().forEach(t => t.stop());
                    voiceBtn.classList.add('listening');
                    recognition.start();
                } catch (err) {
                    let msg = 'Microphone error';
                    if (err.name === 'NotAllowedError') msg = 'Microphone blocked';
                    else if (err.name === 'NotFoundError') msg = 'No microphone found';
                    showToast(msg);
                }
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                sendMessage(transcript);
            };

            recognition.onend = () => voiceBtn.classList.remove('listening');
            recognition.onerror = (event) => {
                voiceBtn.classList.remove('listening');
                if (event.error !== 'no-speech') showToast('Voice input error');
            };

            voiceBtn.addEventListener('click', () => {
                if (voiceBtn.classList.contains('listening')) recognition.stop();
                else startVoice();
            });


        } else {
            voiceBtn.disabled = true;

        }

        // Keyboard shortcuts
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (settingsModal.classList.contains('active')) settingsModal.classList.remove('active');
                if (modelModal.classList.contains('active')) modelModal.classList.remove('active');
            }
        });

        // ============ Initialize ============
        // Initialization handled by checkLockState() above


})();
