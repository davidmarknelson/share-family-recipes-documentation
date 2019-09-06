var fs = require('fs');

/**
 * This file exports the content of your website, as a bunch of concatenated
 * Markdown files. By doing this explicitly, you can control the order
 * of content without any level of abstraction.
 *
 * Using the brfs module, fs.readFileSync calls in this file are translated
 * into strings of those files' content before the file is delivered to a
 * browser: the content is read ahead-of-time and included in bundle.js.
 */
module.exports =
  '# Introduction\n' +
  fs.readFileSync('./content/introduction.md', 'utf8') + '\n' +
  '# Base Url\n' +
  fs.readFileSync('./content/base.md', 'utf8') + '\n' +
  '# Users\n' +
  fs.readFileSync('./content/users.md', 'utf8') + '\n' +
  '# Email Verification\n' +
  fs.readFileSync('./content/email.md', 'utf8') + '\n' +
  '# Passwords\n' +
  fs.readFileSync('./content/passwords.md', 'utf8') + '\n' +
  '# Admin\n' +
  fs.readFileSync('./content/admin.md', 'utf8') + '\n' +
  '# Meals\n' +
  fs.readFileSync('./content/meals.md', 'utf8') + '\n' +
  '# Searches\n' +
  fs.readFileSync('./content/search.md', 'utf8') + '\n' +
  '# Saved Meals\n' +
  fs.readFileSync('./content/savedMeals.md', 'utf8') + '\n' +
  '# Likes\n' +
  fs.readFileSync('./content/likes.md', 'utf8') + '\n';
