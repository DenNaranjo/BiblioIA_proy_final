// ========================================
// LÓGICA DEL CHAT Y COMUNICACIÓN CON GEMINI
// ========================================

/**
 * Este archivo maneja:
 * - Envío de mensajes
 * - Comunicación con la API de Gemini
 * - Construcción de prompts con contexto RAG
 * - Renderizado de mensajes en la interfaz
 */

// Variable global para almacenar la API Key
let apiKey = '';

// ========================================
// GUARDAR API KEY
// ========================================

/**
 * Guarda la API Key de Gemini y habilita el chat
 */
function saveApiKey() {
    const input = document.getElementById('apiKeyInput');
    apiKey = input.value.trim();
    
    // Validar que se ingresó una API Key
    if (!apiKey) {
        alert(MESSAGES.FILL_ALL_FIELDS);
        return;
    }
    
    // Habilitar los controles del chat
    document.getElementById('userInput').disabled = false;
    document.getElementById('sendBtn').disabled = false;
    
    // Actualizar el contenedor del chat con mensaje de bienvenida
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = `
        <div class="warning-box">
            ⚠️ <strong>Modo RAG Activo:</strong> Este chatbot SOLO respondera preguntas basandose en la base de conocimiento. 
            No usará su conocimiento general. Si la informacion no está en la base de datos, se te mostrara una advertencia.
        </div>
        <div class="info-message">
            ✅ API Key guardada. Base de conocimiento: ${knowledgeBase.length} documentos. ¡Comienza a preguntar!
        </div>
    `;
    
    alert(MESSAGES.API_KEY_SAVED);
    
    // Hacer foco en el input de mensajes
    document.getElementById('userInput').focus();
}

// ========================================
// ENVIAR MENSAJE
// ========================================

/**
 * Función principal que maneja el envío de mensajes
 * Implementa el flujo completo del sistema RAG
 */
async function sendMessage() {
    const input = document.getElementById('userInput');
    const message = input.value.trim();
    
    // Validaciones básicas
    if (!message) return;
    
    if (!apiKey) {
        alert(MESSAGES.NO_API_KEY);
        return;
    }
    
    if (knowledgeBase.length === 0) {
        alert(MESSAGES.NO_KNOWLEDGE);
        return;
    }

    // Limpiar el input
    input.value = '';
    
    // Mostrar mensaje del usuario
    addMessage(message, 'user');
    
    // Obtener referencia al botón de enviar
    const sendBtn = document.getElementById('sendBtn');
    
    // Deshabilitar el botón y mostrar estado de carga
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<span class="loading">Buscando</span>';

    try {
        // =============================================
        // PASO 1: BUSQUEDA EN LA BASE DE CONOCIMIENTO
        // =============================================
        const relevantDocs = searchKnowledge(message);
        
        // =============================================
        // PASO 2: CONSTRUIR EL CONTEXTO
        // =============================================
        let context = '';
        
        if (relevantDocs.length > 0) {
            context = 'CONTEXTO DE LA BASE DE CONOCIMIENTO:\n\n';
            
            // Agregar cada documento relevante al contexto
            relevantDocs.forEach(doc => {
                context += `--- ${doc.title} ---\n${doc.content}\n\n`;
            });
        } else {
            // No se encontro informacion relevante
            context = MESSAGES.NO_RESULTS + '\n';
        }
        
        // =============================================
        // PASO 3: CREAR EL PROMPT COMPLETO
        // =============================================
        const fullPrompt = SYSTEM_PROMPT_TEMPLATE
            .replace('{CONTEXT}', context)
            .replace('{QUERY}', message);
        
        // =============================================
        // PASO 4: LLAMAR A LA API DE GEMINI
        // =============================================
        sendBtn.innerHTML = '<span class="loading">Generando</span>';
        
        const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: fullPrompt
                    }]
                }],
                generationConfig: GENERATION_CONFIG
            })
        });

        // Procesar la respuesta
        const data = await response.json();
        
        // Verificar si hubo errores
        if (data.error) {
            throw new Error(data.error.message);
        }

        // =============================================
        // PASO 5: EXTRAER Y MOSTRAR LA RESPUESTA
        // =============================================
        const botResponse = data.candidates[0].content.parts[0].text;
        
        // Crear lista de fuentes consultadas
        const sourcesUsed = relevantDocs.length > 0 
            ? relevantDocs.map(d => d.title).join(', ')
            : 'Ninguna fuente encontrada';
        
        // Mostrar la respuesta del bot
        addMessage(botResponse, 'bot', sourcesUsed);

    } catch (error) {
        // Manejo de errores
        console.error('Error:', error);
        
        // Mostrar mensaje de error en la interfaz
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = ' Error: ' + error.message;
        document.getElementById('chatContainer').appendChild(errorMsg);
        
        // Hacer scroll al error
        const chatContainer = document.getElementById('chatContainer');
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
    } finally {
        // Siempre restaurar el botón a su estado normal
        sendBtn.disabled = false;
        sendBtn.textContent = 'Enviar';
    }
}

// ========================================
// AGREGAR MENSAJE A LA INTERFAZ
// ========================================

/**
 * Crea y muestra un mensaje en el chat
 * @param {string} text - Contenido del mensaje
 * @param {string} sender - 'user' o 'bot'
 * @param {string|null} sources - Fuentes consultadas (solo para bot)
 */
function addMessage(text, sender, sources = null) {
    const chatContainer = document.getElementById('chatContainer');
    
    // Limpiar mensajes informativos si existen
    const infoMsg = chatContainer.querySelector('.info-message');
    if (infoMsg) infoMsg.remove();
    
    const warningBox = chatContainer.querySelector('.warning-box');
    if (warningBox) warningBox.remove();

    // Crear contenedor del mensaje
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    // Crear contenido del mensaje
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // Formatear el texto (convertir saltos de línea a <br>)
    const formattedText = text.replace(/\n/g, '<br>');
    contentDiv.innerHTML = formattedText;
    
    // Si es un mensaje del bot, agregar indicador de fuentes
    if (sender === 'bot' && sources) {
        const contextDiv = document.createElement('div');
        contextDiv.className = 'context-used';
        contextDiv.innerHTML = `<strong>📚 Fuentes consultadas:</strong> ${escapeHtml(sources)}`;
        contentDiv.appendChild(contextDiv);
    }
    
    // Ensamblar el mensaje
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    // Hacer scroll automático al último mensaje
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// ========================================
// UTILIDADES DE FORMATO
// ========================================

/**
 * Formatea texto con markdown básico
 * @param {string} text - Texto a formatear
 * @returns {string} Texto con HTML
 */
function formatMarkdown(text) {
    // Convertir **texto** a <strong>texto</strong>
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convertir *texto* a <em>texto</em>
    text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convertir saltos de línea
    text = text.replace(/\n/g, '<br>');
    
    return text;
}

/**
 * Limpia el chat (util para agregar boton de limpiar)
 */
function clearChat() {
    const chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = `
        <div class="info-message">
            Chat limpiado. Escribe un mensaje para comenzar.
        </div>
    `;
}