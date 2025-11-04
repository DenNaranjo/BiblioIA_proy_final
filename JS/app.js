// ========================================
// INICIALIZACIÓN Y EVENT LISTENERS
// ========================================

/**
 * Este archivo maneja la inicialización de la aplicación
 * y la configuración de event listeners
 */

// ========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ========================================

/**
 * Se ejecuta cuando el DOM está completamente cargado
 */
window.addEventListener('DOMContentLoaded', function() {
    console.log(' Chatbot RAG iniciado');
    
    // Inicializar la base de conocimiento con datos de ejemplo
    initializeDefaultKnowledge();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Mostrar información de bienvenida
    console.log(' Base de conocimiento cargada:', knowledgeBase.length, 'documentos');
});

// ========================================
// CONFIGURAR EVENT LISTENERS
// ========================================

/**
 * Configura todos los event listeners de la aplicación
 */
function setupEventListeners() {
    
    // =============================================
    // LISTENER: Enviar mensaje con tecla Enter
    // =============================================
    const userInput = document.getElementById('userInput');
    
    userInput.addEventListener('keypress', function(e) {
        // Si presiona Enter (y no Shift+Enter)
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevenir salto de línea
            sendMessage();
        }
    });
    
    // =============================================
    // LISTENER: Cerrar modal al hacer clic fuera
    // =============================================
    const modal = document.getElementById('knowledgeModal');
    
    modal.addEventListener('click', function(e) {
        // Si hace clic en el fondo oscuro (no en el contenido)
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // =============================================
    // LISTENER: Cerrar modal con tecla ESC
    // =============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('knowledgeModal');
            if (modal.style.display === 'flex') {
                closeModal();
            }
        }
    });
    
    // =============================================
    // LISTENER: Auto-resize del textarea
    // =============================================
    const knowledgeText = document.getElementById('knowledgeText');
    
    knowledgeText.addEventListener('input', function() {
        // Ajustar altura automáticamente según contenido
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
    
    // =============================================
    // LISTENER: Guardar conocimiento con Ctrl+Enter
    // =============================================
    knowledgeText.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            saveKnowledge();
        }
    });
    
    console.log(' Event listeners configurados');
}

// ========================================
// FUNCIONES DE UTILIDAD GLOBAL
// ========================================

/**
 * Muestra una notificación toast (opcional - para mejoras futuras)
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo: 'success', 'error', 'info'
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Agregar al body
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Exporta la conversación actual como archivo de texto
 */
function exportConversation() {
    const chatContainer = document.getElementById('chatContainer');
    const messages = chatContainer.querySelectorAll('.message');
    
    let conversationText = 'CONVERSACIÓN - CHATBOT RAG\n';
    conversationText += '=' .repeat(50) + '\n\n';
    
    messages.forEach(msg => {
        const sender = msg.classList.contains('user') ? 'USUARIO' : 'BOT';
        const text = msg.querySelector('.message-content').textContent;
        conversationText += `${sender}:\n${text}\n\n`;
    });
    
    // Crear blob y descargar
    const blob = new Blob([conversationText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversacion_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Exporta la base de conocimiento como JSON
 */
function exportKnowledge() {
    const dataStr = JSON.stringify(knowledgeBase, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `base_conocimiento_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Importa base de conocimiento desde archivo JSON
 */
function importKnowledge() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const imported = JSON.parse(event.target.result);
                
                if (Array.isArray(imported)) {
                    // Agregar a la base de conocimiento actual
                    knowledgeBase.push(...imported);
                    renderKnowledgeBase();
                    alert(`Se importaron ${imported.length} documentos`);
                } else {
                    throw new Error('Formato inválido');
                }
            } catch (error) {
                alert('ERROR al importar: ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// ========================================
// INFORMACIÓN DE DEBUG (DESARROLLO)
// ========================================

/**
 * Muestra información útil para debugging en la consola
 */
function showDebugInfo() {
    console.group(' Debug Info');
    console.log('API Key configurada:', apiKey ? 'Sí' : 'No');
    console.log('Documentos en KB:', knowledgeBase.length);
    console.log('Chat habilitado:', !document.getElementById('sendBtn').disabled);
    console.log('Configuración Gemini:', GENERATION_CONFIG);
    console.groupEnd();
}

// Exponer función de debug en consola para desarrollo
window.debugChatbot = showDebugInfo;

// ========================================
// MANEJO DE ERRORES GLOBAL
// ========================================

/**
 * Captura errores no manejados
 */
window.addEventListener('ERROR', function(e) {
    console.error(' Error no manejado:', e.error);
    
    // Mostrar error en la interfaz si el chat está visible
    if (!document.getElementById('sendBtn').disabled) {
        const chatContainer = document.getElementById('chatContainer');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = ' Ocurrió un error inesperado. Revisa la consola para más detalles.';
        chatContainer.appendChild(errorDiv);
    }
});

// ========================================
// INFORMACIÓN DE VERSIÓN
// ========================================

console.log(`
╔═══════════════════════════════════════╗
║   CHATBOT RAG - EXPERTO DE DOMINIO    ║
║                                       ║
║   Versión: 1.0.0                      ║
║   Tecnología: Gemini API + RAG        ║
║   Año: 2025                           ║
╚═══════════════════════════════════════╝
`);

console.log('NOTA: Escribe debugChatbot() en la consola para ver información de debug');