// ========================================
// GESTIÓN DE BASE DE CONOCIMIENTO
// ========================================

/**
 * Este archivo maneja toda la lógica relacionada con la base de conocimiento:
 * - Inicialización con datos de ejemplo
 * - Agregar nuevos documentos
 * - Eliminar documentos
 * - Buscar en la base de conocimiento (RAG)
 * - Renderizar en la interfaz
 */

// Array global que contiene toda la base de conocimiento
let knowledgeBase = [];

// ========================================
// INICIALIZACIÓN CON DATOS DE EJEMPLO
// ========================================

/**
 * Inicializa la base de conocimiento con datos de ejemplo
 * Puedes modificar estos datos según tu dominio específico
 */
function initializeDefaultKnowledge() {
    knowledgeBase = [
        {
            title: "Libro: Introducción a la Programación",
            content: `
                Título: Introducción a la Programación con Python
                Autor: Dr. Juan Pérez
                ISBN: 978-3-16-148410-0
                Editorial: TechBooks
                Año: 2023
                Categoría: Programación
                Disponibilidad: 5 copias disponibles
                Ubicación: Estante A-15, Sección Tecnología
                Descripción: Libro ideal para principiantes que desean aprender programación desde cero usando Python.
                Temas: Variables, Funciones, Estructuras de datos, POO
                Nivel: Principiante
                Préstamo: 15 días
            `
        },
        {
            title: "Libro: Bases de Datos Avanzadas",
            content: `
                Título: Diseño y Gestión de Bases de Datos
                Autor: Dra. María González
                ISBN: 978-1-23-456789-0
                Editorial: DataPress
                Año: 2024
                Categoría: Bases de Datos
                Disponibilidad: 3 copias disponibles
                Ubicación: Estante B-22, Sección Tecnología
                Descripción: Guía completa sobre diseño de bases de datos relacionales y NoSQL.
                Temas: SQL, MongoDB, Normalización, Índices, Optimización
                Nivel: Intermedio-Avanzado
                Préstamo: 15 días
            `
        },
        {
            title: "Libro: Cien Años de Soledad",
            content: `
                Título: Cien Años de Soledad
                Autor: Gabriel García Márquez
                ISBN: 978-0-307-35044-0
                Editorial: Sudamericana
                Año: 1967
                Categoría: Ficción, Realismo Mágico
                Disponibilidad: 2 copias disponibles
                Ubicación: Estante F-04, Sección Ficción Clásica
                Descripción: La historia multigeneracional de la familia Buendía en el pueblo ficticio de Macondo.
                Temas: Soledad, Familia, Tiempo cíclico, Realismo mágico
                Nivel: Avanzado (Lectura)
                Préstamo: 21 días
             `
        },
        {
            title: "Libro: Breve Historia del Tiempo",
            content: `
                Título: Breve Historia del Tiempo: Del Big Bang a los Agujeros Negros
                Autor: Stephen Hawking
                ISBN: 978-8-49-892039-3
                Editorial: Crítica
                Año: 1988
                Categoría: Divulgación Científica, Física
                Disponibilidad: 1 copia disponible (Reservado)
                Ubicación: Estante C-11, Sección Ciencia
                Descripción: Una exploración accesible de la cosmología moderna, el universo y la naturaleza del tiempo.
                Temas: Cosmología, Big Bang, Agujeros negros, Física cuántica
                Nivel: Intermedio
                Préstamo: 15 días
            `
        },
        {
            title: "Libro: Sapiens",
            content: `
                Título: Sapiens: De animales a dioses
                Autor: Yuval Noah Harari
                ISBN: 978-0-06-231609-7
                Editorial: Debate
                Año: 2011
                Categoría: Historia, Antropología
                Disponibilidad: 8 copias disponibles
                Ubicación: Estante H-02, Sección Historia Mundial
                Descripción: Un recorrido por la historia de la humanidad, desde la Edad de Piedra hasta la revolución tecnológica.
                Temas: Evolución humana, Historia cognitiva, Agricultura, Capitalismo
                Nivel: Intermedio / General
                Préstamo: 21 días
            `
        },
        {
            title: "Libro: El Arte de la Cocina Francesa",
            content: `
                Título: El Arte de la Cocina Francesa (Vol. 1)
                Autor: Julia Child, Simone Beck, Louisette Bertholle
                ISBN: 978-0-307-95819-1
                Editorial: Knopf
                Año: 1961
                Categoría: Gastronomía, Recetario
                Disponibilidad: 3 copias disponibles
                : Estante G-05, Sección Cocina
                Descripción: La guía definitiva de las técnicas y recetas clásicas de la cocina francesa.
                Temas: Técnicas culinarias, Salsas, Repostería, Cocina francesa
                Nivel: Todos (Principiante a Avanzado)
                Préstamo: 10 días (Material de alta demanda)
            `
        },
        {
            title: "Cómic: Watchmen",
            content: `
                Título: Watchmen
                Autor: Alan Moore (Guión), Dave Gibbons (Arte)
                ISBN: 978-1-40-124819-2
                Editorial: DC Comics (Vertigo)
                Año: 1987 (Recopilación)
                : Novela Gráfica, Superhéroes
                Disponibilidad: 4 copias disponibles
                Ubicación: Estante N-01, Sección Novela Gráfica
                Descripción: Una deconstrucción del género de superhéroes ambientada en una historia alternativa durante la Guerra Fría.
                Temas: Superhéroes, Guerra Fría, Moralidad, Distopía
                Nivel: Adulto Joven / Adulto
                Préstamo: 10 días
            `
        },
        {
        title: "Políticas de Préstamo",
        content: `
                REGLAMENTO DE PRÉSTAMOS - BIBLIOTECA UNIVERSITARIA
                
                1. TIPOS DE PRÉSTAMO:
                - Préstamo a domicilio: 15 días renovables
                - Préstamo en sala: Mismo día
                - Préstamo especial: 7 días (libros de alta demanda)
                
                2. RENOVACIONES:
                - Hasta 2 renovaciones por libro
                - Renovar 2 días antes del vencimiento
                - No renovable si hay reservas pendientes
                
                3. MULTAS:
                - $20 pesos por día de retraso
                - Máximo $300 pesos por libro
                - Suspensión temporal por retrasos mayores a 30 días
                
                4. HORARIOS:
                - Lunes a Viernes: 8:00 AM - 8:00 PM
                - Sábados: 9:00 AM - 3:00 PM
                - Domingos: Cerrado
                
                5. CONTACTO:
                - Email: biblioteca@universidad.edu
                - Teléfono: (33) 1234-5678
                - Ubicación: Edificio Central, Planta Baja
            `
        },
        {
            title: "Servicios Disponibles",
            content: `
                SERVICIOS DE LA BIBLIOTECA
                
                1. PRÉSTAMO DE LIBROS
                - Más de 50,000 títulos disponibles
                - Sistema automatizado de búsqueda
                
                2. SALAS DE ESTUDIO
                - 5 salas grupales (capacidad 6-8 personas)
                - 20 cubículos individuales
                - Reservación con 48 horas de anticipación
                
                3. COMPUTADORAS
                - 40 equipos con internet de alta velocidad
                - Software especializado: Office, Adobe Suite, IDEs
                - Impresión: $1 peso por hoja B/N, $3 pesos color
                
                4. BASES DE DATOS DIGITALES
                - IEEE Xplore
                - ACM Digital Library
                - JSTOR
                - Scopus
                
                5. ASESORÍAS
                - Búsqueda bibliográfica: Lunes y Miércoles 10-12 AM
                - Normas APA/IEEE: Martes y Jueves 3-5 PM
                - Agendar: biblioteca@universidad.edu
            `
        }
    ];
    
    // Renderizar la base de conocimiento en la interfaz
    renderKnowledgeBase();
}

