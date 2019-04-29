import fs from 'fs';
import path from 'path';
import Handlebars from 'handlebars';

/**
 * @name compileTemplate
 * @description This is the method generating HTML templates
 * @param {HandlebarsTemplates} templateUrl The path to handlebars template
 * @param {object} context The containing meta details
 * @returns {HTMLTemplateElement} Returns HTML template string
 */
export const compileTemplate = async (templateUrl, context) => {
  try {
    const source = fs.readFileSync(
      path.resolve(`${__dirname}${templateUrl}`),
      'utf-8'
    );
    const template = Handlebars.compile(source);
    return template(context);
  } catch (error) {
    throw new Error('Could not compile template to HTML, check source.');
  }
};
