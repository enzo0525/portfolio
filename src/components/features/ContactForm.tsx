'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { Send } from 'lucide-react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to send message');

      setStatus('success');
      setMessage('Thanks for reaching out! I will get back to you soon.');
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus('error');
      setMessage('Something went wrong. Please try again or email me directly.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Input
          name="name"
          label="Name"
          placeholder="Your name"
          required
        />
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="your.email@example.com"
          required
        />
      </div>

      <Textarea
        name="message"
        label="Message"
        placeholder="Tell me about your project or just say hi..."
        rows={6}
        required
      />

      <Button
        type="submit"
        disabled={status === 'loading'}
        className="w-full md:w-auto"
      >
        {status === 'loading' ? (
          'Sending...'
        ) : (
          <>
            <Send size={18} className="mr-2" />
            Send Message
          </>
        )}
      </Button>

      {status === 'success' && (
        <p className="text-green-500 text-sm">{message}</p>
      )}
      {status === 'error' && (
        <p className="text-red-500 text-sm">{message}</p>
      )}
    </form>
  );
}
