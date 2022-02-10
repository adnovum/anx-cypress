import execa from 'execa';
import path from 'path';
import fs from 'fs';

const PROJECT_PACKAGE_JSON_PROPERTY = 'anxCypress';

const packageJson = () => require(path.resolve(process.cwd(), 'package.json'));

export const anxCypressConfig = (): Record<string, string> => packageJson()[PROJECT_PACKAGE_JSON_PROPERTY] ?? {};
export const projectName = (): string => packageJson().name;

function config(envVarName: string, defaultValue: string): string {
	return process.env[envVarName] || anxCypressConfig()[envVarName] || defaultValue;
}

export const CY_PROJECT_PATH = config('CY_PROJECT_PATH', process.cwd());
export const CY_REPORTS_PATH = config('CY_REPORTS_PATH', path.resolve(CY_PROJECT_PATH, './reports/cypress/reports'));
export const CY_RESULTS_PATH = config('CY_RESULTS_PATH', path.resolve(CY_PROJECT_PATH, './reports/cypress/results'));
export const CY_DOCKER_IMAGE = config('CY_DOCKER_IMAGE', 'cypress/browsers:node16.13.0-chrome95-ff94');
export const CY_BOOTSTRAP_COMMAND = config('CY_BOOTSTRAP_COMMAND', 'true');
export const CY_SPEC_FILES_PATTERN = config('CY_SPEC_FILES_PATTERN', '**/*.*');

export const CY_INTEGRATION_FOLDER = (() => {
	let cypressDefinedIntegrationFolder = undefined;

	const cypressJsonFile = path.resolve(CY_PROJECT_PATH, 'cypress.json');
	if (fs.existsSync(cypressJsonFile)) {
		const cypressJsonContent = fs.readFileSync(cypressJsonFile, 'utf8');
		cypressDefinedIntegrationFolder = JSON.parse(cypressJsonContent).integrationFolder as (string | undefined);
	}
	return config(
		'CY_INTEGRATION_FOLDER',
		cypressDefinedIntegrationFolder || path.resolve(CY_PROJECT_PATH, 'cypress/integration')
	);
})();

export function exec(command: string, options?: execa.Options): execa.ExecaChildProcess {

	return execa.command(command, {
		preferLocal: true,
		stdio: 'inherit',
		cwd: CY_PROJECT_PATH,
		...options,
	});
}

export const cleanUpReports = async (testFolder: string): Promise<void> => {
	await cleanUpFolder(joinTestFolder(CY_REPORTS_PATH, testFolder));
};

export const cleanUpResults = async (testFolder: string): Promise<void> => {
	await cleanUpFolder(joinTestFolder(CY_RESULTS_PATH, testFolder));
};

export const cleanUpFolder = async (testFolder: string): Promise<void> => {
	await exec(`rm -rf ${testFolder}`);
};

export const findCypressEnvVars = (): string[] =>
	Object.keys(process.env)
		.filter(envVar => envVar.toUpperCase().startsWith('CYPRESS_'))
		.map(envVar => `${envVar}=${process.env[envVar]}`);

export const joinTestFolder = (integrationFolder: string, testFolder: string) =>
	testFolder ? `${integrationFolder}/${testFolder}` : integrationFolder;
