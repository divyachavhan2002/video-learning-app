import SEO from "@/components/common/SEO";
import Link from "next/link";
import { getString } from '@/config';
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <SEO 
        title={getString('pageTitles.home')}
        description={getString('pageDescriptions.home')}
        keywords={getString('seo.defaultKeywords')}
      />

      <div className={styles.container}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            {getString('home.heroTitle')} <span className={styles.highlight}>{getString('appName')}</span>
          </h1>
          <p className={styles.subtitle}>
            {getString('home.heroSubtitle')}
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/courses" className={styles.primaryBtn}>
              {getString('home.ctaPrimary')}
            </Link>
            <Link href="/auth/signup" className={styles.secondaryBtn}>
              {getString('home.ctaSecondary')}
            </Link>
          </div>
        </section>

        <section className={styles.features}>
          <h2 className={styles.sectionTitle}>{getString('home.whyChooseTitle')}</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.icon}>{getString('homeFeatures.qualityVideosIcon')}</div>
              <h3>{getString('homeFeatures.qualityVideosTitle')}</h3>
              <p>{getString('homeFeatures.qualityVideosDesc')}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.icon}>{getString('homeFeatures.learnPaceIcon')}</div>
              <h3>{getString('homeFeatures.learnPaceTitle')}</h3>
              <p>{getString('homeFeatures.learnPaceDesc')}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.icon}>{getString('homeFeatures.trackProgressIcon')}</div>
              <h3>{getString('homeFeatures.trackProgressTitle')}</h3>
              <p>{getString('homeFeatures.trackProgressDesc')}</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.icon}>{getString('homeFeatures.expertInstructorsIcon')}</div>
              <h3>{getString('homeFeatures.expertInstructorsTitle')}</h3>
              <p>{getString('homeFeatures.expertInstructorsDesc')}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}


