--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5

-- Started on 2024-03-07 17:08:54 UTC

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS "your-kitten-db";
--
-- TOC entry 3436 (class 1262 OID 16389)
-- Name: your-kitten-db; Type: DATABASE; Schema: -; Owner: root
--

CREATE DATABASE "your-kitten-db" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "your-kitten-db" OWNER TO root;

\connect -reuse-previous=on "dbname='your-kitten-db'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

-- CREATE SCHEMA public;


-- ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- TOC entry 3437 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 226 (class 1259 OID 16457)
-- Name: poster_images; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.poster_images (
    id integer NOT NULL,
    poster_id integer NOT NULL,
    image bytea NOT NULL
);


ALTER TABLE public.poster_images OWNER TO root;

--
-- TOC entry 224 (class 1259 OID 16455)
-- Name: poster_images_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.poster_images_id_seq
    AS integer
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.poster_images_id_seq OWNER TO root;

--
-- TOC entry 3438 (class 0 OID 0)
-- Dependencies: 224
-- Name: poster_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.poster_images_id_seq OWNED BY public.poster_images.id;


--
-- TOC entry 225 (class 1259 OID 16456)
-- Name: poster_images_poster_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.poster_images_poster_id_seq
    AS integer
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.poster_images_poster_id_seq OWNER TO root;

--
-- TOC entry 3439 (class 0 OID 0)
-- Dependencies: 225
-- Name: poster_images_poster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.poster_images_poster_id_seq OWNED BY public.poster_images.poster_id;


--
-- TOC entry 219 (class 1259 OID 16414)
-- Name: posters; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.posters (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255) NOT NULL,
    phone character varying NOT NULL,
    status character varying NOT NULL,
    description character varying(1000) NOT NULL
);


ALTER TABLE public.posters OWNER TO root;

--
-- TOC entry 218 (class 1259 OID 16413)
-- Name: posters_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.posters_id_seq
    AS integer
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posters_id_seq OWNER TO root;

--
-- TOC entry 3440 (class 0 OID 0)
-- Dependencies: 218
-- Name: posters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.posters_id_seq OWNED BY public.posters.id;


--
-- TOC entry 217 (class 1259 OID 16399)
-- Name: sessions; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.sessions (
    uuid character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.sessions OWNER TO root;

--
-- TOC entry 216 (class 1259 OID 16398)
-- Name: session_user_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.session_user_id_seq
    AS integer
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.session_user_id_seq OWNER TO root;

--
-- TOC entry 3441 (class 0 OID 0)
-- Dependencies: 216
-- Name: session_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.session_user_id_seq OWNED BY public.sessions.user_id;


--
-- TOC entry 215 (class 1259 OID 16391)
-- Name: users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(200) NOT NULL,
    password character varying(200) NOT NULL
);


ALTER TABLE public.users OWNER TO root;

--
-- TOC entry 214 (class 1259 OID 16390)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO root;

--
-- TOC entry 3442 (class 0 OID 0)
-- Dependencies: 214
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.user_id_seq OWNED BY public.users.id;


--
-- TOC entry 223 (class 1259 OID 16426)
-- Name: user_posters; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.user_posters (
    id integer NOT NULL,
    user_id integer NOT NULL,
    poster_id integer NOT NULL
);


ALTER TABLE public.user_posters OWNER TO root;

--
-- TOC entry 220 (class 1259 OID 16423)
-- Name: user_posters_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.user_posters_id_seq
    AS integer
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_posters_id_seq OWNER TO root;

--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 220
-- Name: user_posters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.user_posters_id_seq OWNED BY public.user_posters.id;


--
-- TOC entry 222 (class 1259 OID 16425)
-- Name: user_posters_poster_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.user_posters_poster_id_seq
    AS integer
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_posters_poster_id_seq OWNER TO root;

--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 222
-- Name: user_posters_poster_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.user_posters_poster_id_seq OWNED BY public.user_posters.poster_id;


--
-- TOC entry 221 (class 1259 OID 16424)
-- Name: user_posters_user_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.user_posters_user_id_seq
    AS integer
    START WITH 10
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_posters_user_id_seq OWNER TO root;

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 221
-- Name: user_posters_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.user_posters_user_id_seq OWNED BY public.user_posters.user_id;


--
-- TOC entry 3271 (class 2604 OID 16460)
-- Name: poster_images id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.poster_images ALTER COLUMN id SET DEFAULT nextval('public.poster_images_id_seq'::regclass);


--
-- TOC entry 3272 (class 2604 OID 16461)
-- Name: poster_images poster_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.poster_images ALTER COLUMN poster_id SET DEFAULT nextval('public.poster_images_poster_id_seq'::regclass);


--
-- TOC entry 3267 (class 2604 OID 16417)
-- Name: posters id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.posters ALTER COLUMN id SET DEFAULT nextval('public.posters_id_seq'::regclass);


--
-- TOC entry 3266 (class 2604 OID 16402)
-- Name: sessions user_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.sessions ALTER COLUMN user_id SET DEFAULT nextval('public.session_user_id_seq'::regclass);


--
-- TOC entry 3268 (class 2604 OID 16429)
-- Name: user_posters id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.user_posters ALTER COLUMN id SET DEFAULT nextval('public.user_posters_id_seq'::regclass);


--
-- TOC entry 3269 (class 2604 OID 16430)
-- Name: user_posters user_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.user_posters ALTER COLUMN user_id SET DEFAULT nextval('public.user_posters_user_id_seq'::regclass);


--
-- TOC entry 3270 (class 2604 OID 16431)
-- Name: user_posters poster_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.user_posters ALTER COLUMN poster_id SET DEFAULT nextval('public.user_posters_poster_id_seq'::regclass);


--
-- TOC entry 3265 (class 2604 OID 16394)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 3274 (class 2606 OID 16412)
-- Name: users email_uniq; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT email_uniq UNIQUE (email);


--
-- TOC entry 3284 (class 2606 OID 16465)
-- Name: poster_images poster_images_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.poster_images
    ADD CONSTRAINT poster_images_pkey PRIMARY KEY (id);


--
-- TOC entry 3280 (class 2606 OID 16422)
-- Name: posters posters_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.posters
    ADD CONSTRAINT posters_pkey PRIMARY KEY (id);


--
-- TOC entry 3278 (class 2606 OID 16404)
-- Name: sessions session_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT session_pkey PRIMARY KEY (uuid);


--
-- TOC entry 3276 (class 2606 OID 16397)
-- Name: users user_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3282 (class 2606 OID 16434)
-- Name: user_posters user_posters_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.user_posters
    ADD CONSTRAINT user_posters_pkey PRIMARY KEY (id);


--
-- TOC entry 3286 (class 2606 OID 16440)
-- Name: user_posters poster_id; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.user_posters
    ADD CONSTRAINT poster_id FOREIGN KEY (poster_id) REFERENCES public.posters(id);


--
-- TOC entry 3288 (class 2606 OID 16466)
-- Name: poster_images poster_id; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.poster_images
    ADD CONSTRAINT poster_id FOREIGN KEY (poster_id) REFERENCES public.posters(id) NOT VALID;


--
-- TOC entry 3287 (class 2606 OID 16435)
-- Name: user_posters user_id; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.user_posters
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 3285 (class 2606 OID 16405)
-- Name: sessions user_id_session; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT user_id_session FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2024-03-07 17:08:54 UTC

--
-- PostgreSQL database dump complete
--