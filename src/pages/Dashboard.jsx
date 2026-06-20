import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMetrics } from '../lib/firebase';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

const COLORS = ['#00f0ff', '#bd00ff', '#ff0055', '#00ff88', '#ffaa00'];

export default function Dashboard() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const fetchMetrics = async () => {
    setLoading(true);
    const data = await getMetrics();
    setMetrics(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchMetrics();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === '1234') { // PIN hardcodeado para el MVP
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPin('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container flex-center" style={{ minHeight: '100vh', flexDirection: 'column' }}>
        <form className="glass-panel animate-fade-in" onSubmit={handleLogin} style={{ padding: '3rem', textAlign: 'center', maxWidth: '400px' }}>
          <h2 className="text-gradient" style={{ marginBottom: '2rem' }}>Acceso Docentes</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Ingresa el PIN para ver las métricas.</p>
          <input 
            type="password" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{ 
              width: '100%', padding: '1rem', marginBottom: '1rem', borderRadius: '8px', 
              border: error ? '1px solid var(--warning)' : '1px solid var(--surface-border)', 
              background: 'rgba(0,0,0,0.5)', color: 'white', outline: 'none'
            }} 
            placeholder="PIN..."
          />
          {error && <p style={{ color: 'var(--warning)', marginBottom: '1rem', fontSize: '0.9rem' }}>PIN incorrecto</p>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Ingresar</button>
        </form>
      </div>
    );
  }

  // Procesamiento de datos para los gráficos
  const categoryLabels = {
    avoidance: "Evasión",
    intervention: "Intervención Activa",
    peer_pressure: "Presión de Grupo",
    submissive: "Sumisión",
    boundary_setting: "Establecer Límites",
    risk_taking: "Tomar Riesgos",
    prevention: "Prevención",
    misinformation: "Desinformación",
    passive_support: "Apoyo Pasivo"
  };

  const getCategoryData = () => {
    const counts = metrics.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).map(key => ({ name: categoryLabels[key] || key, value: counts[key] }));
  };

  const getScenarioData = () => {
    const counts = metrics.reduce((acc, curr) => {
      acc[curr.scenarioId] = (acc[curr.scenarioId] || 0) + 1;
      return acc;
    }, {});
    const scenarioLabels = {
      s1_violencia_digital: "1. Violencia Digital",
      s2_igualdad_vinculos: "2. Igualdad y Vínculos",
      s3_salud_integral: "3. Salud Integral",
      s4_diversidad: "4. Diversidad y Respeto",
      s5_consentimiento: "5. Consentimiento",
      s6_estereotipos: "6. Estereotipos"
    };
    return Object.keys(counts).map(key => ({ name: scenarioLabels[key] || key, count: counts[key] }));
  };

  const categoryData = getCategoryData();
  const scenarioData = getScenarioData();

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <button className="btn btn-glass" onClick={() => navigate('/')} style={{ padding: '8px 16px' }}>
          <ArrowLeft size={18} /> Volver
        </button>
        <h1 className="text-gradient">Panel Docente</h1>
        <button className="btn btn-primary" onClick={fetchMetrics} style={{ padding: '8px 16px' }}>
          <RefreshCw size={18} /> Actualizar
        </button>
      </header>

      {metrics.length === 0 && !loading ? (
        <div className="glass-panel flex-center" style={{ padding: '4rem', flexDirection: 'column', textAlign: 'center' }}>
          <AlertCircle size={48} color="var(--text-secondary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: 'var(--text-secondary)' }}>Aún no hay datos registrados</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Invita a los estudiantes a jugar para ver las estadísticas aquí.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Gráfico 1: Categorías de Decisión */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Tendencias de Decisión</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
              Muestra qué tipo de reacciones (evasión, intervención, sumisión) predominan.
            </p>
          </div>

          {/* Gráfico 2: Interacción por Escenario */}
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Participación por Escenario</h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scenarioData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                  <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-color)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}
                    cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                  />
                  <Bar dataKey="count" fill="var(--neon-cyan)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
