import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// TODO: Reemplaza estos valores con la configuración de tu proyecto en Firebase Console.
// Por ahora, usamos variables de entorno (si existen) o dejamos campos vacíos.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "dummy-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "nexos-esi.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nexos-esi",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "nexos-esi.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

// Intentar inicializar Firebase. Si falla (por config inválida), mostraremos un error o usaremos un fallback local.
let app;
let db;
let isFirebaseConfigured = false;

try {
  // Comprobación básica para ver si el usuario ya puso sus claves
  if (firebaseConfig.apiKey !== "dummy-api-key") {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isFirebaseConfigured = true;
    console.log("🔥 Firebase inicializado correctamente.");
  } else {
    console.warn("⚠️ Firebase no está configurado. Usando modo Local (Mock) para métricas.");
  }
} catch (error) {
  console.error("Error inicializando Firebase:", error);
}

// ==========================================
// SERVICIOS DE BASE DE DATOS (MÉTRICAS)
// ==========================================

/**
 * Guarda una métrica anónima de una decisión tomada por el usuario.
 */
export const saveDecisionMetric = async (scenarioId, questionId, selectedOptionId, category, userGender) => {
  const metricData = {
    scenarioId,
    questionId,
    selectedOptionId,
    category,
    userGender, // Nuevo campo para métricas por género
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent // Opcional, para ver desde qué disp. entran
  };

  if (isFirebaseConfigured) {
    try {
      await addDoc(collection(db, "metrics"), metricData);
      console.log("Métrica guardada en Firebase.");
    } catch (e) {
      console.error("Error al guardar métrica: ", e);
    }
  } else {
    // Fallback: Guardar en LocalStorage para poder probar el Dashboard sin Firebase real
    const existingMetrics = JSON.parse(localStorage.getItem("nexos_metrics") || "[]");
    existingMetrics.push(metricData);
    localStorage.setItem("nexos_metrics", JSON.stringify(existingMetrics));
    console.log("Métrica guardada en LocalStorage (Modo Mock).");
  }
};

/**
 * Obtiene todas las métricas guardadas (Para el Dashboard Docente).
 */
export const getMetrics = async () => {
  if (isFirebaseConfigured) {
    try {
      const querySnapshot = await getDocs(collection(db, "metrics"));
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
      console.error("Error obteniendo métricas: ", e);
      return [];
    }
  } else {
    // Fallback: Leer de LocalStorage
    return JSON.parse(localStorage.getItem("nexos_metrics") || "[]");
  }
};
