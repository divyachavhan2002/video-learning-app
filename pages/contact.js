import { useState } from 'react';
import Head from 'next/head';
import styles from '@/styles/Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:divyachavhan234@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      setStatus({
        type: 'success',
        message: 'Opening your email client...'
      });

      // Reset form
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus({ type: '', message: '' });
      }, 3000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to open email client. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    // Replace with your WhatsApp number (include country code without + or -)
    const phoneNumber = '919876543210'; // Example: 919876543210 for +91 9876543210
    const message = 'Hi! I have a question about LearnHub.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Head>
        <title>Contact Us - LearnHub</title>
        <meta name="description" content="Get in touch with LearnHub team. We're here to help!" />
      </Head>

      <div className={styles.contactContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Get In Touch</h1>
            <p className={styles.heroSubtitle}>
              Have questions? We'd love to hear from you. Send us a message!
            </p>
          </div>
        </section>

        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Send us a Message</h2>
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="John Doe"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="john@example.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder="How can we help you?"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className={styles.textarea}
                    placeholder="Tell us more about your question..."
                  />
                </div>

                {status.message && (
                  <div className={`${styles.statusMessage} ${styles[status.type]}`}>
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              
              <div className={styles.contactMethods}>
                <div className={styles.contactCard}>
                  <div className={styles.contactIcon}>📧</div>
                  <h3 className={styles.contactMethodTitle}>Email</h3>
                  <p className={styles.contactText}>
                    <a href="mailto:divyachavhan234@gmail.com" className={styles.contactLink}>
                      divyachavhan234@gmail.com
                    </a>
                  </p>
                  <p className={styles.contactDesc}>
                    Send us an email anytime. We'll respond within 24 hours.
                  </p>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactIcon}>💬</div>
                  <h3 className={styles.contactMethodTitle}>WhatsApp</h3>
                  <button 
                    onClick={handleWhatsAppClick}
                    className={styles.whatsappButton}
                  >
                    <span className={styles.whatsappIcon}>📱</span>
                    Chat with us on WhatsApp
                  </button>
                  <p className={styles.contactDesc}>
                    Get instant responses to your questions via WhatsApp.
                  </p>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactIcon}>🕐</div>
                  <h3 className={styles.contactMethodTitle}>Response Time</h3>
                  <p className={styles.contactText}>
                    Usually within 24 hours
                  </p>
                  <p className={styles.contactDesc}>
                    We strive to respond to all inquiries as quickly as possible.
                  </p>
                </div>
              </div>

              <div className={styles.faqSection}>
                <h3 className={styles.faqTitle}>Quick Questions?</h3>
                <ul className={styles.faqList}>
                  <li>✓ All courses are 100% free</li>
                  <li>✓ No registration required to browse</li>
                  <li>✓ New courses added regularly</li>
                  <li>✓ Available 24/7</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
