# Mono repo serverless, workspaces and yarn pnp

# Requirements

- Ensure you have `yarn` installed with the specified version in `.yarnrc.yml` check with `yarn --version`
- Ensure you have AWS CLI install `aws --help` 
- Install the recommended `.vscode` plugins

# Setup
1. Run `yarn`
2. Run `yarn dlx @yarnpkg/sdks vscode` 
3. Press `ctrl+shift+p` whilst in a TypeScript file.
4. Choose "Select TypeScript Version
5. Pick "Use Workspace Version"

# Deployment

1. Ensure you have authenticate with AWS and have an active session `aws s3 ls`
2. Run `yarn deploy` to deploy all Serverless projects
3. Run `yarn destroy` to remove all Serverless projects

- Deploy only configuration changes `yarn deploy --update-config`
- Deploy a specifc lambda project `yarn workspace @gruckion/NAME deploy`
- Deploy a specifc lambda function in a project `yarn workspace @gruckion/NAME deploy function --function FUNCTION-NAME`
- Package up a specifc lambda `yarn workspace @gruckion/NAME package`
- Invoke a specific lambda `yarn workspace @gruckion/NAME invoke`
- Invoke a specific lambda locally `yarn workspace @gruckion/NAME invoke local`