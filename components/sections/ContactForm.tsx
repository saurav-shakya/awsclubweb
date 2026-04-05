'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message');
        return;
      }

      setStatus('success');
      setFormData({ name: '', email: '', subject: 'general', message: '' });
      onSuccess?.();

      // Reset success message after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-white font-semibold mb-2">
            Name <span className="text-aws-orange">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-aws-orange focus:ring-1 focus:ring-aws-orange"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-white font-semibold mb-2">
            Email <span className="text-aws-orange">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-aws-orange focus:ring-1 focus:ring-aws-orange"
            placeholder="your@email.com"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-white font-semibold mb-2">
            Subject <span className="text-aws-orange">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-aws-orange focus:ring-1 focus:ring-aws-orange"
          >
            <option value="general">General Inquiry</option>
            <option value="sponsorship">Sponsorship</option>
            <option value="collaboration">Collaboration</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-white font-semibold mb-2">
            Message <span className="text-aws-orange">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            minLength={10}
            rows={5}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-aws-orange focus:ring-1 focus:ring-aws-orange resize-none"
            placeholder="Your message (minimum 10 characters)"
          />
        </div>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="p-4 bg-green-900/20 border border-green-700 rounded-lg text-green-300">
            Thank you! Your message has been sent successfully.
          </div>
        )}

        {status === 'error' && (
          <div className="p-4 bg-red-900/20 border border-red-700 rounded-lg text-red-300">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <Button
          variant="primary"
          size="md"
          type="submit"
          disabled={status === 'loading'}
          className="w-full"
        >
          {status === 'loading' ? 'Sending...' : 'Send Message'}
        </Button>
      </form>
    </Card>
  );
};
