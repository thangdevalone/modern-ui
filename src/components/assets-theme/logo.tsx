import {useTheme} from 'next-themes';
import Image from 'next/image';

export const Logo = () => {
  const {resolvedTheme} = useTheme();

  if (!resolvedTheme) return null;

  return (
    <Image
      src={resolvedTheme === "dark" ? "/assets/favicon_white.png" : "/assets/favicon.png"}
      width={24}
      height={24}
      alt="logo"
    />
  );
};
export default Logo;