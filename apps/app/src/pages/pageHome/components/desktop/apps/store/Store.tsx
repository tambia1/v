import * as S from "./Store.styles";

type IStore = {
	name: string;
	apps: IApp[];
};

type IApp = {
	name: string;
	url: string;
	icon: string;
};

const store: IStore[] = [
	{
		name: "Apps",
		apps: [
			{
				name: "Excalidraw",
				url: "https://excalidraw.com/",
				icon: "https://styles.redditmedia.com/t5_6f8nh5/styles/communityIcon_8l0jfnqfbrnb1.png",
			},
		],
	},
	{
		name: "News",
		apps: [
			{
				name: "THE Sun",
				url: "https://www.thesun.co.uk/",
				icon: "https://www.thesun.co.uk/wp-content/themes/thesun/images/sunmasthead.svg",
			},
			{
				name: "The New York Times",
				url: "https://www.nytimes.com/",
				icon: "https://assets.website-files.com/5ee732bebd9839b494ff27cd/5ef0851a79b5307a5f3dc780_the-new-york-times-logo.jpg",
			},
		],
	},
];

export const Store = () => {
	const handleOnClickAppIcon = (app: IApp) => {
		console.log("aaa", app.name);
	};

	return (
		<S.Store>
			{store.map((group) => (
				<S.Group key={group.name}>
					<S.Title>{group.name}</S.Title>

					{group.apps.map((app) => (
						<S.App key={app.name}>
							<S.AppIcon url={app.icon} onClick={() => handleOnClickAppIcon(app)}></S.AppIcon>
							<S.AppName>{app.name}</S.AppName>
						</S.App>
					))}
				</S.Group>
			))}
		</S.Store>
	);
};
