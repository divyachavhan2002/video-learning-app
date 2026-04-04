import { strings, getConfig, getSiteInfo, ROUTES } from '@/config';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { MdMenuBook, MdInfoOutline, MdMailOutline } from 'react-icons/md';
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
                <li>
                  <a href={ROUTES.COURSES}>
                    <MdMenuBook className={styles.linkIcon} />
                    {strings.nav.courses}
                  </a>
                </li>
                <li>
                  <a href={ROUTES.ABOUT}>
                    <MdInfoOutline className={styles.linkIcon} />
                    {strings.nav.about}
                  </a>
                </li>
                <li>
                  <a href={ROUTES.CONTACT}>
                    <MdMailOutline className={styles.linkIcon} />
                    {strings.nav.contact}
                  </a>
                </li>
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
                      <FaLinkedinIn className={styles.linkIcon} />
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
                      <FaGithub className={styles.linkIcon} />
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
