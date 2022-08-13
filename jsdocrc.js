// eslint-disable-next-line import/no-extraneous-dependencies
const j2md = require('jsdoc-to-markdown');
const fs = require('fs');

const options = {
	files: ['./src/*.js'],
	'global-index-format': 'grouped',
};

j2md.render(options).then((data) => {
	fs.writeFileSync('./API.md', data);
});
