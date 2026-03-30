import Head from 'next/head';
import { getString, ROUTES } from '@/config';
import styles from '@/styles/About.module.css';

export default function About() {
  return (
    <>
      <Head>
        <title>{getString('pageTitles.about')}</title>
        <meta name="description" content={getString('pageDescriptions.about')} />
      </Head>

      <div className={styles.aboutContainer}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>{getString('about.heroTitle')}</h1>
            <p className={styles.heroSubtitle}>
              {getString('about.pageSubtitle')}
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.missionGrid}>
              <div className={styles.missionContent}>
                <h2 className={styles.sectionTitle}>{getString('about.missionTitle')}</h2>
                <p className={styles.text}>
                  {getString('about.missionText1')}
                </p>
                <p className={styles.text}>
                  {getString('about.missionText2')}
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
            <h2 className={styles.sectionTitle}>{getString('about.valuesTitle')}</h2>
            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🌟</div>
                <h3 className={styles.valueTitle}>{getString('about.valueQualityTitle')}</h3>
                <p className={styles.valueText}>
                  {getString('about.valueQualityText')}
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🆓</div>
                <h3 className={styles.valueTitle}>{getString('about.valueFreeTitle')}</h3>
                <p className={styles.valueText}>
                  {getString('about.valueFreeText')}
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🚀</div>
                <h3 className={styles.valueTitle}>{getString('about.valueLearningTitle')}</h3>
                <p className={styles.valueText}>
                  {getString('about.valueLearningText')}
                </p>
              </div>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>🤝</div>
                <h3 className={styles.valueTitle}>{getString('about.valueCommunityTitle')}</h3>
                <p className={styles.valueText}>
                  {getString('about.valueCommunityText')}
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
                <div className={styles.statNumber}>{getString('about.statsCourses')}</div>
                <div className={styles.statLabel}>{getString('about.statsCoursesLabel')}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{getString('about.statsCategories')}</div>
                <div className={styles.statLabel}>{getString('about.statsCategoriesLabel')}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{getString('about.statsFree')}</div>
                <div className={styles.statLabel}>{getString('about.statsFreeLabel')}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{getString('about.statsAccess')}</div>
                <div className={styles.statLabel}>{getString('about.statsAccessLabel')}</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <h2 className={styles.ctaTitle}>{getString('about.ctaTitle')}</h2>
            <p className={styles.ctaText}>
              {getString('about.ctaText')}
            </p>
            <div className={styles.ctaButtons}>
              <a href={ROUTES.COURSES} className={styles.primaryButton}>
                {getString('about.ctaBrowse')}
              </a>
              <a href={ROUTES.CONTACT} className={styles.secondaryButton}>
                {getString('about.ctaContact')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}