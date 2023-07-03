#!/usr/bin/env node

import CLIApplication from './cli-application.js';
import HelpCommand from './cli-command/help-command.js';
import VersionCommand from './cli-command/version-command.js';
import ImportCommand from './cli-command/import-command.js';
import GenerateCommand from './cli-command/generate-command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new VersionCommand,
  new ImportCommand, new GenerateCommand()
]);
myManager.processCommand(process.argv);
