# 🤖 Chatbot RAG - Experto de Dominio

Sistema de chatbot con Retrieval-Augmented Generation (RAG) que responde EXCLUSIVAMENTE basándose en una base de conocimiento personalizada.

---

## 📋 Índice

* [Descripción](#-descripción)
* [Estructura del Proyecto](#-estructura-del-proyecto)
* [Características](#-características)
* [Tecnologías](#-tecnologías)
* [Instalación](#-instalación)
* [Configuración](#-configuración)
* [Uso](#-uso)
* [Arquitectura RAG](#-arquitectura-rag)
* [Personalización](#-personalización)
* [API Reference](#-api-reference)
* [Troubleshooting](#-troubleshooting)

---

## 🎯 Descripción

Este proyecto implementa un chatbot inteligente con arquitectura RAG (Retrieval-Augmented Generation) que:

* ✅ Responde **SOLO** con información de la base de conocimiento
* ✅ No usa conocimiento general del modelo
* ✅ Cita fuentes consultadas
* ✅ Admite si no tiene la información

Es ideal para:

* 📚 Bibliotecas digitales
* 🏢 Sistemas de empresa
* 🛒 Catálogos de productos
* 📖 Documentación técnica
* 🎓 Sistemas educativos

---

## 📁 Estructura del Proyecto

```text
BIBLIOIA/
│
├── index.html          # Estructura HTML principal
├── styles.css          # Estilos y diseño responsive
│
├── config.js           # Configuración global
├── knowledge.js        # Gestión de base de conocimiento
├── chat.js             # Lógica de chat y API
├── app.js              # Inicialización y eventos
│
└── README.md           # Este archivo
```

---

### 📄 Descripción de Archivos
```bash
index.html
```

* Estructura HTML del chatbot
* Layout de dos columnas (panel de conocimiento + chat)
* Modal para agregar conocimiento

```bash
styles.css
```

* Todo el diseño visual
* Animaciones y transiciones
* Diseño responsive
* Temas de colores

```bash
config.js
```

* Constantes de configuración
* URL de API de Gemini
* Parámetros de generación
* Mensajes del sistema
* Configuración de búsqueda

```bash
knowledge.js
```

* Inicialización de base de conocimiento
* CRUD de documentos
* Algoritmo de búsqueda RAG
* Renderizado del panel


```bash
chat.js
```

* Envío de mensajes
* Comunicación con Gemini API
* Construcción de prompts RAG
* Renderizado de mensajes


```bash
app.js
```

* Event listeners
* Inicialización de la app
* Utilidades globales
* Funciones de exportación

---

## ✨ Características
### Sistema RAG
* 🔍 Búsqueda semántica en base de conocimiento
* 📊 Ranking por relevancia de documentos
* 🎯 Contexto específico en cada respuesta
* 📚 Cita de fuentes consultadas

### Gestión de Conocimiento
* ➕ Agregar documentos dinámicamente
* 🗑️ Eliminar documentos
* 👁️ Visualizar base de conocimiento
* 📤 Exportar/Importar (próximamente)

### Interfaz
* 🎨 Diseño moderno con gradientes
* 📱 Responsive para móviles
* ⚡ Animaciones suaves
* 💬 Burbujas de chat diferenciadas
* 🔔 Indicadores de estado
---

## 🛠 Tecnologías

| Tipo | Tecnologías |
|------|--------------|
| **Frontend** | HTML5, CSS3 (Flexbox, Animaciones), JavaScript (ES6+) |
| **IA** | Google Gemini API (modelo: `gemini-2.0-flash-exp`) |
| **Arquitectura** | Retrieval-Augmented Generation (RAG), modular y escalable |

---

## 🚀 Instalación

### 🧩 Requisitos
- Navegador moderno (Chrome, Firefox, Edge, Safari)  
- API Key de **Google Gemini**  
- Editor de código (opcional)

### 🔧 Pasos


1. Clonar el repositorio
```bash
git clone https://github.com/DenNaranjo/BiblioIA_proy_final.git
cd BiblioIA
```


2. Abrir index.html en el navegador
```bash
# Opción 1: Doble clic en index.html

# Opción 2: Servidor local con Python
python -m http.server 8000

# Opción 3: Servidor local con Node
npx http-server
```
3. Obtener API Key de Gemini
   
- Ir a Google AI Studio
- Iniciar sesión
- Crear nueva API Key
- Copiar la key

---

### ⚙️ Configuración
1. Configurar API Key
En la interfaz:

- Pegar API Key en el campo superior
- Clic en "Guardar API Key"

2. Personalizar Base de Conocimiento
- Opción A: Usar datos de ejemplo
  - El sistema viene con datos de ejemplo de una biblioteca
  - Listos para probar inmediatamente

- Opción B: Agregar tu propio conocimiento
  - Clic en "➕ Agregar Conocimiento"
  - Ingresar título y contenido
  - Guardar

- Opción C: Modificar código
  - Editar knowledge.js función initializeDefaultKnowledge():

```bash
knowledgeBase = [
    {
        title: "Tu Título",
        content: `
            Tu contenido aquí...
            Puede ser multilinea
        `
    },
    // Más documentos...
];
```

3. Ajustar Parámetros RAG
- Editar config.js:
```bash
const GENERATION_CONFIG = {
    temperature: 0.1,      // Creatividad (0-1)
    maxOutputTokens: 1000  // Longitud de respuesta
};

const SEARCH_CONFIG = {
    minWordLength: 3,      // Palabras mínimas para buscar
    maxResults: 5          // Documentos a considerar
};
```
---

### 💻 Uso
## Flujo Básico
* Configurar API Key (una sola vez)
* Agregar conocimiento al dominio
* Hacer preguntas relacionadas al dominio
* Ver respuestas con fuentes citadas

**Ejemplos de Consultas**
Con la base de conocimiento de ejemplo (biblioteca):

**✅ BUENAS CONSULTAS:**

* "¿Qué libros de programación tienen disponibles?"

* "¿Cuál es el horario de la biblioteca?"

* "¿Cuánto cuesta la multa por retraso?"

* "¿Qué servicios ofrecen?"

**❌ CONSULTAS FUERA DE DOMINIO:**

* "¿Quién es el presidente de México?"

* "Explícame la teoría de la relatividad"

* → El bot responderá: "No tengo esa información en mi base"

**Atajos de Teclado**
* Enter - Enviar mensaje

* Esc - Cerrar modal

* Ctrl + Enter - Guardar conocimiento (en modal)
---

### 🧠 Arquitectura RAG
**¿Qué es RAG?**
**RAG** = Retrieval-Augmented Generation Es una técnica que combina:

* Búsqueda (Retrieval) - Encontrar información relevante

* Generación (Generation) - Crear respuesta con esa información

**Flujo del Sistema**
```bash

┌──────────────────────────────────────────┐
│  1. USUARIO HACE PREGUNTA                │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│  2. BÚSQUEDA EN BASE DE CONOCIMIENTO     │
│     - Ranking por relevancia             │
│     - Top 5 documentos                   │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│  3. CONSTRUCCIÓN DE PROMPT               │
│     - Instrucciones estrictas            │
│     - Contexto de documentos             │
│     - Pregunta del usuario               │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│  4. LLAMADA A GEMINI API                 │
│     - Temperature: 0.1 (preciso)         │
│     - Max tokens: 1000                   │
└──────────────┬───────────────────────────┘
               ↓
┌──────────────────────────────────────────┐
│  5. RESPUESTA CON FUENTES                │
│     - Solo usa contexto                  │
│     - Cita fuentes consultadas           │
└──────────────────────────────────────────┘
```
**Algoritmo de Búsqueda**

```bash

// Puntuación de relevancia:
- Coincidencia exacta en título: +10 puntos
- Coincidencia exacta en contenido: +5 puntos
- Palabra en título: +3 puntos
- Palabra en contenido: +1 punto

// Se retornan los 5 documentos con mayor puntuación
```
---
### 🎨 Personalización
**Cambiar Colores**
En styles.css, busca las variables de color:

```bash
/* Color principal */
background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);

/* Cambia a tu gradiente */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
**Cambiar Dominio**
Ejemplo: Convertir de Biblioteca a E-commerce

1. Modificar knowledge.js:

```bash
knowledgeBase = [
    {
        title: "Producto: Laptop HP Pavilion",
        content: `
            Nombre: Laptop HP Pavilion 15
            SKU: HP-LAP-001
            Precio: $12,999 MXN
            Stock: 15 unidades
            Especificaciones:
            - Procesador: Intel i5 11va Gen
            - RAM: 8GB DDR4
            - Almacenamiento: 512GB SSD
            - Pantalla: 15.6" Full HD
            - Garantía: 1 año
            Categoría: Laptops
        `
    },
    // Más productos...
];
```
2. Actualizar index.html:

```bash

<h1>🛒 Asistente de Compras</h1>
<p>Pregunta sobre nuestros productos</p>
```
**Agregar Funcionalidades**
Ver app.js para funciones auxiliares:

- exportConversation() - Exportar chat

- exportKnowledge() - Exportar base de datos

- importKnowledge() - Importar base de datos
---
### 📚 API Reference
**Funciones Principales**
```bash
knowledge.js
```
- initializeDefaultKnowledge() - Inicializar base de conocimiento

- searchKnowledge(query: string): Array<Document> - Buscar documentos relevantes

- saveKnowledge() - Agregar documento

- deleteKnowledge(index: number) - Eliminar documento

- renderKnowledgeBase() - Renderizar panel
```bash
chat.js
```
- sendMessage(): Promise<void> - Enviar mensaje

- addMessage(text: string, sender: 'user'|'bot', sources?: string) - Agregar mensaje a UI

- saveApiKey() - Guardar API Key

- clearChat() - Limpiar chat
```bash
app.js
```
- setupEventListeners() - Configurar eventos

- showDebugInfo() - Mostrar debug info

- exportConversation() - Exportar conversación

- exportKnowledge() / importKnowledge() - Exportar/Importar conocimiento
---
### 🐛 Troubleshooting
**- Error: "API Key no válida"**
  - Causa: API Key incorrecta o expirada
  - Solución:
    1. Verificar la key en Google AI Studio
    2. Generar una nueva key
    3. Copiar sin espacios adicionales

**- Error: "models/gemini-xxx not found"**
  - Causa: Modelo incorrecto o API version incorrecta
  - Solución:
    1. Usar gemini-2.0-flash-exp
    2. URL debe contener v1beta
    
  **- El bot no encuentra información**
  - Causa: Búsqueda no encuentra coincidencias
  - Solución:
    1. Usar palabras clave del dominio
    2. Agregar más sinónimos al contenido
    3. Ajustar SEARCH_CONFIG.minWordLength

  **-Respuestas lentas**
  - Causa: Red lenta o muchos documentos
  - Solución:
    1. Reducir SEARCH_CONFIG.maxResults
    2. Dividir documentos muy largos
    3. Usar red más rápida
