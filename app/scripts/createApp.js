import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function createAppFolder(appName, destinationPath) {
	// Create the folder
	const folderPath = path.join(destinationPath, appName);
	fs.mkdirSync(folderPath);

	// Create the file names
	const fileName1 = `${appName.charAt(0).toUpperCase()}${appName.slice(1)}.styles.tsx`;
	const fileName2 = `${appName.charAt(0).toUpperCase()}${appName.slice(1)}.tsx`;

	//content
	const fileContent1 = `import styled from "@emotion/styled";

    export const Test = styled.div\`
        width: 100%;
        height: 100%;
    
        display: flex;
        flex-direction: column;
    
        padding: 1rem;
        box-sizing: border-box;
    
        color: \${(props) => props.theme.color.primary900};
        background-color: \${(props) => props.theme.color.primary100};
    \`;
    `;

	const fileContent2 = `import { Text } from "@src/components/text/Text";
    import * as S from "./Test.styles";
    import { T } from "@src/locales/T";
    import { lang } from "@src/locales/i18n";
    
    export const Test = () => {
        return (
            <S.Test>
                <Text size="l">
                    <T>{lang.test.title}</T>
                </Text>
            </S.Test>
        );
    };
    `;

	// Create the files
	fs.writeFileSync(path.join(folderPath, fileName1), fileContent1);
	fs.writeFileSync(path.join(folderPath, fileName2), fileContent2);
}

rl.question("App name? ", (appName) => {
	createAppFolder(appName, "./../src/pages/pageHome/components/desktop/apps/");
	rl.close();
});
