import { strings, getConfig, getSiteInfo } from '@/config';
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
            <h3>{siteInfo.logo} {strings.appName}</h3>
            <p>{strings.footer.tagline}</p>
          </div>

          {showQuickLinks && (
            <div className={styles.section}>
              <h4>{strings.footer.quickLinks}</h4>
              <ul className={styles.links}>
                <li><a href="/courses">{strings.nav.courses}</a></li>
                <li><a href="/about">{strings.nav.about}</a></li>
                <li><a href="/contact">{strings.nav.contact}</a></li>
              </ul>
            </div>
          )}

          {showSocialLinks && (
            <div className={styles.section}>
              <h4>{strings.footer.followUs}</h4>
              <ul className={styles.links}>
                {getConfig('footer.socialLinks.linkedin', true) && (
                  <li>
                    <a 
                      href={siteInfo.authorLinkedIn} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {strings.footer.linkedin}
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
                      {strings.footer.github}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {showCopyright && (
          <div className={styles.copyright}>
            <p>&copy; {currentYear} {strings.appName}. {strings.footer.copyright}</p>
            {showMadeBy && (
              <p className={styles.madeBy}>{strings.footer.madeBy}</p>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