// ========================================
// RENDERIZAR BASE DE CONOCIMIENTO
// ========================================

/**
 * Muestra todos los documentos de la base de conocimiento en el panel lateral
 */
function renderKnowledgeBase() {
    const container = document.getElementById('knowledgeContent');
    
    // Limpiar contenido previo
    container.innerHTML = '';
    
    // Si no hay documentos, mostrar mensaje
    if (knowledgeBase.length === 0) {
        container.innerHTML = '<div class="info-message">No hay conocimiento agregado. Haz clic en el botón para agregar.</div>';
        return;
    }
    
    // Crear una sección por cada documento
    knowledgeBase.forEach((item, index) => {
        const section = document.createElement('div');
        section.className = 'knowledge-section';
        
        // Crear snippet (extracto) del contenido
        const snippet = item.content.substring(0, SEARCH_CONFIG.snippetLength) + '...';
        
        section.innerHTML = `
            <h3>📄 ${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(snippet)}</p>
            <button onclick="deleteKnowledge(${index})">
                🗑️ Eliminar
            </button>
        `;
        
        container.appendChild(section);
    });
}

// ========================================
// AGREGAR CONOCIMIENTO
// ========================================

/**
 * Guarda un nuevo documento en la base de conocimiento
 */
function saveKnowledge() {
    // Obtener los valores de los campos
    const titleInput = document.getElementById('knowledgeTitle');
    const contentInput = document.getElementById('knowledgeText');
    
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    // Validar que ambos campos estén llenos
    if (!title || !content) {
        alert('⚠️ Por favor completa todos los campos obligatorios (*)');
        
        // Marcar visualmente los campos vacíos
        if (!title) {
            titleInput.style.borderColor = '#dc3545';
            titleInput.focus();
        }
        if (!content) {
            contentInput.style.borderColor = '#dc3545';
        }
        
        return;
    }
    
    // Validar longitud mínima del contenido
    if (content.length < 50) {
        alert('⚠️ El contenido debe tener al menos 50 caracteres para ser útil');
        contentInput.style.borderColor = '#dc3545';
        contentInput.focus();
        return;
    }
    
    // Crear el nuevo documento
    const newDocument = {
        title: title,
        content: content,
        dateAdded: new Date().toISOString() // Guardar fecha de creación
    };
    
    // Agregar al array de la base de conocimiento
    knowledgeBase.push(newDocument);
    
    console.log('✅ Documento agregado:', newDocument);
    
    // Actualizar la interfaz
    renderKnowledgeBase();
    
    // Cerrar el modal
    closeModal();
    
    // Resetear estilos de los inputs
    titleInput.style.borderColor = '';
    contentInput.style.borderColor = '';
    
    // Mostrar confirmación
    alert(`✅ ${MESSAGES.KNOWLEDGE_ADDED}\n\nTotal de documentos: ${knowledgeBase.length}`);
}

