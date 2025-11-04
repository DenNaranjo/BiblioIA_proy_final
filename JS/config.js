// ========================================
// ARCHIVO DE CONFIGURACIÓN
// ========================================

/**
 * Configuración global del chatbot RAG
 * Este archivo contiene todas las constantes y configuraciones
 */

// URL base de la API de Gemini
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent';

// Configuración de generación para Gemini
const GENERATION_CONFIG = {
    temperature: 0.1,        // Baja temperatura para respuestas más precisas y menos creativas
    maxOutputTokens: 1000,   // Máximo de tokens en la respuesta
    topP: 0.8,               // Nucleus sampling
    topK: 40                 // Top-k sampling
};

// Prompt del sistema que define el comportamiento del chatbot
const SYSTEM_PROMPT_TEMPLATE = `Eres un asistente experto que SOLO puede responder basándose en la base de conocimiento proporcionada.

REGLAS ESTRICTAS:
1. SOLO usa información del CONTEXTO proporcionado
2. Si la información no está en el contexto, di: "No tengo esa información en mi base de conocimiento"
3. NO uses tu conocimiento general bajo ninguna circunstancia
4. NO inventes información
5. Cita la fuente del contexto cuando respondas
6. Si encuentras información parcial, indícalo claramente
7. Responde de manera clara, concisa y estructurada

{CONTEXT}

PREGUNTA DEL USUARIO: {QUERY}

Responde únicamente con la información del contexto anterior:`;

// Mensajes de la interfaz
const MESSAGES = {
    NO_API_KEY: 'Por favor, ingresa tu API Key primero',
    NO_KNOWLEDGE: 'Por favor, agrega conocimiento a la base de datos primero',
    API_KEY_SAVED: 'API Key guardada. El chatbot está listo en modo RAG.',
    KNOWLEDGE_ADDED: 'Conocimiento agregado exitosamente',
    KNOWLEDGE_DELETED: '¿Estás seguro de eliminar este conocimiento?',
    FILL_ALL_FIELDS: 'Por favor completa todos los campos',
    NO_RESULTS: 'NO SE ENCONTRÓ INFORMACIÓN RELEVANTE EN LA BASE DE CONOCIMIENTO.'
};

// Configuración de búsqueda
const SEARCH_CONFIG = {
    minWordLength: 3,        // Longitud mínima de palabras para búsqueda
    maxResults: 5,           // Máximo de resultados a devolver
    snippetLength: 150       // Longitud del snippet en el panel
};

// Exportar configuraciones (para uso en otros archivos)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GEMINI_API_URL,
        GENERATION_CONFIG,
        SYSTEM_PROMPT_TEMPLATE,
        MESSAGES,
        SEARCH_CONFIG
    };
}