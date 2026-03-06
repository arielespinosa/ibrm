import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Mail, Phone, Send, CheckCircle, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Footer from '@/components/common/Footer';

export default function Contacto() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1920&q=80"
            alt="Contacto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-amber-400 tracking-[0.3em] uppercase text-sm">
              Comunícate
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-white mt-4">
              Contacto
            </h1>
            <div className="w-24 h-0.5 bg-amber-500 mx-auto mt-6" />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-amber-600 tracking-[0.3em] uppercase text-sm font-medium">
                Visítanos
              </span>
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mt-4 mb-6">
                Te esperamos con los brazos abiertos
              </h2>
              <div className="w-16 h-0.5 bg-amber-500 mb-8" />

              <p className="text-gray-600 text-lg mb-8">
                Te invitamos a visitarnos y ser parte de nuestra familia en Cristo. 
                Estaremos encantados de recibirte y compartir contigo la Palabra de Dios.
                Si tienes alguna pregunta o quieres conocernos mejor, no dudes en contactarnos.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Dirección</h3>
                    <p className="text-gray-600">
                      Calle Pintor José María Párraga 1, Bajo 3<br />
                      Alcantarilla, Murcia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Horarios de Reuniones</h3>
                    <p className="text-gray-600">
                      <strong>Domingos:</strong> 11:30 AM - Culto Congregacional<br />
                      <strong>Jueves:</strong> 18:00 PM - Estudio Bíblico y Oración
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">contacto@ibrm.es</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  className="border-red-500 text-red-600 hover:bg-red-50 rounded-none"
                  onClick={() => window.open('https://www.youtube.com/@Iglesia-ibrm', '_blank')}
                >
                  <Youtube className="w-4 h-4 mr-2" />
                  YouTube
                </Button>
              </div>

              {/* Map */}
              <div className="mt-8 h-64 bg-gray-100 overflow-hidden border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3147.7731753449894!2d-1.2201!3d37.9731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU4JzIzLjIiTiAxwrAxMycxMi40Ilc!5e0!3m2!1ses!2ses!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de la iglesia"
                />
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gray-50 p-8 md:p-12">
                <h3 className="font-serif text-2xl text-gray-900 mb-2">
                  Envíanos un mensaje
                </h3>
                <p className="text-gray-500 mb-8">
                  Responderemos lo antes posible
                </p>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="font-serif text-2xl text-gray-900 mb-2">¡Mensaje enviado!</h4>
                    <p className="text-gray-600">Gracias por contactarnos. Te responderemos pronto.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name" className="text-gray-700">Nombre</Label>
                        <Input
                          id="name"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-none"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-gray-700">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-none"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-gray-700">Asunto</Label>
                      <Input
                        id="subject"
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-none"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-gray-700">Mensaje</Label>
                      <Textarea
                        id="message"
                        rows={6}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="mt-2 border-gray-300 focus:border-amber-500 focus:ring-amber-500 rounded-none resize-none"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-none py-6"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Mensaje
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}