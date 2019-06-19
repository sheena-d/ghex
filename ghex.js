var axios = require('axios');

var getRepos = async function() {
	var content = 'nothing';
	await axios({
			url : 'https://api.github.com/graphql',
			method: 'POST',
			data : {
				query : "query { viewer { \
							login \
							 	repositories(last: 99) { \
							 	 	nodes { \
									name \
							   	} \
							} \
					   }}"
			},
			headers : {
				'Authorization': 'bearer ' + process.env.github_token,
				'Content-Type': 'application/json'
			}
		})
		.then((res) => {
			content = "<p>Repository list for GitHub user <strong>" + res.data.data.viewer.login + "</strong>";
			content += htmlList(res.data.data.viewer.repositories.nodes);
			content += "</p>"
		})
		.catch((error) => {
			log(error);
			content = 'There was an error, please try again later.';
		});
	return content;
}

var htmlList = function(items) {
	var html = "<ul>";
	console.log(items);
	for(let i = 0; i < items.length; i++ ){
		html += "<li>" + items[i].name + "</li>";
	}
	html += "</ul>";
	return html
}


module.exports.getRepos = getRepos