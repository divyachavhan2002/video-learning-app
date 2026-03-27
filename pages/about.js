import { useState } from 'react';
import Head from 'next/head';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from '@/styles/About.module.css';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - LearnHub</title>
        <meta name="description" content="Learn more about LearnHub - Your gateway to quality online education" />
      </Head>

      <Navbar />

      <div className={styles.aboutContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About LearnHub</h1>
            <p className={styles.heroSubtitle}>
              Empowering learners worldwide with free, high-quality educational content
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.missionGrid}>
              <div className={styles.missionContent}>
                <h2 className={styles.sectionTitle}>Our Mission</h2>
                <p className={styles.text}>
                  At LearnHub, we believe that education should be accessible to everyone, everywhere. 
                  Our mission is to provide free, high-quality video courses that help learners develop 
                  new skills and advance their careers.
                </p>
                <p className={styles.text}>
                  We curate the best educational content across various domains including web development, 
                  mobile development, data science, cloud computing, and more.
                </p>
              </div>
              <div className={styles.missionImage}>
                <div className={styles.iconBox}>
                  <span className={styles.largeIcon}>🎓</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.valuesSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Values</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🌟</div>
                <h3 className={styles.valueTitle}>Quality First</h3>
                <p className={styles.valueText}>
                  We carefully select and curate courses to ensure the highest quality learning experience.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🆓</div>
                <h3 className={styles.valueTitle}>Always Free</h3>
                <p className={styles.valueText}>
                  All our courses are completely free. No hidden fees, no subscriptions required.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🚀</div>
                <h3 className={styles.valueTitle}>Continuous Learning</h3>
                <p className={styles.valueText}>
                  We regularly update our content library to keep pace with the latest technologies.
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🤝</div>
                <h3 className={styles.valueTitle}>Community Driven</h3>
                <p className={styles.valueText}>
                  Built by learners, for learners. We value feedback and continuously improve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className={styles.statsSection}>
          <div className={styles.container}>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>72+</div>
                <div className={styles.statLabel}>Free Courses</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>8</div>
                <div className={styles.statLabel}>Categories</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>100%</div>
                <div className={styles.statLabel}>Free Content</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>Access</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>Ready to Start Learning?</h2>
            <p className={styles.ctaText}>
              Join thousands of learners and start your journey today. All courses are free!
            </p>
            <div className={styles.ctaButtons}>
              <a href="/courses" className={styles.primaryButton}>
                Browse Courses
              </a>
              <a href="/contact" className={styles.secondaryButton}>
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
