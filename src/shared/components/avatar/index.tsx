import cn from "classnames";
import tinycolor from "tinycolor2";

import classes from "./avatar.module.scss";

export interface AvatarProps {
  name: string;
  url?: string | null;
  isOnline?: boolean;
  className?: string;
}

var stringToColor = function (str: string) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var color = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return tinycolor(color);
};

export const Avatar = (props: AvatarProps) => {
  let image: JSX.Element | null = null;

  if (props.url) {
    image = <img src={props.url} alt={"Аватар " + props.name} />;
  } else {
    const color = stringToColor(props.name);
    const c1 = color.toHex();
    const c2 = color.lighten().toHex();

    const [l1, l2] = props.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0]);

    image = (
      <div
        className={classes.gradientContainer}
        style={{ background: `linear-gradient(135deg, #${c1}, #${c2})` }}
      >
        <span>
          {l1}
          {l2}
        </span>
      </div>
    );
  }

  return (
    <div className={cn(classes.root, props.className)}>
      {image}
      <span className={cn({ [classes.online]: props.isOnline })}></span>
    </div>
  );
};
