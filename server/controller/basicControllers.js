const express = require('express');
const app = express();
const db = require("../models/db");
const { uuid } = require('uuidv4');

// checks if a user is a student by checking if the alphabet preceding '@' is a number or not
function isStudent(email) {
    const decidingChar = email[email.indexOf('@') - 1];
    let flag = false;
    if (decidingChar >= '0' && decidingChar <= '9') {
        flag = true;
    }
    return flag;
}

function GETlogin(req, res) {
    res.render('login.ejs');
}

function GETprofileReg(req, res) {
    const userDetails = {
        fName: req.user.username,
        lName: req.user.username,
        googleId: req.user.googleId,
        email: req.user.email,
        profileURL: req.user.profileURL,
    }
    if (isStudent(userDetails.email)) {
        res.render('profileRegStudent', { ...userDetails });
    }
    else {
        res.render('profileRegProff', { ...userDetails });
    }
}

async function POSTprofileReg(req, res) {
    const data = req.body;
    if (isStudent(data.email)) {
        const newStudent = new db.Student(data);
        try {
            await newStudent.save();
            res.redirect(`/s/${data.rollNo}/dashboard`);
        } catch (e) {
            console.log("ERROR ", e);
            res.send("Error while saving");
        }
    }
    else {
        const newProff = new db.Student({ ...data, id : uuid() });
        try {
            await newProff.save();
            res.redirect(`/p/${data.id}/dashboard`);

        } catch (e) {
            console.log("ERROR ", e);
            res.send("Error while saving");
        }
    }
}

function GETprotected(req, res) {
    res.send('Protected');
}

function GETlogout(req, res) {
    req.logout();
    res.redirect("/login");
}

const basicControllers = {
    GETlogin: GETlogin,
    GETprofileReg: GETprofileReg,
    GETprotected: GETprotected,
    GETlogout: GETlogout,
    POSTprofileReg: POSTprofileReg,
    // POSTprofileData : POSTprofileData,
}
module.exports = basicControllers;




