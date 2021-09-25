import IconGitHub from '@/components/atoms/icons/IconGitHub';
import IconTwitter from '@/components/atoms/icons/IconTwitter';
const Footer: React.FC = () => {
  const socials = [
    {
      href: 'https://github.com/sasigume/seekfiction',
      icon: 'GitHub',
      title: 'View repository on GitHub',
    },
    {
      href: 'https://twitter.com/seekfiction',
      icon: 'Twitter',
      title: 'Follow us on Twitter',
    },
  ];
  return (
    <footer
      className="border-t-8 border-primary text-white bg-gray-800 flex flex-col justify-center gap-6 flex-grow relative py-8 z-10"
      aria-label="footerHeading"
    >
      <ul className="mx-auto flex items-center space-x-4 xl:space-x-5">
        {socials.map((social, n) => {
          return (
            <li key={n}>
              <a href={social.href} target="_blank" aria-label={social.title} title={social.title} className="block" rel="noreferrer">
                <div className="w-6 h-6 text-gray-300 hover:text-white">
                  {social.icon == 'GitHub' && <IconGitHub />}
                  {social.icon == 'Twitter' && <IconTwitter />}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
