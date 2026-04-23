const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

const client = require("twilio")(accountSid, authToken);

exports.sendSMS = async (phone, message) => {
    try {
        const response = await client.messages.create({
            body: message,
            messagingServiceSid: messagingServiceSid,
            to: "+91" + phone   // India format
        });

        console.log(`✅ SMS SENT → ${phone} | SID: ${response.sid}`);
        return "SENT";

    } catch (error) {
        console.log(`❌ ERROR → ${phone}:`, error.message);
        return "FAILED";
    }
};