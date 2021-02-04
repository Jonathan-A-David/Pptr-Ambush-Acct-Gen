const puppeteer = require('puppeteer-extra') 
const StealthPlugin  = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
const fs = require('fs')
const { Webhook, MessageBuilder } = require('discord-webhook-node');
const hook = new Webhook("https://canary.discord.com/api/webhooks/781976493038239764/ocK-wshUNZsQ3T2AKQybEDTQVTxihUbFMwd-b_q-jYHMturLV4Ve7gzZOSguEuvRBu1Q");

const emailstxt = fs.readFileSync("./emails.txt", "utf-8");
const emails = emailstxt.split("\n")
console.log(emails)

const firstnamestxt = fs.readFileSync("./fname.txt", "utf-8");
const firstNames = firstnamestxt.split("\n")
console.log(firstNames)

const lastnamestxt = fs.readFileSync("./lname.txt", "utf-8");
const lastNames = lastnamestxt.split("\n")
console.log(lastNames)

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const number = "1234567890"
const special = "$#@!%&"

const main = async(fname, lname, email) => {
    let u1 = Math.floor(Math.random() * Math.floor(upperCase.length))
    let u2 = Math.floor(Math.random() * Math.floor(upperCase.length))
    let u3 = Math.floor(Math.random() * Math.floor(upperCase.length))
    let l1 = Math.floor(Math.random() * Math.floor(lowerCase.length))
    let l2 = Math.floor(Math.random() * Math.floor(lowerCase.length))
    let l3 = Math.floor(Math.random() * Math.floor(lowerCase.length))
    let n = Math.floor(Math.random() * Math.floor(number.length))
    let s = Math.floor(Math.random() * Math.floor(special.length))

    let password = upperCase.charAt(u1) + upperCase.charAt(u2) + upperCase.charAt(u3) + lowerCase.charAt(l1) + lowerCase.charAt(l2) + lowerCase.charAt(l3) + number.charAt(n) + special.charAt(s)
    console.log(password)

    const browser = await puppeteer.launch({
        headless: true
    })
    const page = await browser.newPage()
    await page.goto('https://www.ambushdesign.com/en-us/account/login', {waitUntil:"networkidle0"})
    await page.waitForSelector('input[id="registerForm-firstName"]')
    await page.type('input[id="registerForm-firstName"]', fname)
    await page.type('input[id="registerForm-lastName"]', lname)
    await page.type('input[id="registerForm-email"]', email)
    await page.type('input[id="registerForm-password"]', password)
    await page.type('input[id="registerForm-passwordConfirmation"]', password)
    await page.waitForTimeout(500)
    await page.click('button[data-test="registerForm-submitButton"]')
    await page.waitForTimeout(5000)
    if (await page.url() == 'https://www.ambushdesign.com/en-us/account') {
        console.log("Successfully Made Account")
        sendWebhook(email, password)
        await browser.close()
    } else {
        console.log("Error Making Account")
        await browser.close()
    }
    function sendWebhook(email, password) {
        const embed = new MessageBuilder()
        .setTitle('Succesfully Created Acct')
        .setAuthor('Johnyyyy#0191', 'https://pbs.twimg.com/profile_images/1306306923340464135/zKzX0fyw_400x400.jpg', 'https://twitter.com/OnyxNB/')
        .addField('Email', `||${email}||`)
        .addField('Password', `||${password}||`)
        .setColor('#00b0f4')
        .setDescription('Oh look a description :)')
        .setTimestamp();
        
          hook.send(embed);
    }
}

for (i = 0; i < emails.length; i++) {
    main(firstNames[i], lastNames[i], emails[i])
}
