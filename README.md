
# gocd-cypress

Cypress runner for GoCD that:
- runs test in docker container when a CI environment is detected
- creates a merged HTML report

# Prerequisites

Cypress npm package is installed in project.

# Installation

```bash
npm install -D github:adnovum/gocd-cypress#v2.0.0
```

# Execution

## Minimal example

*`package.json`*:
```json
{
    "scripts": {
        "test:e2e": "gocd-cypress",
        "test:e2eStandalone": "gocd-cypress --serveCmd='npm start' --serveHost=http://localhost:4200"
    }
}
```

## Help

For the command-line customization options please see:

```bash
npx gocd-cypress --help
```

# Configuration

Configuration keys can be defined
 - in `package.json` in `gocdCypress` property:
   ```json
   {
       "name": "my-project",
       "version": "0.0.0",
       "gocdCypress": {
           "CY_DOCKER_IMAGE": "cypress/browsers:node16.13.0-chrome95-ff94"
       }
   }
   ```
 - via environment variable:
   ```bash
   export CY_DOCKER_IMAGE=cypress/browsers:node16.13.0-chrome95-ff94
   npx gocd-cypress
   ```

## Configuration keys

### CY_PROJECT_PATH

*default:* `process.cwd()`

root path of project

### CY_DOCKER_IMAGE

*default:* `'cypress/browsers:node16.13.0-chrome95-ff94'`

Docker image name that is used when testing is running in container mode.

### CY_BOOTSTRAP_COMMAND

*default:* `'true'`

Optional command that is invoked in container mode, before testing

## CI/CD integration

gocd-cyress recognizes `CI` environment variable. If its value is `1` or `true` then the tool will use docker mode automatically.

# Contribution

## Release

After having stable version on master, one just need to create a new tag that will act as a version.
