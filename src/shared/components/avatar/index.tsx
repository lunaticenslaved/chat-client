import cn from 'classnames';
import tinycolor from 'tinycolor2';

import classes from './avatar.module.scss';
import { OnlineStatus } from '@/shared/components/online-status';

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

export const Avatar = (props: AvatarProps) => {
  let image: JSX.Element | null = null;

  if (props.url) {
    image = <img src={props.url} alt={'Аватар ' + props.name} />;
  } else {
    const color = stringToColor(props.name);
    const c1 = color.toHex();
    const c2 = color.lighten().toHex();

    const [l1, l2] = props.name
      .split(' ')
      .slice(0, 2)
      .map(w => w[0]);

    image = (
      <div
        className={classes.gradientContainer}
        style={{ background: `linear-gradient(135deg, #${c1}, #${c2})` }}>
        <span>
          {l1}
          {l2}
        </span>
      </div>
    );
  }

  return (
    <div className={cn(classes.root, props.className)}>
      <div className={classes.image}>{image}</div>
      <div className={classes.status}>
        <OnlineStatus isOnline={!!props.isOnline} />
      </div>
    </div>
  );
};
