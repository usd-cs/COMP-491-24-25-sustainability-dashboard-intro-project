--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Postgres.app)
-- Dumped by pg_dump version 16.4

-- Started on 2024-11-11 16:13:44 PST

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
-- TOC entry 6 (class 2615 OID 18168)
-- Name: forum_schema; Type: SCHEMA; Schema: -; Owner: kaelananderson
--

CREATE SCHEMA forum_schema;


ALTER SCHEMA forum_schema OWNER TO kaelananderson;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 18205)
-- Name: Comment; Type: TABLE; Schema: forum_schema; Owner: kaelananderson
--

CREATE TABLE forum_schema."Comment" (
    comment_id integer NOT NULL,
    contents text NOT NULL,
    user_id integer,
    post_id integer
);


ALTER TABLE forum_schema."Comment" OWNER TO kaelananderson;

--
-- TOC entry 219 (class 1259 OID 18182)
-- Name: Post; Type: TABLE; Schema: forum_schema; Owner: kaelananderson
--

CREATE TABLE forum_schema."Post" (
    post_id integer NOT NULL,
    contents text NOT NULL,
    user_id integer
);


ALTER TABLE forum_schema."Post" OWNER TO kaelananderson;

--
-- TOC entry 217 (class 1259 OID 18170)
-- Name: User; Type: TABLE; Schema: forum_schema; Owner: kaelananderson
--

CREATE TABLE forum_schema."User" (
    user_id integer NOT NULL,
    username character varying(100),
    admin boolean DEFAULT false,
    password character varying(255) NOT NULL
);


ALTER TABLE forum_schema."User" OWNER TO kaelananderson;

--
-- TOC entry 220 (class 1259 OID 18204)
-- Name: comment_comment_id_seq; Type: SEQUENCE; Schema: forum_schema; Owner: kaelananderson
--

CREATE SEQUENCE forum_schema.comment_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE forum_schema.comment_comment_id_seq OWNER TO kaelananderson;

--
-- TOC entry 3643 (class 0 OID 0)
-- Dependencies: 220
-- Name: comment_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: forum_schema; Owner: kaelananderson
--

ALTER SEQUENCE forum_schema.comment_comment_id_seq OWNED BY forum_schema."Comment".comment_id;


--
-- TOC entry 218 (class 1259 OID 18181)
-- Name: post_post_id_seq; Type: SEQUENCE; Schema: forum_schema; Owner: kaelananderson
--

CREATE SEQUENCE forum_schema.post_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE forum_schema.post_post_id_seq OWNER TO kaelananderson;

--
-- TOC entry 3644 (class 0 OID 0)
-- Dependencies: 218
-- Name: post_post_id_seq; Type: SEQUENCE OWNED BY; Schema: forum_schema; Owner: kaelananderson
--

ALTER SEQUENCE forum_schema.post_post_id_seq OWNED BY forum_schema."Post".post_id;


--
-- TOC entry 216 (class 1259 OID 18169)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: forum_schema; Owner: kaelananderson
--

CREATE SEQUENCE forum_schema.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE forum_schema.users_user_id_seq OWNER TO kaelananderson;

--
-- TOC entry 3645 (class 0 OID 0)
-- Dependencies: 216
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: forum_schema; Owner: kaelananderson
--

ALTER SEQUENCE forum_schema.users_user_id_seq OWNED BY forum_schema."User".user_id;


--
-- TOC entry 3481 (class 2604 OID 18208)
-- Name: Comment comment_id; Type: DEFAULT; Schema: forum_schema; Owner: kaelananderson
--

ALTER TABLE ONLY forum_schema."Comment" ALTER COLUMN comment_id SET DEFAULT nextval('forum_schema.comment_comment_id_seq'::regclass);


--
-- TOC entry 3480 (class 2604 OID 18185)
-- Name: Post post_id; Type: DEFAULT; Schema: forum_schema; Owner: kaelananderson
--

ALTER TABLE ONLY forum_schema."Post" ALTER COLUMN post_id SET DEFAULT nextval('forum_schema.post_post_id_seq'::regclass);


