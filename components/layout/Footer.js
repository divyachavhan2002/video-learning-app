import { STRINGS, getConfig, getSiteInfo } from '@/config';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const siteInfo = getSiteInfo();
  const showQuickLinks = getConfig('footer.showQuickLinks', true);
  const showSocialLinks = getConfig('footer.showSocialLinks', true);
  const showCopyright = getConfig('footer.showCopyright', true);
  const showMadeBy = getConfig('footer.showMadeBy', true);

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3>{siteInfo.logo} {STRINGS.APP_NAME}</h3>
            <p>{STRINGS.FOOTER.TAGLINE}</p>
          </div>

          {showQuickLinks && (
            <div className={styles.section}>
              <h4>{STRINGS.FOOTER.QUICK_LINKS}</h4>
              <ul className={styles.links}>
                <li><a href="/courses">{STRINGS.NAV.COURSES}</a></li>
                <li><a href="/about">{STRINGS.NAV.ABOUT}</a></li>
                <li><a href="/contact">{STRINGS.NAV.CONTACT}</a></li>
              </ul>
            </div>
          )}

          {showSocialLinks && (
            <div className={styles.section}>
              <h4>{STRINGS.FOOTER.FOLLOW_US}</h4>
              <ul className={styles.links}>
                {getConfig('footer.socialLinks.linkedin', true) && (
                  <li>
                    <a 
                      href={siteInfo.authorLinkedIn} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {STRINGS.FOOTER.LINKEDIN}
                    </a>
                  </li>
                )}
                {getConfig('footer.socialLinks.github', true) && (
                  <li>
                    <a 
                      href={siteInfo.authorGitHub} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {STRINGS.FOOTER.GITHUB}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {showCopyright && (
          <div className={styles.copyright}>
            <p>&copy; {currentYear} {STRINGS.APP_NAME}. {STRINGS.FOOTER.COPYRIGHT}</p>
            {showMadeBy && (
              <p className={styles.madeBy}>{STRINGS.FOOTER.MADE_BY}</p>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
