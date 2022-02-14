
# gocd-cypress

Cypress runner that
 - creates HTML reports
 - runs test in docker container

# Prerequisites

Cypress npm package is installed in project.

# Installation

```bash
npm install -D github:adnovum/gocd-cypress#v1.1.3
```

Note: cypress-multi-reporters is required because gocd-cypress uses it through Cypress

# Execution

## Easy way

*package.json*
```json
{
    "scripts": {
        "test:e2eStandalone": "gocd-cypress --serveCmd='npm start' --serveHost='http://localhost:4200'",
        "test:e2e": "gocd-cypress"
    }
}
```

## Help
```bash
gocd-cypress [testFolder]

Starts Cypress testing

Example
CI=true npx gocd-cypress uiAcceptance --serveCmd="npm start"
--serveHost=http://localhost:3000


Positionals:
  testFolder  test types to run                           [string] [default: ""]

Options:
  --version    Show version number                                     [boolean]
  --help       Show help                                               [boolean]
  --docker     Turns on docker mode. The task will run in cypress docker image
                                                      [boolean] [default: false]
  --serveCmd   Serve command                                            [string]
  --serveHost  URL to application that serveCmd starts                  [string]
  --browser    Browser name to use. See:
               https://docs.cypress.io/guides/guides/launching-browsers
                                        [string] [required] [default: "firefox"]

```

# Configuration

configuration keys can be defined
 - in package.json in `gocdCypress` property
```json
{
    "name": "my-project",
    "version": "0.0.0",
    "gocdCypress": {
        "CY_DOCKER_IMAGE": "cypress/browsers:node16.13.0-chrome95-ff94"
    }
}
```
 - environment variable
```bash
export CY_DOCKER_IMAGE=cypress/browsers:node16.13.0-chrome95-ff94
npx gocd-cypress e2e
```

## Configuration keys

### CY_PROJECT_PATH

*default:* `process.cwd()`

root path of project

### CY_REPORTS_PATH

*default:* `path.resolve(CY_PROJECT_PATH, './reports/cypress/reports')`

path where HTML reports should be placed

### CY_RESULTS_PATH

*default:* `path.resolve(CY_PROJECT_PATH, './reports/cypress/results')`

path where JSON results should be placed

### CY_INTEGRATION_FOLDER

*default:* `path.resolve(CY_PROJECT_PATH, 'cypress/integration)` (Cypress default)

path to directory where Cypress tests are placed. Usually it's generated by Cypress.

Tool tries to find the value in cypress.json in `integrationFolder` first. If not found, falls back to default

### CY_DOCKER_IMAGE

*default:* `'cypress/browsers:node16.13.0-chrome95-ff94'`

Docker image name that is used when testing is running in container mode.

### CY_BOOTSTRAP_COMMAND

*default:* `'true'`

Optional command that is invoked in container mode, before testing

### CY_SPEC_FILES_PATTERN

*default:* `**/*.*` (Cypress default)

glob pattern to test files in testing folder

## CI/CD integration

gocd-cyress recognizes `CI` environmnet variable. If its value is `1` or `true` then the tool will use docker mode automatically.

# Contribution

## Release

After having stable version on master, one just need to create a new tag that will act as a version.
