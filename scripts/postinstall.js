#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var localFile   = path.normalize(__dirname + '/../config/ah-pusher-plugin.js');
var projectPath = path.normalize(process.cwd() + '/../../config/plugins');
var projectFile = path.normalize(projectPath + '/ah-pusher-plugin.js');

var templateFile = path.normalize(__dirname + '/../templates/default/html.ejs');
var templateProjPath = path.normalize(process.cwd() + '/../../templates/default');
var templateProjFile = path.normalize(templateProjPath + '/html.ejs');

if(!fs.existsSync(projectFile)){
  console.log("coppying " + localFile + " to " + projectFile);
  try{
    fs.mkdirSync(projectPath);
  }catch(e){ }
  fs.createReadStream(localFile).pipe(fs.createWriteStream(projectFile));

  console.log("coppying " + templateFile + " to " + templateProjFile);
  try{
    fs.mkdirSync(templateProjPath);
  }catch(e){ }
  fs.createReadStream(templateFile).pipe(fs.createWriteStream(templateProjFile));
}