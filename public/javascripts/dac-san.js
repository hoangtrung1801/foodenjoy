
var dacSanContent = document.getElementsByClassName('dac-san-content');
var dataContent = document.getElementsByClassName('data-content');
var length = dacSanContent.length;
let getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;

for (var i = 0; i < length; i++){
	var data =  dataContent[i].textContent;
	var nodes = getNodes(data);
	nodes[0].textContent = nodes[0].textContent.slice(0,100)+ ' ...';
	dacSanContent[i].appendChild(nodes[0]);

	// nodes.forEach(node => dacSanContent[i].appendChild(node.cloneNode(true)));
}