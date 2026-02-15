"use client";

import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Send,
  Code2,
  User,
  Briefcase,
  MessageSquare,
  ChevronDown,
  CheckCircle,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  image_url: string | null;
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
}

const skills = [
  { name: "React / Next.js", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "PostgreSQL", level: 75 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Git & GitHub", level: 85 },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setFormStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 4000);
    } catch (err) {
      setFormStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#hero" className="text-xl font-bold tracking-tight">
            <span className="text-violet-400">&lt;</span>
            Portfolio
            <span className="text-violet-400">/&gt;</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-zinc-400 md:flex">
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#projects" className="transition hover:text-white">
              Projects
            </a>
            <a href="#skills" className="transition hover:text-white">
              Skills
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-sm text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Available for work
        </div>
        <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Ashutosh
          </span>
        </h1>
        <p className="mb-8 max-w-xl text-lg text-zinc-400 leading-relaxed">
          A passionate full-stack developer building modern web applications with
          React, Next.js, and Node.js. I turn ideas into elegant, performant
          digital experiences.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#projects"
            className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-zinc-700 px-6 py-3 font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
          >
            Get in Touch
          </a>
        </div>
        <div className="mt-12 flex items-center gap-6 text-zinc-500">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            <Github size={22} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="mailto:ashutosh@example.com"
            className="transition hover:text-white"
          >
            <Mail size={22} />
          </a>
        </div>
        <a
          href="#about"
          className="mt-16 animate-bounce text-zinc-600 transition hover:text-zinc-400"
        >
          <ChevronDown size={28} />
        </a>
      </section>

      {/* About Section */}
      <section id="about" className="border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-center gap-3">
            <User className="text-violet-400" size={24} />
            <h2 className="text-3xl font-bold">About Me</h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-4 text-zinc-400 leading-relaxed">
              <p>
                I&apos;m a full-stack web developer with 3+ years of experience
                building scalable and user-friendly web applications. My journey
                in tech started with curiosity about how websites work, and
                it&apos;s grown into a deep passion for creating impactful
                digital solutions.
              </p>
              <p>
                I specialize in the JavaScript/TypeScript ecosystem, working
                extensively with React, Next.js, Node.js, and modern databases
                like PostgreSQL and Supabase. I believe in writing clean,
                maintainable code and following best practices.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me contributing to
                open-source projects, writing technical blog posts, or exploring
                new technologies.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="mb-4 text-lg font-semibold">Quick Facts</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Location", value: "San Francisco, CA" },
                  { label: "Experience", value: "3+ Years" },
                  { label: "Education", value: "B.S. Computer Science" },
                  { label: "Projects", value: `${projects.length}+ Built` },
                ].map((fact) => (
                  <div key={fact.label} className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      {fact.label}
                    </p>
                    <p className="text-sm font-medium text-zinc-200">
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-center gap-3">
            <Briefcase className="text-violet-400" size={24} />
            <h2 className="text-3xl font-bold">Projects</h2>
          </div>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-72 animate-pulse rounded-xl border border-zinc-800 bg-zinc-900"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:border-zinc-700"
                >
                  {project.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      {project.featured && (
                        <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-xs font-medium text-violet-400">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="mb-4 text-sm text-zinc-400 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-zinc-800 px-2 py-1 text-xs text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-violet-400"
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-sm text-zinc-400 transition hover:text-violet-400"
                        >
                          <Github size={14} />
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-center gap-3">
            <Code2 className="text-violet-400" size={24} />
            <h2 className="text-3xl font-bold">Skills</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-zinc-500">{skill.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="border-t border-zinc-800 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-center gap-3">
            <MessageSquare className="text-violet-400" size={24} />
            <h2 className="text-3xl font-bold">Get in Touch</h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-4 text-zinc-400">
              <p className="leading-relaxed">
                Have a project in mind or want to collaborate? I&apos;d love to
                hear from you. Fill out the form and I&apos;ll get back to you
                as soon as possible.
              </p>
              <div className="space-y-3 pt-4">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-violet-400" />
                    <span>ashutosh@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Github size={18} className="text-violet-400" />
                  <span>github.com/ashutosh</span>
                </div>
                <div className="flex items-center gap-3">
                  <Linkedin size={18} className="text-violet-400" />
                  <span>linkedin.com/in/ashutosh</span>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-violet-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-violet-500"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-violet-500"
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={5}
                className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-violet-500"
              />
              <button
                type="submit"
                disabled={formStatus === "sending"}
                className="flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition hover:bg-violet-500 disabled:opacity-50"
              >
                {formStatus === "sending" ? (
                  "Sending..."
                ) : formStatus === "success" ? (
                  <>
                    <CheckCircle size={16} /> Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </button>
              {formStatus === "error" && (
                <p className="text-sm text-red-400">{errorMsg}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 text-sm text-zinc-500">
            <p>&copy; 2026 Ashutosh. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              <Github size={16} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              <Linkedin size={16} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
