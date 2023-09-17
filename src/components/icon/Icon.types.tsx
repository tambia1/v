import redisDisk from "./assets/redis-disk.svg";
import redisFlash from "./assets/redis-flash.svg";
import redisReplica from "./assets/redis-replica.svg";
import redisPrimary from "./assets/redis.svg";
import vCircle from "./assets/check-circle.svg";
import minusCircle from "./assets/minus-circle.svg";
import moon from "./assets/moon.svg";
import plusCircle from "./assets/plus-circle.svg";
import sun from "./assets/sun.svg";
import xCircle from "./assets/x-circle.svg";
import left from "./assets/arrow-left.svg";
import right from "./assets/arrow-right.svg";
import up from "./assets/arrow-up.svg";
import down from "./assets/arrow-down.svg";
import leftCircle from "./assets/arrow-left-circle.svg";
import rightCircle from "./assets/arrow-right-circle.svg";
import upCircle from "./assets/arrow-up-circle.svg";
import downCircle from "./assets/arrow-down-circle.svg";

export const Icons = {
	redisPrimary,
	redisReplica,
	redisFlash,
	redisDisk,

	left,
	right,
	up,
	down,

	leftCircle,
	rightCircle,
	upCircle,
	downCircle,

	xCircle,
	vCircle,

	plusCircle,
	minusCircle,

	sun,
	moon,
} as const;

export type IconsName = keyof typeof Icons;
