export default function AdminDashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Painel do Administrador</h1>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Utilizadores</h2>
          <p style={styles.cardText}>Gerir contas de todos os utilizadores</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Quartos</h2>
          <p style={styles.cardText}>Visualizar, adicionar e editar quartos</p>
        </div>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Reservas</h2>
          <p style={styles.cardText}>Consultar e gerir reservas feitas</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    background: 'linear-gradient(to right, #74ebd5, #acb6e5)',
    minHeight: '100vh',
    color: '#2c3e50',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    fontWeight: 'bold',
  },
  cardContainer: {
    display: 'flex',
    gap: '1.5rem',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    flex: '1 1 250px',
  },
  cardTitle: {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  cardText: {
    fontSize: '1rem',
    color: '#555',
  },
};