// ========================================
// ELIMINAR CONOCIMIENTO
// ========================================

/**
 * Elimina un documento de la base de conocimiento
 * @param {number} index - Índice del documento a eliminar
 */
function deleteKnowledge(index) {
    // Confirmar antes de eliminar
    if (confirm(MESSAGES.KNOWLEDGE_DELETED)) {
        // Eliminar del array
        knowledgeBase.splice(index, 1);
        
        // Actualizar la interfaz
        renderKnowledgeBase();
    }
}

// ========================================
// BÚSQUEDA EN LA BASE DE CONOCIMIENTO (RAG)
// ========================================

/**
 * Busca documentos relevantes para una consulta
 * Esta es la parte central del sistema RAG (Retrieval-Augmented Generation)
 * 
 * @param {string} query - La pregunta del usuario
 * @returns {Array} Array de documentos relevantes
 */
function searchKnowledge(query) {
    // Convertir la consulta a minúsculas para búsqueda case-insensitive
    const queryLower = query.toLowerCase();
    
    // Array para almacenar resultados con su puntuación de relevancia
    const results = [];
    
    // Dividir la consulta en palabras individuales
    const queryWords = queryLower.split(' ').filter(word => 
        word.length >= SEARCH_CONFIG.minWordLength
    );
    
    // Buscar en cada documento de la base de conocimiento
    knowledgeBase.forEach(item => {
        const contentLower = item.content.toLowerCase();
        const titleLower = item.title.toLowerCase();
        
        // Calcular puntuación de relevancia
        let score = 0;
        
        // Puntos por coincidencia exacta en título
        if (titleLower.includes(queryLower)) {
            score += 10;
        }
        
        // Puntos por coincidencia exacta en contenido
        if (contentLower.includes(queryLower)) {
            score += 5;
        }
        
        // Puntos por palabras individuales
        queryWords.forEach(word => {
            // +3 puntos si la palabra está en el título
            if (titleLower.includes(word)) {
                score += 3;
            }
            // +1 punto si la palabra está en el contenido
            if (contentLower.includes(word)) {
                score += 1;
            }
        });
        
        // Si tiene alguna puntuación, agregar a resultados
        if (score > 0) {
            results.push({
                ...item,
                score: score
            });
        }
    });
    
    // Ordenar por relevancia (mayor puntuación primero)
    results.sort((a, b) => b.score - a.score);
    
    // Retornar solo los mejores resultados
    return results.slice(0, SEARCH_CONFIG.maxResults);
}

// ========================================
// GESTIÓN DEL MODAL
// ========================================

/**
 * Abre el modal para agregar nuevo conocimiento
 */
function openModal() {
    const modal = document.getElementById('knowledgeModal');
    const titleInput = document.getElementById('knowledgeTitle');
    const contentInput = document.getElementById('knowledgeText');
    
    // Limpiar campos
    titleInput.value = '';
    contentInput.value = '';
    
    // Resetear estilos de validación
    titleInput.style.borderColor = '';
    contentInput.style.borderColor = '';
    
    // Mostrar modal
    modal.style.display = 'flex';
    
    // Hacer foco en el campo de título después de la animación
    setTimeout(() => {
        titleInput.focus();
    }, 100);
}

/**
 * Cierra el modal
 */
function closeModal() {
    document.getElementById('knowledgeModal').style.display = 'none';
}

// ========================================
// UTILIDADES
// ========================================

/**
 * Escapa caracteres HTML para prevenir XSS
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}