import yargs, { Argv } from 'yargs';
import { hideBin } from 'yargs/helpers';
import { runHandler } from './runner';

export const DEFAULT_REPORTS_FOLDER = 'cypress/results';

export type ArgTypes = {
	docker?: boolean;
	cypressCommand?: string;
	serveCmd?: string;
	serveHost?: string;
	resultsFolder?: string;
	reportsFolder?: string;
};

// Assemble CLI interface with yargs
export function buildCli(): Argv {

	return yargs(hideBin(process.argv))
		.help()
		.command({
			command: '$0',
			describe: `Starts Cypress testing

			Example
				CI=true npx gocd-cypress --cypressCmd="cypress run" \\
					--serveCmd="npm start" --serveHost=http://localhost:3000 \\
					--resultsFolder="build/cypress/results" --reportsFolder="build/cypress/reports"
			`,
			builder: (args: Argv<ArgTypes>) => {
				return args
					.options({
						docker: {
							describe: 'Turns on docker mode. The task will run in cypress docker image',
							default: ['1', 'true'].includes('' + process.env.CI),
							boolean: true,
						},
						cypressCmd: {
							describe: 'Command to execute Cypress tests. Should support passing more parameters',
							type: 'string',
							default: 'cypress run'
						},
						serveCmd: {
							describe: 'Serve command',
							type: 'string',
						},
						serveHost: {
							describe: 'URL to application that serveCmd starts. Required if serveCmd is specified',
							type: 'string',
						},
						resultsFolder: {
							describe: 'Path to the folder to store intermediary test result files in',
							type: 'string',
							default: DEFAULT_REPORTS_FOLDER,
						},
						reportsFolder: {
							describe: 'Path to the folder to create the HTML report in',
							type: 'string',
							default: DEFAULT_REPORTS_FOLDER,
						},
					})
					.implies('serveCmd', 'serveHost');
			},
			handler: runHandler,
		})
		.showHelpOnFail(false)
		.demandCommand(1);

}
