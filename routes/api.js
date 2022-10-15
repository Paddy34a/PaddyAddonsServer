const express = require("express")
const router = express.Router()
const axios = require("axios")
const constants = require("../constants")

router.get("/latest", async (req, res) => {
  const query = req.query
  const headers = req.headers
  try {
    if (isValidRequest(query) && headers.authentication === "paddyaddons") {

      const embedMessage = {
        username: 'PaddyAddons Login Tracker',
        avatar_url: "https://cdn.discordapp.com/attachments/927698017002352653/963063226453598228/unknown.png",
        content: "",
        embeds: [
          {
            color: 1752220,
            title: 'PaddyAddons',
            description: 'Redirected Player Login from API Backend',
            fields: [
              {
                name: 'Username',
                value: `${query.name}`
              },
              {
                name: 'UUID',
                value: `${query.uuid}`
              },
              {
                name: "Version",
                value: `${query.version}`
              }
            ],
          },
        ],
      }

      res.json({
        status: "200",
        version: constants.MOD_VERSION, 
        content: [
          "Changelog:",  
          "- fixed a crash which was annoying me for a while (+ small code cleanup ig)", 
          " ", 
          "btw I started working on a profile viewer a while ago", 
          "I just didn't have time to continue with it atm, due to school", 
          " ", 
          "PS: if the updater works, please use it to show me that it works <3"
        ]
      })

      const webhookUrl = process.env.WEBHOOK_URL
      if(query.uuid.length > 10) {
        axios.default.post(webhookUrl, embedMessage)
      }
      
    }
  } catch (e) { console.log(e) }
})

const isValidRequest = (query) => {
  try {
    if (query.name !== null && query.uuid !== null && query.version !== null) {
      const name = query.name
      const uuid = query.uuid
      const version = query.version

      if (name !== undefined && name !== "") {
        if (uuid !== undefined && uuid !== "") {
          if (version !== undefined && version !== "") {
            return true
          }
        }
      }

    }
  } catch (e) {
    console.log(`Something went wrong trying to fetch the validity of the request, error: ${e}`)
    return false
  }
  return false
}

module.exports = router