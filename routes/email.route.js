var express = require('express');
var router = express.Router();
var db = require('../db');
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
	// Get email user
	var emailUser = db.get('users').value().map(function (user) {
		return user.email;
	}).join(',');

	// Get html
	var html = "<div style='display: flex; justify-content: center; background-color: #FAFAF5'><table style='max-width: 800px; min-width: 300px; width: 80%; text-align: center; background-color: #fff; border: 1px solid #ddd; border-radius: 10px; margin: 10px 0; padding: 10px 20px' ><tr><td colspan='2'><a href='#' style='color: black; text-decoration: none; font-weight: 700; font-size: 30px; color: #414238'>Ẩm thực Blog</a></td></tr><tr><td colspan='2' style='display: flex;'><p style='font-size: 20px; color: #414238'>Món ăn ngon mỗi ngày</p></td></tr><tr><td colspan='2' style='display: flex;'><b style='font-size: 20px; color: #35de57'>Công thức ngon</b></td></tr>";
	var attachments = [];

	var recipe = db.get('recipes').value().sort((a, b) => {
		return b.views - a.views;
	}).slice(0,5);	
	for (var i = 0; i < recipe.length; i++) {
		if (i % 2 == 0){
			html += "<tr>";
		}	
		var attachment =  {};
		attachment.path = __dirname + '/../public/' + recipe[i].image;
		attachment.cid = recipe[i].image.split('\\')[1];
		attachments.push(attachment);
		html += "<td  style='padding: 10px; '><div style='flex-direction: column; margin: 10px 0 ; align-items: center;'><img src='cid:" + attachment.cid +"' alt='' style='max-width: 300px; height: 300px; object-fit: cover;'><a href='#' style='color: black; text-decoration: none ;display:block;font-size: 20px; font-weight: 600; margin-top: 10px;'>" + recipe[i].title +"</a></div></td>"
		if (i % 2 != 0) {
			html += "</tr>";
		}	
	}

	html += "<tr><td colspan='2' style='display: flex;'><b style='font-size: 20px; color: #35de57'>Mẹo hay</b></td></tr>"

	var tip = db.get('tips').value().sort((a, b) => {
		return b.views - a.views;
	}).slice(0,5);
	for (var i = 0; i < tip.length; i++) {
		if (i % 2 == 0){
			html += "<tr>";
		}	
		var attachment =  {};
		attachment.path = __dirname + '/../public/' + tip[i].image;
		attachment.cid = tip[i].image.split('\\')[1];
		attachments.push(attachment);
		html += "<td  style='padding: 10px; '><div style='flex-direction: column; margin: 10px 0 ; align-items: center;'><img src='cid:" + attachment.cid +"' alt='' style='max-width: 300px; height: 300px; object-fit: cover;'><a href='#' style='color: black; text-decoration: none ;display:block;font-size: 20px; font-weight: 600; margin-top: 10px;'>" + tip[i].title +"</a></div></td>"

		if (i % 2 != 0) {
			html += "</tr>";
		}	
	}

	html += "</table></div>";


	// Send Email
	var transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		  user: 'amthucblog411@gmail.com',
		  pass: '123trung'
		}
	});

	var mailOptions = {
		from: 'amthucblog411@gmail.com',
		to: 'hoangtrung1801.2003@gmail.com',
		subject: 'Sending Email using Node.js',
		html: html,
		attachments: attachments    
	};

	transporter.sendMail(mailOptions, function(error, info){
		if (error) {
		  console.log(error);
		} else {
		  console.log('Email sent: ' + info.response);
		}
	});

	res.redirect('/');
});


module.exports = router;

