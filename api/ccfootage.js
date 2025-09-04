export default async function handler(req, res) {
  const userAgent = req.headers["user-agent"] || "unknown";
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const userId = "Anonymous"; // later specific people sharing వాడితే Gmail ID capture అవుతుంది

  // Power Automate Webhook కి log పంపించడం
  try {
    await fetch("https://3299cb60efafe263a7276ab328834e.db.environment.api.powerplatform.com:443/powerautomate/automations/direct/workflows/f050c681bf4c4a8e83b1f9a158a2dcd6/triggers/manual/paths/invoke/?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=HtXjR3R9uMq1d9vYCfz9dqPD2sO9qEAHmEAn7HMJOws", {   // <-- ఇక్కడ నీ Flow URL పెట్టు
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: userId,
        ip: ip,
        agent: userAgent,
        time: new Date().toISOString(),
        file: "CC Footage Library"
      })
    });
  } catch (err) {
    console.error("Webhook error:", err);
  }

  // Redirect to SharePoint library
  res.writeHead(302, {
    Location: "https://messengersworld.sharepoint.com/:f:/s/POSTSAU2/EmBJ9Sw9dANAg_uWKjfMnJUB0_BGPcz6LENAMYODw-f1fQ"
  });
  res.end();
}
