# Sistema de Gestão de Hotel 

Este projeto é um sistema completo de gestão de hotel, composto por um **backend em Node.js + Express + Sequelize + PostgreSQL** e um **frontend em React**, com dashboards separados para **administrador**, **rececionista** e **cliente/guest**.

## Funcionalidades

- Login com autenticação JWT
- CRUD de utilizadores, quartos e reservas
- Dashboards específicos por tipo de utilizador
- Proteção de rotas no frontend
- Design moderno na interface de login

## Tecnologias utilizadas

### Backend:
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT (jsonwebtoken)
- Bcrypt

### Frontend:
- React
- Axios
- React Router DOM

---

## Como executar o projeto

### 🖥️ 1. Clonar o repositório
```bash
git clone https://github.com/teu-usuario/hotel-management.git
cd hotel-management
```

### ⚙️ 2. Instalar e configurar o backend
```bash
cd backend
npm install
```

- Criar um ficheiro `.env` com a ligação à base de dados PostgreSQL

```env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=senha
DB_NAME=hotel_management
JWT_SECRET=segredo
```

- Executar migrações e popular a base de dados se necessário
- Iniciar o servidor:
```bash
npm start
```
> O servidor estará disponível em `http://localhost:5000/api`

---

### 💻 3. Instalar e iniciar o frontend
```bash
cd ../frontend
npm install
npm start
```

> O frontend estará disponível em `http://localhost:3000`

---

### Credenciais de teste

| Utilizador | Email                | Palavra-passe | Tipo         |
|------------|----------------------|----------------|--------------|
| Admin      | maria@example.com     | 12345          | admin        |
| Recep.     | reception@example.com | 12345          | receptionist |
| Cliente    | jorge@example.com     | 12345          | guest        |

---

## Estrutura do Projeto

```
hotel-management/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── routes/
│   │   └── services/
└── README.md
```

---

## Notas

- Certificar que o PostgreSQL está a correr localmente e a base de dados está criada.
- O sistema utiliza tokens JWT, armazenados no localStorage para proteger as rotas.
- Interface de login já inclui design com gradiente e responsividade.

---

## Autor

Desenvolvido por:
Jorge Fortes - 5543
Yuri Correia - 5549

---
