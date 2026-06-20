import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScenarios } from '../data/scenarios';
import { saveDecisionMetric } from '../lib/firebase';
import { ChevronRight, RefreshCcw, Home as HomeIcon, User } from 'lucide-react';

export default function Game() {
  const navigate = useNavigate();
  
  // Fase 1: Selección de género
  const [selectedGender, setSelectedGender] = useState(null);
  
  // Fase 2: Simulación
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Pantalla de Selección de Personaje
  if (!selectedGender) {
    return (
      <div className="container flex-center" style={{ minHeight: '100vh', flexDirection: 'column' }}>
        <div className="glass-panel animate-fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px' }}>
          <User size={48} color="var(--neon-cyan)" style={{ marginBottom: '1rem' }} />
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Crear Personaje</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Antes de empezar la simulación, elige con qué identidad jugarás. Los escenarios pueden variar dependiendo de tu elección para reflejar situaciones reales.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button className="btn btn-glass" onClick={() => setSelectedGender('mujer')}>
              Jugar como Mujer
            </button>
            <button className="btn btn-glass" onClick={() => setSelectedGender('varon')}>
              Jugar como Varón
            </button>
            <button className="btn btn-glass" onClick={() => setSelectedGender('otro')}>
              Prefiero no decirlo / No binario
            </button>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: '2rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  // Cargar escenarios basados en el género
  const scenarios = getScenarios(selectedGender);
  const scenario = scenarios[currentScenarioIndex];
  const question = scenario?.questions[0];

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);
    setShowFeedback(true);
    
    // Guardar métrica pasando el género del usuario
    await saveDecisionMetric(
      scenario.id,
      question.id,
      option.id,
      option.metricCategory,
      selectedGender
    );
  };

  const handleNext = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartGame = () => {
    setSelectedGender(null); // Volver a pantalla de selección
    setCurrentScenarioIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <div className="container flex-center" style={{ minHeight: '100vh', flexDirection: 'column' }}>
        <div className="glass-panel animate-fade-in" style={{ padding: '3rem', textAlign: 'center', maxWidth: '600px' }}>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>¡Simulación Completada!</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Has finalizado todos los escenarios jugando como {selectedGender}. Puedes volver a jugar eligiendo otra identidad para ver cómo cambian algunas situaciones y estereotipos.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={restartGame}>
              <RefreshCcw size={18} /> Jugar de Nuevo
            </button>
            <button className="btn btn-glass" onClick={() => navigate('/')}>
              <HomeIcon size={18} /> Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = ((currentScenarioIndex) / scenarios.length) * 100;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      {/* Progress Bar */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <span>Progreso ({selectedGender})</span>
          <span>{currentScenarioIndex + 1} / {scenarios.length}</span>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="glass-panel animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <span style={{ 
          display: 'inline-block', 
          padding: '4px 12px', 
          borderRadius: '20px', 
          background: 'rgba(0, 240, 255, 0.1)', 
          color: 'var(--neon-cyan)',
          fontSize: '0.8rem',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>
          {scenario.category}
        </span>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{scenario.title}</h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#e0e0e0' }}>
          {scenario.description}
        </p>
      </div>

      {!showFeedback ? (
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--neon-purple)' }}>{question.text}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {question.options.map(option => (
              <button 
                key={option.id} 
                className="btn btn-glass" 
                style={{ justifyContent: 'flex-start', padding: '1.5rem', textAlign: 'left', fontSize: '1.1rem' }}
                onClick={() => handleOptionSelect(option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="glass-panel animate-fade-in" style={{ padding: '2rem', borderLeft: `4px solid ${selectedOption.isIdeal ? 'var(--success)' : 'var(--warning)'}` }}>
          <h3 style={{ color: selectedOption.isIdeal ? 'var(--success)' : 'var(--warning)', marginBottom: '1rem' }}>
            {selectedOption.isIdeal ? 'Buena elección' : 'Punto de reflexión'}
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
            {selectedOption.feedback}
          </p>
          <button className="btn btn-primary" onClick={handleNext}>
            Siguiente Escenario <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
