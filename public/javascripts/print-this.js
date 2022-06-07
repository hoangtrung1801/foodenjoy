function printThis() {
	var data = $('.wrapper')[0].innerHTML;

	var mywindow = window.open('', 'my div', 'height=800,width=1000');
    mywindow.document.write('<html><head><title>Fook Cook</title>');
    mywindow.document.write('<link rel="stylesheet" href="/stylesheets/blog.css" type="text/css" />')
    mywindow.document.write('<style> .print-this {display: none} .wrapper-heading{width: 96% !important;} </style>');
    mywindow.document.write('</head><body style="height:600px;"><div class="wrapper">');
    mywindow.document.write(data);
    mywindow.document.write('</div></body></html>');
	
    setTimeout(function () {
    	mywindow.print();
    	mywindow.close();
    }, 1000);
}
