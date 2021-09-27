import IconGitHub from '@/components/atoms/icons/IconGitHub';
import IconTwitter from '@/components/atoms/icons/IconTwitter';
import Version from '@/components/atoms/Version';
import AgreeBox from '@/components/molecules/warning/AgreeBox';
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
    <>
      <AgreeBox />
      <div>We use Google Account to ensure you are old enough to use NSFW features.</div>
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
      <Version />
    </>
  );
};

export default Footer;
