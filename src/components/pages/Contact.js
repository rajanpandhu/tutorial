import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

import '../../assets/css/contact.css';

// Input Field Component
const InputField = ({ label, name, type = 'text', value, error, onChange, onBlur, placeholder, rows }) => {
  const isTextarea = type === 'textarea';
  const Component = isTextarea ? 'textarea' : 'input';
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <Component
        type={!isTextarea ? type : undefined}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={isTextarea ? rows : undefined}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg outline-none transition ${
          isTextarea ? 'resize-none' : ''
        } ${
          error 
            ? 'border-red-500 focus:ring-2 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
        }`}
      />
      {error && (
        <div className="flex items-center mt-1 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </div>
      )}
      {name === 'message' && (
        <div className="text-right mt-1 text-xs text-gray-500">
          {value.length}/500
        </div>
      )}
    </div>
  );
};

// Contact Info Item Component
const ContactItem = ({ icon: Icon, title, value, bgColor, iconColor }) => (
  <div className="flex items-start space-x-4">
    <div className={`${bgColor} p-3 rounded-full`}>
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-gray-600 whitespace-pre-line">{value}</p>
    </div>
  </div>
);

// Main Contact Page Component
const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // EmailJS Configuration from Environment Variables
  // For Create React App (CRA):
  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
  
  // For Vite, use this instead:
  // const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  // const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  // const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // Validation function
  const validate = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Only letters and spaces allowed';
        return '';
        
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format';
        return '';
        
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.length < 5) return 'Subject must be at least 5 characters';
        return '';
        
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.length < 10) return 'Message must be at least 10 characters';
        if (value.length > 500) return 'Message cannot exceed 500 characters';
        return '';
        
      default:
        return '';
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    if (touched[name]) {
      setErrors({ ...errors, [name]: validate(name, value) });
    }
  };

  // Handle input blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  // Handle form submit with EmailJS
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(form).forEach(key => {
      const error = validate(key, form[key]);
      if (error) newErrors[key] = error;
    });
    
    setTouched({ name: true, email: true, subject: true, message: true });
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Send email using EmailJS
    setLoading(true);
    setStatus('');
    
    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
        to_name: 'Admin', // You can customize this
      };

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setErrors({});
      setTouched({});
      
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error('Email send failed:', error);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600">We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
            
            <div className="space-y-6">
              <ContactItem
                icon={Mail}
                title="Email"
                value="contact@example.com"
                bgColor="bg-blue-100"
                iconColor="text-blue-600"
              />
              <ContactItem
                icon={Phone}
                title="Phone"
                value="+1 (555) 123-4567"
                bgColor="bg-green-100"
                iconColor="text-green-600"
              />
              <ContactItem
                icon={MapPin}
                title="Address"
                value="123 Business Street&#10;Suite 100&#10;New York, NY 10001"
                bgColor="bg-purple-100"
                iconColor="text-purple-600"
              />
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Business Hours</h3>
              <div className="space-y-2 text-gray-600">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
            
            <div>
              <InputField
                label="Your Name"
                name="name"
                value={form.name}
                error={errors.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="John Doe"
              />

              <InputField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="john@example.com"
              />

              <InputField
                label="Subject"
                name="subject"
                value={form.subject}
                error={errors.subject}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="How can we help?"
              />

              <InputField
                label="Message"
                name="message"
                type="textarea"
                value={form.message}
                error={errors.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Tell us more about your inquiry..."
                rows={5}
              />

              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                  ✅ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                  ❌ Failed to send message. Please try again.
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center space-x-2`}
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;