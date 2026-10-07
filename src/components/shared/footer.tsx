import { SocialIcon } from "@/lib/icons";
import { companyInfo, footerLinkGroups, socialLinks } from "./footer-data";


export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold">{companyInfo.name}</h3>

            <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
              {companyInfo.tagline}
            </p>

            <div className="mt-5 space-y-1.5 text-sm text-muted-foreground">
              <p>{companyInfo.email}</p>
              <p>{companyInfo.phone}</p>
            </div>
          </div>

          {footerLinkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-medium">{group.title}</h4>

              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {companyInfo.name}. All rights
            reserved.
          </p>

          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <SocialIcon name={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

