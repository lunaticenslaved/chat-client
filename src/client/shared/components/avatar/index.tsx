import cn from 'classnames';
import tinycolor from 'tinycolor2';

import { OnlineStatus } from '#/client/shared/components/online-status';

import classes from './avatar.module.scss';

export interface AvatarProps {
  name: string;
  url?: string | null;
  isOnline?: boolean;
  className?: string;
}

const stringToColor = function (str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    const valueString = '00' + value.toString(16);
    color += valueString.substring(valueString.length - 2);
  }
  return tinycolor(color);
};

export const Avatar = ({ url, name, className, isOnline }: AvatarProps) => {
  let image: JSX.Element | null = null;

  if (url) {
    image = <img src={url} alt={'Аватар ' + name} />;
  } else {
    const color = stringToColor(name);
    const c1 = color.toHex();
    const c2 = color.lighten().toHex();

    const [l1, l2] = name
      .split(' ')
      .slice(0, 2)
      .map(w => w[0]);

    image = (
      <div
        className={classes.gradientContainer}
        style={{ background: `linear-gradient(135deg, #${c1}, #${c2})` }}>
        <span>
          {l1?.toUpperCase()}
          {l2?.toUpperCase()}
        </span>
      </div>
    );
  }

  return (
    <div className={cn(classes.root, className)}>
      <div className={classes.image}>{image}</div>
      <div className={classes.status}>
        <OnlineStatus isOnline={!!isOnline} />
      </div>
    </div>
  );
};
