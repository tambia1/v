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
import arrowLeft from "./assets/arrow-left.svg";
import arrowRight from "./assets/arrow-right.svg";
import arrowUp from "./assets/arrow-up.svg";
import arrowDown from "./assets/arrow-down.svg";
import arrowLeftCircle from "./assets/arrow-left-circle.svg";
import arrowRightCircle from "./assets/arrow-right-circle.svg";
import arrowIpCircle from "./assets/arrow-up-circle.svg";
import arrowDownCircle from "./assets/arrow-down-circle.svg";
import chevronLeft from "./assets/chevron-left.svg";
import chevronRight from "./assets/chevron-right.svg";
import chevronUp from "./assets/chevron-up.svg";
import chevronDown from "./assets/chevron-down.svg";

export const Icons = {
	redisPrimary,
	redisReplica,
	redisFlash,
	redisDisk,

	arrowLeft,
	arrowRight,
	arrowUp,
	arrowDown,

	arrowLeftCircle,
	arrowRightCircle,
	arrowIpCircle,
	arrowDownCircle,

	xCircle,
	vCircle,

	plusCircle,
	minusCircle,

	sun,
	moon,

	chevronLeft,
	chevronRight,
	chevronUp,
	chevronDown,
} as const;

export type IconsName = keyof typeof Icons;
