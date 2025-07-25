import { useState } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <section id="contact" className="relative min-h-[500px] flex flex-col items-center justify-center py-16 sm:py-24 px-4 bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
      {/* Starfield background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      <h2 className="text-2xl sm:text-4xl font-bold text-white text-center mb-4 z-10 relative">
        Get in Touch
      </h2>
      <p className="text-gray-300 text-center max-w-2xl mb-8 sm:mb-12 z-10 relative text-sm sm:text-base px-4">
        Feel free to reach out for collaborations, questions, or just to say hi!
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md mx-auto bg-black/80 backdrop-blur-md border border-white/20 rounded-2xl p-8 z-10 relative shadow-xl flex flex-col gap-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none text-white placeholder-gray-400 py-2 mb-2 transition-all"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none text-white placeholder-gray-400 py-2 mb-2 transition-all"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full bg-transparent border-b border-white/30 focus:border-white outline-none text-white placeholder-gray-400 py-2 mb-2 transition-all resize-none"
        />
        <button
          type="submit"
          className="w-full bg-white text-gray-950 font-semibold rounded-full py-3 mt-2 hover:bg-gray-200 transition-all shadow-lg shadow-white/30 hover:cursor-pointer"
        >
          {submitted ? 'Thank you!' : 'Send Message'}
        </button>
        {submitted && (
          <div className="text-gray-400 text-center mt-2 animate-fade-in">
            Your message has been sent!
          </div>
        )}
      </form>
    </section>
  );
}
