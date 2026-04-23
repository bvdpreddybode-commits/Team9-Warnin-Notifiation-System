require("dotenv").config();
const fs = require("fs");
const csv = require("csv-parser");

const { sendSMS } = require("./services/smsService");
const { sendEmail } = require("./services/emailService");
const { getTemplate } = require("./utils/messageTemplates");

// Function to append log to logs.csv
const logToCSV = (name, vehicle, violation, recipient, status) => {
    const logEntry = `${name},${vehicle},${violation},${recipient},${status}\n`;
    fs.appendFileSync("data/logs.csv", logEntry);
};

fs.createReadStream("data/input.csv")
    .pipe(csv())
    .on("data", async (row) => {

        const {
            name, vehicle,
            phone, email,
            parentPhone, parentEmail,
            hodPhone, hodEmail,
            violationCount
        } = row;

        const message = getTemplate(name, vehicle, violationCount);

        let smsRecipients = [phone];
        let emailRecipients = [email];

        if (violationCount >= 3) {
            smsRecipients.push(parentPhone, hodPhone);
            emailRecipients.push(parentEmail, hodEmail);
        }

        console.log(`\n🚨 Processing ${name} (Violation ${violationCount})`);

        // 📱 Send SMS
        for (let num of smsRecipients) {
            const smsStatus = await sendSMS(num, message);
            logToCSV(name, vehicle, violationCount, num, smsStatus);
        }

        // 📧 Send Email
        for (let mail of emailRecipients) {
            const emailStatus = await sendEmail(mail, "Violation Alert 🚨", message);
            logToCSV(name, vehicle, violationCount, mail, emailStatus);
        }

    })
    .on("end", () => {
        console.log("\n✅ All notifications processed!");
    });