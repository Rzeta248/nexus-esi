import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Users, HeartPulse, ChevronRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container" style={{ paddingTop: '10vh', paddingBottom: '10vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-gradient animate-fade-in" style={{ fontSize: '4rem', marginBottom: '1rem' }}>Nexos ESI</h1>
        <p className="animate-fade-in" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', animationDelay: '0.2s' }}>
          Un espacio seguro e interactivo para explorar situaciones de la vida real, tomar decisiones y aprender sobre tus derechos y vínculos.
        </p>
      </header>

      <div className="flex-center animate-fade-in" style={{ gap: '2rem', flexWrap: 'wrap', marginBottom: '4rem', animationDelay: '0.4s' }}>
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', width: '300px' }}>
          <ShieldAlert size={48} color="var(--neon-cyan)" style={{ marginBottom: '1rem' }} />
          <h3>Violencia Digital</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Prevención de sexting no consentido y ciberacoso.</p>
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', width: '300px' }}>
          <Users size={48} color="var(--neon-purple)" style={{ marginBottom: '1rem' }} />
          <h3>Igualdad y Vínculos</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Identificación de vínculos abusivos y promoción del respeto.</p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', width: '300px' }}>
          <HeartPulse size={48} color="var(--neon-pink)" style={{ marginBottom: '1rem' }} />
          <h3>Salud Integral</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.9rem' }}>Información libre de prejuicios sobre métodos preventivos.</p>
        </div>
      </div>

      <div className="flex-center animate-fade-in" style={{ gap: '1rem', flexDirection: 'column', animationDelay: '0.6s' }}>
        <button className="btn btn-primary" onClick={() => navigate('/game')} style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
          Comenzar Simulación <ChevronRight />
        </button>
      </div>
    </div>
  );
}