--
-- TOC entry 3478 (class 2604 OID 18173)
-- Name: User user_id; Type: DEFAULT; Schema: forum_schema; Owner: kaelananderson
--

ALTER TABLE ONLY forum_schema."User" ALTER COLUMN user_id SET DEFAULT nextval('forum_schema.users_user_id_seq'::regclass);


--
-- TOC entry 3487 (class 2606 OID 18212)
-- Name: Comment comment_pkey; Type: CONSTRAINT; Schema: forum_schema; Owner: kaelananderson
--

ALTER TABLE ONLY forum_schema."Comment"
    ADD CONSTRAINT comment_pkey PRIMARY KEY (comment_id);


--
-- TOC entry 3485 (class 2606 OID 18189)
-- Name: Post post_pkey; Type: CONSTRAINT; Schema: forum_schema; Owner: kaelananderson
--

ALTER TABLE ONLY forum_schema."Post"
    ADD CONSTRAINT post_pkey PRIMARY KEY (post_id);


--
-- TOC entry 3483 (class 2606 OID 18178)
-- Name: User users_pkey; Type: CONSTRAINT; Schema: forum_schema; Owner: kaelananderson
--

ALTER TABLE ONLY forum_schema."User"
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3489 (class 2606 OID 18218)
-- Name: Comment comment_post_id_fkey; Type: FK CONSTRAINT; Schema: forum_schema; Owner: kaelananderson
--

ALTER TABLE ONLY forum_schema."Comment"
    ADD CONSTRAINT comment_post_id_fkey FOREIGN KEY (post_id) REFERENCES forum_schema."Post"(post_id) ON DELETE CASCADE;


--
-- TOC entry 3490 (class 2606 OID 18213)
-- Name: Comment comment_user_id_fkey; Type: FK CONSTRAINT; Schema: forum_schema; Owner: kaelananderson
--

ALTER TABLE ONLY forum_schema."Comment"
    ADD CONSTRAINT comment_user_id_fkey FOREIGN KEY (user_id) REFERENCES forum_schema."User"(user_id) ON DELETE CASCADE;


--
-- TOC entry 3488 (class 2606 OID 18190)
-- Name: Post post_user_id_fkey; Type: FK CONSTRAINT; Schema: forum_schema; Owner: kaelananderson
--

ALTER TABLE ONLY forum_schema."Post"
    ADD CONSTRAINT post_user_id_fkey FOREIGN KEY (user_id) REFERENCES forum_schema."User"(user_id) ON DELETE CASCADE;


--
-- TOC entry 3639 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA forum_schema; Type: ACL; Schema: -; Owner: kaelananderson
--

GRANT USAGE ON SCHEMA forum_schema TO collaborator;


--
-- TOC entry 3640 (class 0 OID 0)
-- Dependencies: 221
-- Name: TABLE "Comment"; Type: ACL; Schema: forum_schema; Owner: kaelananderson
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE forum_schema."Comment" TO collaborator;


--
-- TOC entry 3641 (class 0 OID 0)
-- Dependencies: 219
-- Name: TABLE "Post"; Type: ACL; Schema: forum_schema; Owner: kaelananderson
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE forum_schema."Post" TO collaborator;


--
-- TOC entry 3642 (class 0 OID 0)
-- Dependencies: 217
-- Name: TABLE "User"; Type: ACL; Schema: forum_schema; Owner: kaelananderson
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE forum_schema."User" TO collaborator;


--
-- TOC entry 2049 (class 826 OID 18226)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: forum_schema; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA forum_schema GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES TO collaborator;


--
-- TOC entry 2050 (class 826 OID 18233)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: forum_schema; Owner: kaelananderson
--

ALTER DEFAULT PRIVILEGES FOR ROLE kaelananderson IN SCHEMA forum_schema GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES TO collaborator;


-- Completed on 2024-11-11 16:13:47 PST

--
-- PostgreSQL database dump complete
--

