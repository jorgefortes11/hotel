--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.2

-- Started on 2025-06-19 22:36:37

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 863 (class 1247 OID 16558)
-- Name: enum_Bookings_status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Bookings_status" AS ENUM (
    'pending',
    'confirmed',
    'cancelled',
    'completed'
);


ALTER TYPE public."enum_Bookings_status" OWNER TO postgres;

--
-- TOC entry 857 (class 1247 OID 16536)
-- Name: enum_Rooms_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Rooms_type" AS ENUM (
    'single',
    'double',
    'suite',
    'deluxe'
);


ALTER TYPE public."enum_Rooms_type" OWNER TO postgres;

--
-- TOC entry 851 (class 1247 OID 16516)
-- Name: enum_Users_role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."enum_Users_role" AS ENUM (
    'admin',
    'receptionist',
    'guest',
    'client'
);


ALTER TYPE public."enum_Users_role" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 222 (class 1259 OID 16568)
-- Name: Bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Bookings" (
    id integer NOT NULL,
    "checkInDate" timestamp with time zone NOT NULL,
    "checkOutDate" timestamp with time zone NOT NULL,
    "totalPrice" numeric(10,2) NOT NULL,
    status public."enum_Bookings_status" DEFAULT 'pending'::public."enum_Bookings_status",
    "specialRequests" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "UserId" integer,
    "RoomId" integer
);


ALTER TABLE public."Bookings" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16567)
-- Name: Bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Bookings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Bookings_id_seq" OWNER TO postgres;

--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 221
-- Name: Bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Bookings_id_seq" OWNED BY public."Bookings".id;


--
-- TOC entry 220 (class 1259 OID 16546)
-- Name: Rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Rooms" (
    id integer NOT NULL,
    "roomNumber" character varying(255) NOT NULL,
    type public."enum_Rooms_type" NOT NULL,
    price numeric(10,2) NOT NULL,
    capacity integer NOT NULL,
    description text,
    "isAvailable" boolean DEFAULT true,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Rooms" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16545)
-- Name: Rooms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Rooms_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Rooms_id_seq" OWNER TO postgres;

--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 219
-- Name: Rooms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Rooms_id_seq" OWNED BY public."Rooms".id;


--
-- TOC entry 218 (class 1259 OID 16524)
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role public."enum_Users_role" DEFAULT 'guest'::public."enum_Users_role",
    "resetPasswordToken" character varying(255),
    "resetPasswordExpires" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16523)
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 217
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- TOC entry 4718 (class 2604 OID 16571)
-- Name: Bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bookings" ALTER COLUMN id SET DEFAULT nextval('public."Bookings_id_seq"'::regclass);


--
-- TOC entry 4716 (class 2604 OID 16549)
-- Name: Rooms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rooms" ALTER COLUMN id SET DEFAULT nextval('public."Rooms_id_seq"'::regclass);


--
-- TOC entry 4714 (class 2604 OID 16527)
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- TOC entry 4882 (class 0 OID 16568)
-- Dependencies: 222
-- Data for Name: Bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Bookings" (id, "checkInDate", "checkOutDate", "totalPrice", status, "specialRequests", "createdAt", "updatedAt", "UserId", "RoomId") FROM stdin;
5	2025-07-19 23:00:00-01	2025-07-24 23:00:00-01	875.00	confirmed	Quero vista para o mar	2025-06-21 09:15:30.456-01	2025-06-19 21:35:13.276-01	\N	\N
\.


--
-- TOC entry 4880 (class 0 OID 16546)
-- Dependencies: 220
-- Data for Name: Rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Rooms" (id, "roomNumber", type, price, capacity, description, "isAvailable", "createdAt", "updatedAt") FROM stdin;
4	201	double	15000.00	2	Quarto com cama de casal e varanda	t	2025-06-19 11:30:42.611-01	2025-06-19 21:04:36.155-01
2	102	double	12000.00	2	Quarto espaçoso com cama de casal	t	2025-06-19 11:28:04.976-01	2025-06-19 21:04:50.978-01
5	12	single	7500.00	1	Quarto para fumantes	t	2025-06-19 21:06:43.958-01	2025-06-19 21:06:53.365-01
1	101	single	8000.00	1	Quarto simples e confortável	f	2025-06-19 02:50:46.04-01	2025-06-19 22:08:52.732-01
\.


--
-- TOC entry 4878 (class 0 OID 16524)
-- Dependencies: 218
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, name, email, password, role, "resetPasswordToken", "resetPasswordExpires", "createdAt", "updatedAt") FROM stdin;
3	Maria Silva	maria@example.com	$2b$10$KOzVoBbqnxjYL7qPJ9aUdu/h1pwZBqEAsZLraIj0XW6YL48t0hj5G	admin	\N	\N	2025-06-19 02:54:19.428-01	2025-06-19 02:54:19.428-01
6	Jorge Fortes	jorge@example.com	$2b$12$7nCLN44kveH8ll8Zy8JV8OGqL1N4OYQhEi9fCRfVOFRhoIzXYdKDq	client	\N	\N	2025-06-19 14:05:29.871234-01	2025-06-19 14:05:29.871234-01
7	Yuri Correia	yuri@example.com	$2b$12$7nCLN44kveH8ll8Zy8JV8OGqL1N4OYQhEi9fCRfVOFRhoIzXYdKDq	receptionist	\N	\N	2025-06-19 14:11:55.575478-01	2025-06-19 14:11:55.575478-01
13	Joana	joana@example.com	$2b$10$e25YIvgZvXJg7x6qnA6Jj.NycU/t2iLEGb69JRxTCL4fYDex4NMDq	client	\N	\N	2025-06-19 16:15:27.604-01	2025-06-19 16:15:27.604-01
\.


--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 221
-- Name: Bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Bookings_id_seq"', 3, true);


--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 219
-- Name: Rooms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Rooms_id_seq"', 5, true);


--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 217
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 13, true);


--
-- TOC entry 4729 (class 2606 OID 16576)
-- Name: Bookings Bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bookings"
    ADD CONSTRAINT "Bookings_pkey" PRIMARY KEY (id);


--
-- TOC entry 4725 (class 2606 OID 16554)
-- Name: Rooms Rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rooms"
    ADD CONSTRAINT "Rooms_pkey" PRIMARY KEY (id);


--
-- TOC entry 4727 (class 2606 OID 16556)
-- Name: Rooms Rooms_roomNumber_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Rooms"
    ADD CONSTRAINT "Rooms_roomNumber_key" UNIQUE ("roomNumber");


--
-- TOC entry 4721 (class 2606 OID 16534)
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- TOC entry 4723 (class 2606 OID 16532)
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- TOC entry 4730 (class 2606 OID 16582)
-- Name: Bookings Bookings_RoomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bookings"
    ADD CONSTRAINT "Bookings_RoomId_fkey" FOREIGN KEY ("RoomId") REFERENCES public."Rooms"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4731 (class 2606 OID 16577)
-- Name: Bookings Bookings_UserId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Bookings"
    ADD CONSTRAINT "Bookings_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


-- Completed on 2025-06-19 22:36:38

--
-- PostgreSQL database dump complete
--

