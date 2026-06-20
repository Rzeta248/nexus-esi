import { createClient } from '@supabase/supabase-js';

// Usamos las variables de entorno de Vite o directamente las claves que nos pasó el usuario para el MVP.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jhjrkjjadrmxjjbrvyiv.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_ZKn_l2X7q_710OqJ1XkTYg_DvOB2ZlC';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Guarda una métrica anónima de una decisión tomada por el usuario.
 */
export const saveDecisionMetric = async (scenarioId, questionId, selectedOptionId, category, userGender) => {
  const metricData = {
    scenarioId,
    questionId,
    selectedOptionId,
    category,
    userGender,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };

  try {
    const { data, error } = await supabase
      .from('metrics')
      .insert([metricData]);
      
    if (error) {
      console.error("Error al guardar métrica en Supabase: ", error);
    } else {
      console.log("Métrica guardada en Supabase.");
    }
  } catch (e) {
    console.error("Excepción al guardar métrica: ", e);
  }
};

/**
 * Obtiene todas las métricas guardadas (Para el Dashboard Docente).
 */
export const getMetrics = async () => {
  try {
    const { data, error } = await supabase
      .from('metrics')
      .select('*');
      
    if (error) {
      console.error("Error obteniendo métricas de Supabase: ", error);
      return [];
    }
    return data || [];
  } catch (e) {
    console.error("Excepción obteniendo métricas: ", e);
    return [];
  }
};
