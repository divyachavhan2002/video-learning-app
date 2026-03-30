import { useState } from 'react';
import Head from 'next/head';
import { getString, getSiteInfo, getConfig } from '@/config';
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
  const siteInfo = getSiteInfo();
  const whatsappNumber = getConfig('contactPage.whatsappNumber', '919876543210');

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
      const mailtoLink = `mailto:${siteInfo.authorEmail}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;
      
      window.location.href = mailtoLink;
      
      setStatus({
        type: 'success',
        message: getString('contact.formSuccess')
      });

      // Reset form
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus({ type: '', message: '' });
      }, 3000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: getString('contact.formError')
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const message = getString('contact.whatsappMessage');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Head>
        <title>{getString('pageTitles.contact')}</title>
        <meta name="description" content={getString('pageDescriptions.contact')} />
      </Head>

      <div className={styles.contactContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{getString('contact.heroTitle')}</h1>
            <p className={styles.heroSubtitle}>
              {getString('contact.pageSubtitle')}
            </p>
          </div>
        </section>

        <div className={styles.container}>
          <div className={styles.contactGrid}>
            {/* Contact Form */}
            <div className={styles.formSection}>
              <h2 className={styles.sectionTitle}>{getString('contact.formTitle')}</h2>
              <form onSubmit={handleSubmit} className={styles.contactForm}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    {getString('contact.formName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder={getString('contact.formNamePlaceholder')}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    {getString('contact.formEmail')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder={getString('contact.formEmailPlaceholder')}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.label}>
                    {getString('contact.formSubject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className={styles.input}
                    placeholder={getString('contact.formSubjectPlaceholder')}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>
                    {getString('contact.formMessage')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className={styles.textarea}
                    placeholder={getString('contact.formMessagePlaceholder')}
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
                  {isSubmitting ? getString('contact.formSending') : getString('contact.formSubmit')}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className={styles.infoSection}>
              <h2 className={styles.sectionTitle}>{getString('contact.contactInfoTitle')}</h2>
              
              <div className={styles.contactMethods}>
                <div className={styles.contactCard}>
                  <div className={styles.contactIcon}>📧</div>
                  <h3 className={styles.contactMethodTitle}>{getString('contact.emailTitle')}</h3>
                  <p className={styles.contactText}>
                    <a href={`mailto:${siteInfo.authorEmail}`} className={styles.contactLink}>
                      {getString('contact.emailAddress')}
                    </a>
                  </p>
                  <p className={styles.contactDesc}>
                    {getString('contact.emailDesc')}
                  </p>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactIcon}>💬</div>
                  <h3 className={styles.contactMethodTitle}>{getString('contact.whatsappTitle')}</h3>
                  <button 
                    onClick={handleWhatsAppClick}
                    className={styles.whatsappButton}
                  >
                    <span className={styles.whatsappIcon}>📱</span>
                    {getString('contact.whatsappBtn')}
                  </button>
                  <p className={styles.contactDesc}>
                    {getString('contact.whatsappDesc')}
                  </p>
                </div>

                <div className={styles.contactCard}>
                  <div className={styles.contactIcon}>🕐</div>
                  <h3 className={styles.contactMethodTitle}>{getString('contact.responseTitle')}</h3>
                  <p className={styles.contactText}>
                    {getString('contact.responseTime')}
                  </p>
                  <p className={styles.contactDesc}>
                    {getString('contact.responseDesc')}
                  </p>
                </div>
              </div>

              <div className={styles.faqSection}>
                <h3 className={styles.faqTitle}>{getString('contact.faqTitle')}</h3>
                <ul className={styles.faqList}>
                  <li>{getString('contact.faq1')}</li>
                  <li>{getString('contact.faq2')}</li>
                  <li>{getString('contact.faq3')}</li>
                  <li>{getString('contact.faq4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
