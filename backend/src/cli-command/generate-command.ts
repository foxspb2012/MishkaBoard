import got from 'got';
import chalk from 'chalk';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';
import OfferGenerator from '../common/offer-generator/offer-generator.js';
import { MockData } from '../types/mock-data.type';
import { CliCommandInterface } from './cli-command.interface.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(chalk.red.bold(`Can't fetch data from ${url}`));
    }

    const offerGeneratorString = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(chalk.greenBright.bold(`File ${chalk.blue(filepath)} was created!`));
  }
}
